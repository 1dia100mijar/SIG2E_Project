export enum Condition{
    'working', 'broken', 'maintenance', 'stolen'
}

export enum State_Reservation {
    'active', 'cancelled', 'expired', "concluded"
}

export type Desk_Type = {
    id: number,
    labid: number,
    desknr: number,
    designation: string,
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

export type Lab_Type = {
    id: number,
    schedule: string[][],
    designation: string,
    capacity: number,
    occupancy: number,
    availability: boolean,
    condition: Condition
    desks: Desk_Type[]
}

export type Space_Type = {
    id: number,
    schedule: string[][],
    designation: string,
    spacetype: string,
    availability: boolean,
}

export type Reservation_Type = {
    id: number,
    userid: string,
    equipmentid: number,
    deskid: number,
    cause: string,
    datestart: string,
    dateend: string,
    state: State_Reservation
}

export type State = {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}


export function availability(bool: boolean){
    return bool ? "Disponivel" : "Indisponivel"
}

export interface dialogFields_Type{
    [key: string]: State
  }