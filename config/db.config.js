import mongoose from 'mongoose'

let connected = false

export const connectDB = async () => {
  mongoose.set('strictQuery', true)

  // if db already connected, don't connect again
  if (connected) {
    console.log(
      `ALREADY CONNECTED TO: ${mongoose.connection.name}`.yellow.inverse
    )
    return
  }

  // connect to mongodb
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    connected = true

    console.log(`MONGODB CONNECTED: ${mongoose.connection.name}`.green.inverse)
  } catch (error) {
    connected = false
    console.log(`${error}`.red.inverse)
  }
}
