const mongoose = require("mongoose");

const { Schema } = mongoose

const CollectionShema = new Schema({
    title:{
        type:String,
        unique:true,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Collection',CollectionShema)