import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connected ${conn.connection.host}`)
    } catch (e) {
        console.log('Error connecting to database', e)
        process.exit(1)
    }
}