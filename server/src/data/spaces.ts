import query from '../utils/QueryHandler.js'

export async function getSpaces() {
    return (await query('SELECT * FROM sig2e.space', [])).rows
}

export async function getSpace(id: number) {
    return (await query('SELECT * FROM sig2e.space WHERE id = $1', [id])).rows[0]
}

export async function addSpace(id: number, schedule: string, designation: string, spacetype: string, availability: boolean) {
    return (
        await query('INSERT INTO sig2e.space VALUES ($1, $2, $3, $4, $5) returning *', [
            id,
            schedule,
            designation,
            spacetype,
            availability,
        ])
    ).rows[0]
}

export async function updateSpace(id: number, schedule: string, designation: string, spacetype: string, availability: boolean) {
    return (
        await query(
            'UPDATE sig2e.space SET schedule = $2, designation = $3, spacetype = $4, availability = $5 WHERE id = $1 returning *',
            [id, schedule, designation, spacetype, availability]
        )
    ).rows[0]
}

export async function deleteSpace(id: number) {
    return (await query('DELETE FROM sig2e.space WHERE id = $1 returning *', [id])).rows[0]
}

export async function getSpacesMaxId() {
    return (await query('SELECT MAX(id) FROM sig2e.space', [])).rows[0].max
}

export async function changeSpaceAvailability(id: number, availability: boolean) {
    return (await query('UPDATE sig2e.space SET availability = $2 WHERE id = $1 returning *', [id, availability])).rows[0]
}
