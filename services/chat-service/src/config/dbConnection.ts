import mongoose from "mongoose";

const MONGODB_URL: string = String(process.env.MONGODB_URL)

export default async ( ) => {
    mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log(`db connected with chat-service successfully`);
    })
    .catch((error) => {
        console.log(`an error happened during connecting with chat service ${error}`);
    })
}