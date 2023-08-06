import query from '../utils/QueryHandler.js'

export async function getIssues() {
    return (await query('SELECT * FROM sig2e.issue', [])).rows
}

export async function getIssue(id: number) {
    return (await query('SELECT * FROM sig2e.issue WHERE id = $1', [id])).rows[0]
}

export async function getEquipmentIssues(equipmentid: number) {
    return (await query('SELECT * FROM sig2e.issue WHERE equipmentid = $1', [equipmentid])).rows
}

export async function getDeskIssues(deskid: number) {
    return (await query('SELECT * FROM sig2e.issue WHERE deskid = $1', [deskid])).rows
}

export async function getUserIssues(userid: string) {
    return (await query('SELECT * FROM sig2e.issue WHERE useridreport = $1', [userid])).rows
}

export async function getLabIssues(labid: number) {
    return (await query('SELECT * FROM sig2e.issue WHERE labid = $1', [labid])).rows
}

export async function addIssue(
    id: number,
    useridreport: string,
    equipmentid: number,
    deskid: number,
    labid: number,
    description: string,
    datereport: Date,
) {
    return (
        await query('INSERT INTO sig2e.issue VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12) returning *', [
            id,
            useridreport,
            undefined,
            undefined,
            equipmentid,
            deskid,
            labid,
            description,
            'reported',
            datereport,
            undefined,
            undefined,
        ])
    ).rows[0]
}

export async function updateIssue(
    id: number,
    useridreport: string,
    useridverification: string,
    useridresolution: string,
    equipmentid: number,
    deskid: number,
    labid: number,
    description: string,
    state: string,
    datereport: Date,
    dateverification: Date,
    dateresolution: Date
) {
    return (
        await query(
            'UPDATE sig2e.issue SET useridreport = $2, useridverification = $3, useridresolution = $4, equipmentid = $5, deskid = $6, labid = $7, description = $8, state = $9, datereport = $10, dateverification = $11, dateresolution = $12 WHERE id = $1 returning *',
            [
                id,
                useridreport,
                useridverification,
                useridresolution,
                equipmentid,
                deskid,
                labid,
                description,
                state,
                datereport,
                dateverification,
                dateresolution,
            ]
        )
    ).rows[0]
}

export async function verifyIssue(id: number, useridverification: string, dateverification: Date) {
    return (
        await query('UPDATE sig2e.issue SET useridverification = $2, dateverification = $3, state = $4 WHERE id = $1 returning *', [
            id,
            useridverification,
            dateverification,
            'verified',
        ])
    ).rows[0]
}

export async function resolveIssue(id: number, useridresolution: string, dateresolution: Date) {
    return (
        await query('UPDATE sig2e.issue SET useridresolution = $2, dateresolution = $3, state = $4 WHERE id = $1 returning *', [
            id,
            useridresolution,
            dateresolution,
            'resolved',
        ])
    ).rows[0]
}

export async function deleteIssue(id: number) {
    return (await query('DELETE FROM sig2e.issue WHERE id = $1 returning *', [id])).rows[0]
}

export async function getIssuesMaxId() {
    return (await query('SELECT MAX(id) FROM sig2e.issue', [])).rows[0].max
}
