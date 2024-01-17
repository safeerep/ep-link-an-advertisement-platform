import mongoose from 'mongoose'

const MONGO_URL: string = process.env.MONGODB_URL || '';

export default () => {
    mongoose.connect(MONGO_URL)
    .then(() => {
        console.log(`db connected with the user service successfully`);
    }). catch ((err: any) => {
        console.log(`something went wrong during connecting with db ${err}`);
    })
}





