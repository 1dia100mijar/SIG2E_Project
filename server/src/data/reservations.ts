import query from '../utils/QueryHandler.js'

export async function getReservations() {
    return (await query('SELECT * FROM sig2e.reservation', [])).rows
}
export async function getReservation(id: number) {
    return (await query('SELECT * FROM sig2e.reservation WHERE id = $1', [id])).rows[0]
}
export async function getUserReservations(userid: string) {
    return (await query('SELECT * FROM sig2e.reservation WHERE userid = $1', [userid])).rows
}
export async function getEquipmentReservations(equipmentid: number) {
    return (await query('SELECT * FROM sig2e.reservation WHERE equipmentid = $1', [equipmentid])).rows
}
export async function getDeskReservations(deskid: number) {
    return (await query('SELECT * FROM sig2e.reservation WHERE deskid = $1', [deskid])).rows
}
export async function addReservation(
    id: number,
    userid: string,
    equipmentid: number,
    deskid: number,
    cause: string,
    datestart: Date,
    dateend: Date,
    state: string
) {
    return (
        await query('INSERT INTO sig2e.reservation VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *', [
            id,
            userid,
            equipmentid,
            deskid,
            cause,
            datestart,
            dateend,
            state,
        ])
    ).rows[0]
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
    return (
        await query(
            'UPDATE sig2e.reservation SET userid = $2, equipmentid = $3, deskid = $4, cause = $5, datestart = $6, dateend = $7, state = $8 WHERE id = $1 returning *',
            [id, userid, equipmentid, deskid, cause, datestart, dateend, state]
        )
    ).rows[0]
}
export async function cancelReservation(id: number) {
    return (await query('UPDATE sig2e.reservation SET state = $2 WHERE id = $1 returning *', [id, 'canceled'])).rows[0]
}
export async function deleteReservation(id: number) {
    return (await query('DELETE FROM sig2e.reservation WHERE id = $1 returning *', [id])).rows[0]
}

export async function updateReservationState(id: number, state: string) {
    return (await query('UPDATE sig2e.reservation SET state = $2 WHERE id = $1 returning *', [id, state])).rows[0]
}

export async function getReservationsMaxId() {
    return (await query('SELECT max(id) FROM sig2e.reservation', [])).rows[0].max
}

export async function getReservationsIn1HourInterval() {
    return (
        await query(
            `SELECT * FROM sig2e.reservation WHERE datestart BETWEEN (CURRENT_TIMESTAMP - INTERVAL '61 minutes') AND (CURRENT_TIMESTAMP + INTERVAL '61 minutes') 
            AND state IN ('active', 'pending')`,[]
            )).rows
}
