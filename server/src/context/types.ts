export enum Condition{
    working, broken, maintenance, stolen
}

export enum SpaceType{
    lab, storage
}

export enum Role{
    student, professor, manager, admin
}

export enum ReservationState{
    canceled, active, concluded, pending
}

export enum State{
    reported, verified, resolved
}

export type Desk = {
    id?: number,
    labid: number,
    desknr: number,
    designation: string,
    capacity: number,
    availability: boolean,
    condition: Condition
}

export type Desk_Client = {
    desknr: number,
    capacity: number,
    availability: boolean,
    condition: Condition
}

export type Equipment_Type = {
    id: number,
    deskid?: number,
    location: string,
    equipmentnr: number,
    designation: string,
    availability: boolean,
    condition: Condition
}

export type createEquipment_Type = {
    designation: string,
    deskid?: number,
    location: string,
    condition: Condition,
}

export type Reservation_Type = {
    id: number,
    userid: string,
    equipmentid: number,
    deskid: number,
    cause: string,
    datestart: Date,
    dateend: Date,
    state: string
}

export type Labs_Type = {   
    id: number,
    schedule: Date[],
    designation: string,
    capacity: number,
    occupancy: number,
    availability: boolean,
    condition: Condition,
    desks: Desk_Client[]
}

export type Space_Type = {
    id?: number,
    schedule: Date[],
    designation: string,
    spacetype: SpaceType,
    availability: boolean
}