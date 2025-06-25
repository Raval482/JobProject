
import mongoose from "mongoose"

const connection = mongoose.connect("mongodb://localhost:27017/jobApplication")
    .then(() => console.log("database connection successfully"))
    .catch((error) => console.log(error))


export default connection