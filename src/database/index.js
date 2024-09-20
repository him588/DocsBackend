import mongoose from "mongoose";

async function DatabaseConnection() {
  try {
    const connection = await mongoose.connect(process.env.MONGOURI);
    console.log("DATABASE CONNECTION SUCCESSFULL", connection.connection.host);
  } catch (error) {
    console.log({ "DATABASE CONNECTION ERROR": error });
  }
}
export default DatabaseConnection;
