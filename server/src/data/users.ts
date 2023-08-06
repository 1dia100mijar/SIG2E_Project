import query from '../utils/QueryHandler.js'

export async function getUsers() {
    return (await query('SELECT * FROM sig2e.users', [])).rows
}

export async function getUser(id: string) {
    return (await query('SELECT * FROM sig2e.users WHERE id = $1', [id])).rows[0]
}

export async function addUser(id: string, email: string, name: string, role: string, phonenumber: string, score: number | undefined) {
    return (await query('INSERT INTO sig2e.users VALUES ($1, $2, $3, $4, $5, $6) returning *', [id, email, name, role, phonenumber, score])).rows[0]
}

export async function changeScore(id: string, score: number | undefined) {
    return (await query('UPDATE sig2e.users SET score = $2 WHERE id = $1 returning *', [id, score])).rows[0]
}

export async function updateUser(id: string, email: string, name: string, role: string, phonenumber: string, score: number | undefined) {
    return (
        await query('UPDATE sig2e.users SET email = $2, name = $3, role = $4, phonenumber = $5, score = $6 WHERE id = $1 returning *', [
            id,
            email,
            name,
            role,
            phonenumber,
            score,
        ])
    ).rows[0]
}

export async function deleteUser(id: string) {
    return (await query('DELETE FROM sig2e.users WHERE id = $1 returning *', [id])).rows[0]
}

export async function getUsersMaxId() {
    return (await query('SELECT MAX(id) FROM sig2e.users', [])).rows[0].max
}
