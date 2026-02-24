const monogoose = require('mongoose')

const noteSchema = new monogoose.Schema({
    title:String,
    discription:String,
})

const notemodel = monogoose.model("fullweb",noteSchema)

module.exports = notemodel