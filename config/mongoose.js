import mongoose from "mongoose";

const db_uri = process.env.db_uri
export const connectToDB = async () => {
  try {
    await mongoose.connect(db_uri)
    console.log("MongoAtlas Conectado");
    
  } catch (error) {
    console.error(error);
    
  }
};