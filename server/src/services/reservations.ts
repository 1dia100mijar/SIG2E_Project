import data from '../data/index.js'
import errors from '../utils/errors.js'
import { Condition, Equipment_Type, ReservationState, Reservation_Type } from '../context/types.js'
import { verifyIfIsNumber } from '../utils/verifications.js'
import { getUser } from './users.js'
import { getEquipment } from './equipments.js'
import { getDesk } from './desks.js'
import { getLab, changeLabOccupation } from './labs.js'

export async function getReservations() {
    return await data.getReservations()
}

export async function getUserReservations(userid: string) {
    await getUser(userid) // check if user exist
    return await data.getUserReservations(userid)
}

export async function getReservation(id: number) {
    await verifyIfIsNumber({ id })
    const reservation = await data.getReservation(id)
    if (!reservation) throw errors.NOT_FOUND('Reservation wiht id ' + id + ' not found')
    return reservation
}

export async function getEquipmentReservations(equipmentId: number) {
    await getEquipment(equipmentId) // check if equipment exist
    return await data.getEquipmentReservations(equipmentId)
}

export async function getDeskReservations(deskId: number) {
    await getDesk(deskId) // check if desk exist
    return await data.getDeskReservations(deskId)
}

export async function addReservation(userid: string, equipmentid: number, deskid: number, cause: string, datestart: Date, dateend: Date) {
    await getUser(userid) // check if user exist
    await getEquipment(equipmentid) // check if equipment exist
    const desk = await getDesk(deskid) // check if desk exist
    datestart = updateDateTimeZones(datestart)
    dateend = updateDateTimeZones(dateend)
    const lab = await verifyIfLabIsAvailable(desk.labid, datestart, dateend)
    await verifyIfEquipmentIsInDifferentDesk(equipmentid, deskid)
    await verifyIfDeskIsAvailable(deskid)
    await verifyIfEquipmentIsAvailable(equipmentid)

    // conditions to limit student reservations to a max of 2 hours and 2 reservations per day
    await verifyReservationTimeLimit(datestart, dateend)
    await verifyDailyLimit(userid, datestart)

    await verifyForOverlapedReservations(userid, equipmentid, deskid, datestart, dateend)

    const id = Number((await data.getReservationsMaxId()) + 1)
    try {
        return await data.addReservation(id, userid, equipmentid, deskid, cause, datestart, dateend, 'pending')
    } catch (error: any) {
        throw errors.INVALID_PARAMETER(error.message)
    }
}

export async function updateReservation(
    id: number,
    userid: string,
    equipmentid: number,
    deskid: number,
    cause: string,
    datestart: Date,
    dateend: Date,
    state: string
) {
    const reservation = await getReservation(id) // check if reservation exist
    await getUser(userid) // check if user exist
    await getEquipment(equipmentid) // check if equipment exist
    await getDesk(deskid) // check if desk exist
    console.log(datestart)
    datestart = updateDateTimeZones(datestart)
    console.log(datestart)
    dateend = updateDateTimeZones(dateend)
    await verifyIfEquipmentIsInDifferentDesk(equipmentid, deskid)
    await verifyIfDeskIsAvailable(deskid)
    await verifyIfEquipmentIsAvailable(equipmentid)

    // conditions to limit student reservations to a max of 2 hours and 2 reservations per day
    await verifyReservationTimeLimit(datestart, dateend)
    let dateNow = new Date()
    dateNow = updateDateTimeZones(dateNow)

    //Only verify if the reservation is in a diffrent day
    if (
        !(
            reservation.datestart.getUTCDate() == dateNow.getUTCDate() &&
            reservation.datestart.getMonth() == dateNow.getMonth() &&
            reservation.datestart.getFullYear() == dateNow.getFullYear()
        )
    ) {
        await verifyForOverlapedReservations(userid, equipmentid, deskid, datestart, dateend, id)
        await verifyDailyLimit(userid, datestart)
    }

    try {
        return await data.updateReservation(id, userid, equipmentid, deskid, cause, datestart, dateend, getReservationState(state))
    } catch (error: any) {
        throw errors.INVALID_PARAMETER(error.message)
    }
}

export async function cancelReservation(id: number) {
    await getReservation(id) // check if reservation exist
    return await data.cancelReservation(id)
}

export async function deleteReservation(id: number) {
    await getReservation(id) // check if reservation exist
    return await data.deleteReservation(id)
}

/*
    This function is used to update the hours of the Date object to the local time zone
*/
function updateDateTimeZones(date: Date): Date {
    let newDate = new Date(date)
    newDate.setHours(newDate.getHours() - newDate.getTimezoneOffset() / 60)
    return newDate
}

