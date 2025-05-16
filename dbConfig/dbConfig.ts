import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("MongoDB connected");
        })
        connection.on("error", (err) => {
            console.log("MongoDB not connected " + err)
        })
        
    } catch (error) {
        console.log("something is wrong");
        console.log(error);
    }
}