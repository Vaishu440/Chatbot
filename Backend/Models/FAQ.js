const mongoose = require('mongoose');
const FAQ = mongoose.Schema({
    question:String,
    answer:String,
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('FAQ',FAQ);