
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true
    },
    role :{
        type : String,
        enum : ["user","admin","provider"],
        default : "user"
    },
    status : {
        type : String,
        enum : ["active","pending","blocked"],
        default : "pending"
    }
},{
    timestamps : true
}
)

export default mongoose.models.user || mongoose.model("user",userSchema)