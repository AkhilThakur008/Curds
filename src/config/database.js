const monogoose = require('mongoose')

function connectToDb(){
    monogoose.connect(process.env.MONGO_URI)

    .then(()=>{
        console.log("Connect To Db")
    })
}

module.exports = connectToDb;