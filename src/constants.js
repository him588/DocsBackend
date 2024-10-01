import dotenv from "dotenv"

dotenv.config()

const client_id=process.env.CLIENTID
const client_secret=process.env.CLIENTSECRET




export const constants ={client_id,client_secret}