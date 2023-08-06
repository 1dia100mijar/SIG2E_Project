import query from '../utils/QueryHandler.js'

export async function getEquipments() {
    return (await query('SELECT * FROM sig2e.equipment', [])).rows
}
export async function getEquipmentsFromDesk(deskid: number) {
    return (await query('SELECT * FROM sig2e.equipment WHERE deskid = $1', [deskid])).rows
}
export async function getEquipment(id: number) {
    return (await query('SELECT * FROM sig2e.equipment WHERE id = $1', [id])).rows[0]
}
export async function addEquipment(
    id: number,
    deskid: number | null,
    location: string,
    equipmentnr: number,
    designation: string,
    availability: boolean,
    condition: string
) {
    return (
        await query('INSERT INTO sig2e.equipment VALUES ($1, $2, $3, $4, $5, $6, $7) returning *', [
            id,
            deskid,
            location,
            equipmentnr,
            designation,
            availability,
            condition,
        ])
    ).rows[0]
}
export async function updateEquipment(
    id: number,
    deskid: number | null,
    location: string,
    equipmentnr: number,
    designation: string,
    availability: boolean,
    condition: string
) {
    return (
        await query(
            'UPDATE sig2e.equipment SET deskid = $2, location = $3, equipmentnr = $4, designation = $5, availability = $6, condition = $7 WHERE id = $1 returning *',
            [id, deskid, location, equipmentnr, designation, availability, condition]
        )
    ).rows[0]
}
export async function deleteEquipment(id: number) {
    return (await query('DELETE FROM sig2e.equipment WHERE id = $1 returning *', [id])).rows[0]
}

export async function getEquipmentsWithName(name: string) {
    return (await query('SELECT * FROM sig2e.equipment WHERE designation = $1', [name])).rows
}

export async function getDistinctEquipments() {
    return (await query('SELECT DISTINCT designation FROM sig2e.equipment', [])).rows
}

export async function getDistinctEquipmentsCount() {
    return (await query('SELECT designation, count(*) as NUM FROM sig2e.equipment GROUP BY designation', [])).rows
}

export async function getMaxNumberOfEquipment(designation: string) {
    return (await query('SELECT max(equipmentnr) FROM sig2e.equipment WHERE designation = $1', [designation])).rows[0].max
}
export async function getEquipmentsMaxId() {
    return (await query('SELECT max(id) FROM sig2e.equipment', [])).rows[0].max
}

export async function changeEquipmentState(id: number, condition: string, availability: boolean) {
    return (await query('UPDATE sig2e.equipment SET availability = $3, condition = $2 WHERE id = $1 returning *', [id, condition, availability])).rows[0]
}
