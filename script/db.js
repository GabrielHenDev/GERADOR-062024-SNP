import mysql from "mysql"
import dotenv from 'dotenv'

dotenv.config()

const Host = process.env.HOST;
const User = process.env.USER;
const Pass = process.env.PASS;
const DB = process.env.DB;
const Port = process.env.PORT

export const db = mysql.createConnection({
    host: Host,
    port: Port,
    user: User,
    password: Pass,
    database: DB
})
