import mongoose from 'mongoose';


const dbconnection = async function  dataBaseConnection() {
   
    try {
      mongoose.set("strictQuery", true);
     await mongoose.connect(process.env.DB_URL, {});
      console.log("MongoDB connected sucessfully");
    } catch (error) {
      console.log("MongoDB Connection Failed", error);
    }
  }
  

  export {dbconnection}
