const mongoose = require("mongoose");

const { Schema } = mongoose

const TaskSchema = new Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    text:Text, 
    collection:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Collection'
    }
},{timestamps:true})

module.exports = mongoose.model('Task',TaskSchema)