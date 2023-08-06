import query from '../utils/QueryHandler.js'

export async function getDesks() {
    return (await query('SELECT * FROM sig2e.desk', [])).rows
}
export async function getDesksFromLab(labId: number) {
    return (await query('SELECT * FROM sig2e.desk WHERE labid = $1', [labId])).rows
}
export async function getDesk(id: number) {
    return (await query('SELECT * FROM sig2e.desk WHERE id = $1', [id])).rows[0]
}
export async function addDesk(id: number, labid: number, deskNr: number, designation: string, capacity: number, availability: boolean, condition: string) {
    return (
        await query('INSERT INTO sig2e.desk VALUES ($1, $2, $3, $4, $5, $6, $7) returning *', [
            id,
            labid,
            deskNr,
            designation,
            capacity,
            availability,
            condition,
        ])
    ).rows[0]
}
export async function updateDesk(id: number, labid: number, desknr: number, designation: string, capacity: number, availability: boolean, condition: string) {
    return (
        await query(
            'UPDATE sig2e.desk SET labid = $2, desknr = $3, designation = $4, capacity = $5, availability = $6, condition = $7 WHERE id = $1 returning *',
            [id, labid, desknr, designation, capacity, availability, condition]
        )
    ).rows[0]
}
export async function deleteDesk(id: number) {
    return (await query('DELETE FROM sig2e.desk WHERE id = $1 returning *', [id])).rows[0]
}

export async function getDesksMaxId() {
    return (await query('SELECT MAX(id) FROM sig2e.desk', [])).rows[0].max
}

export async function getMaxNumberOfDeskInLab(labid: number) {
    return (await query('SELECT MAX(deskNr) FROM sig2e.desk WHERE labid = $1', [labid])).rows[0].max
}

export async function changeDeskState(id: number, condition: string, availability: boolean) {
    return (await query('UPDATE sig2e.desk SET availability = $3, condition = $2 WHERE id = $1 returning *', [id, condition, availability])).rows[0]
}