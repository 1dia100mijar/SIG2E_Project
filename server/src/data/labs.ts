import query from '../utils/QueryHandler.js'

export async function getLabs() {
    return (await query('select * from sig2e.space join sig2e.lab on sig2e.lab.spaceid = sig2e.space.id', [])).rows
}
export async function getLab(id: number) {
    return (await query('SELECT * FROM sig2e.space JOIN sig2e.lab ON sig2e.lab.spaceid = sig2e.space.id WHERE sig2e.lab.id = $1', [id])).rows[0]
}
// return (await query('select * from sig2e.space join sig2e.lab on sig2e.lab.spaceid = sig2e.space.id WHERE lab.id = $1', [id])).rows[0]
export async function addLab(id: number, spaceid: number, capacity: number, occupancy: number, condition: string) {
    return (await query('INSERT INTO sig2e.lab VALUES ($1, $2, $3, $4, $5) returning *', [id, spaceid, capacity, occupancy, condition]))
        .rows[0]
}
export async function updateLab(id: number, spaceid: number, capacity: number, occupancy: number, condition: string) {
    return (
        await query('UPDATE sig2e.lab SET spaceid = $2, capacity = $3, occupancy = $4, condition = $5 WHERE id = $1 returning *', [
            id,
            spaceid,
            capacity,
            occupancy,
            condition,
        ])
    ).rows[0]
}
export async function deleteLab(id: number) {
    return (await query('DELETE FROM sig2e.lab WHERE id = $1 returning *', [id])).rows[0]
}

export async function getLabsMaxId() {
    return (await query('SELECT MAX(id) FROM sig2e.lab', [])).rows[0].max
}

export async function changeLabCondition(id: number, condition: string) {
    return (await query('UPDATE sig2e.lab SET condition = $2 WHERE id = $1 returning *', [id, condition])).rows[0]
}

export async function changeLabOccupation(id: number, occupancy: number) {
    return (await query('UPDATE sig2e.lab SET occupancy = $2 WHERE id = $1 returning *', [id, occupancy])).rows[0]
}