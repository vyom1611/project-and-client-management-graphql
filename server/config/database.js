const mongoose = require("mongoose")


const connectDB = async () => {
    const conn = await mongoose.connect();

    console.log(`MongoDB connected: ${conn.connection.host}`)
}

module.exports = connectDB;