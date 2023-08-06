import pg from 'pg'
const { Pool } = pg

import config from '../configs/db-config.json' assert { type: 'json' }
const pool = new Pool(config)

export default (text: string, params: Array<any>) => pool.query(text, params)