async function verifyForOverlapedReservations(userid: string, equipmentId: number, deskId: number, datestart: Date, dateend: Date, reservationId: number = -1) {
    const userReservations: Reservation_Type[] = await data.getUserReservations(userid)

    //Verify user reservations
    userReservations.forEach((reservation: Reservation_Type) => {
        if (reservation.id == reservationId) {
            return //skip the current reservation if it is the one being updated
        } else if (
            (datestart >= reservation.datestart && datestart < reservation.dateend) ||
            (dateend > reservation.datestart && dateend <= reservation.dateend) ||
            (datestart <= reservation.datestart && dateend >= reservation.dateend)
        ) {
            throw errors.INVALID_PARAMETER('Voçê já tem uma reserva para este período')
        }
    })

    //Verify equipment reservations
    const equipmentReservations: Reservation_Type[] = await data.getEquipmentReservations(equipmentId)
    equipmentReservations.forEach((reservation: Reservation_Type) => {
        if (reservation.id == reservationId) {
            return
        } else if (
            (datestart >= reservation.datestart && datestart < reservation.dateend) ||
            (dateend > reservation.datestart && dateend <= reservation.dateend) ||
            (datestart <= reservation.datestart && dateend >= reservation.dateend)
        ) {
            throw errors.INVALID_PARAMETER('Este equipamento já tem uma reserva para este período')
        }
    })

    //Verify desk reservations
    const deskReservations: Reservation_Type[] = await data.getDeskReservations(deskId)
    deskReservations.forEach((reservation: Reservation_Type) => {
        if (reservation.id == reservationId) {
            return
        } else if (
            (datestart >= reservation.datestart && datestart < reservation.dateend) ||
            (dateend > reservation.datestart && dateend <= reservation.dateend) ||
            (datestart <= reservation.datestart && dateend >= reservation.dateend)
        ) {
            throw errors.INVALID_PARAMETER('Esta bancada já tem uma reserva para este período')
        }
    })
}

async function verifyDailyLimit(userid: string, date: Date) {
    const userReservations: Reservation_Type[] = await data.getUserReservations(userid)
    const dateDay = date.getDate()
    const dateMonth = date.getMonth()
    const dateYear = date.getFullYear()
    let count = 0
    userReservations.forEach((reservation: Reservation_Type) => {
        if (reservation.datestart.getDate() == dateDay && reservation.datestart.getMonth() == dateMonth && reservation.datestart.getFullYear() == dateYear) {
            count++
        }
    })
    if (count >= 2) {
        throw errors.NO_PERMISSION('Não pode fazer mais de 2 reservas por dia')
    }
}

async function verifyIfEquipmentIsInDifferentDesk(equipmentid: number, deskid: number) {
    const equipment = await data.getEquipment(equipmentid)
    if (equipment.deskid != null) {
        if (equipment.deskid != deskid) {
            throw errors.INVALID_PARAMETER('O equipamento não pertence á bancada')
        }
    }
}

async function verifyIfDeskIsAvailable(deskid: number) {
    const desk = await data.getDesk(deskid)
    if (!desk.availability) throw errors.INVALID_PARAMETER('A bancada não está disponivel')
}

async function verifyIfEquipmentIsAvailable(equipmentid: number) {
    const equipment = await data.getEquipment(equipmentid)
    if (!equipment.availability) throw errors.INVALID_PARAMETER('O equipamento não está disponivel')
}

async function verifyReservationTimeLimit(datestart: Date, dateend: Date) {
    // student condition to limit the reservation time to 2 hours
    const diffrence = dateend.getTime() - datestart.getTime()
    const twoHoursInMilliseconds = 2 * 60 * 60 * 1000
    if (diffrence < 0) throw errors.INVALID_PARAMETER('A data de fim de reserva têm que ser superior á data de inicio')
    else if (datestart.getTime() - Date.now() < 0) throw errors.INVALID_PARAMETER('Não é possivel fazer reservas para datas passadas')
    else if (diffrence > twoHoursInMilliseconds) throw errors.NO_PERMISSION('A reserva não pode ter uma duração superior a 2 horas')
}

function getReservationState(state: string): string {
    const reservationState = ReservationState[state as keyof typeof ReservationState]
    if (reservationState == undefined) throw errors.INVALID_PARAMETER('State ' + state + " don't exist")
    return state
}

function changeReservationState(id: number, state: string) {
    return data.updateReservationState(id, getReservationState(state))
}

async function verifyIfLabIsAvailable(labid: number, datestart: Date, dateend: Date) {
    const lab = await getLab(labid)
    if (!lab.availability) throw errors.INVALID_PARAMETER('O laboratório não está disponivel')
    let reservationWeekDay = datestart.getDay() // 0 - Sunday, 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday
    if (reservationWeekDay == 0) reservationWeekDay = 7 // 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday, 7 - Sunday
    const reservationStartHour = datestart.getHours() + datestart.getTimezoneOffset() / 60
    const reservationEndHour = dateend.getHours() + dateend.getTimezoneOffset() / 60
    const labSchedule = lab.schedule[reservationWeekDay - 1]
    const labScheduleStartHour = Number(labSchedule[0].split(':')[0])
    const labScheduleEndHour = Number(labSchedule[1].split(':')[0])
    if (reservationStartHour < labScheduleStartHour || reservationEndHour > labScheduleEndHour)
        throw errors.INVALID_PARAMETER('O laboratório não está disponivel neste horário')
    return lab
}

export async function updateReservationStatus() {
    const reservations: Reservation_Type[] = await data.getReservationsIn1HourInterval()
    let dateNow = new Date()
    dateNow = updateDateTimeZones(dateNow)
    reservations.forEach(async (reservation: Reservation_Type) => {
        const reservationState = ReservationState[reservation.state as keyof typeof ReservationState]
        if (reservationState == ReservationState.pending && dateNow >= reservation.datestart && dateNow <= reservation.dateend) {
            const desk = await getDesk(reservation.deskid)
            const lab = await getLab(desk.labid)
            await changeReservationState(reservation.id, 'active')
            changeLabOccupation(lab.id, lab.occupancy + desk.capacity)
        } else if ((reservationState == ReservationState.active || reservationState == ReservationState.pending) && dateNow > reservation.dateend) {
            const desk = await getDesk(reservation.deskid)
            const lab = await getLab(desk.labid)
            await changeReservationState(reservation.id, 'concluded')
            changeLabOccupation(lab.id, lab.occupancy - desk.capacity)
        }
    })
}
