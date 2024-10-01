import {google} from "googleapis"
import { constants } from "../constants.js"


// const client_id=process.env.CLIENTID
// const client_secret=process.env.CLIENTSECRET
// console.log({client_id},{client_secret})

const oauth2client=new google.auth.OAuth2(
    constants.client_id,constants.client_secret,"postmessage"
)

export {oauth2client}