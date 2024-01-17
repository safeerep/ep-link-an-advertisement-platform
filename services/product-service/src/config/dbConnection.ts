import mongoose from 'mongoose'

const MONGODB_URL: string = process.env.MONGODB_URL || '';

export default () => {
    mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log(`db connected successfully with product service`);
    })
    .catch(( err: any) => {
        console.log(`something went wrong during connecting with database in product service, ${err}`);
    })
}