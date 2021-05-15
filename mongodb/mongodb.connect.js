const mongoose = require('mongoose')
require('dotenv').config()

const uri = process.env.MONGODB_ATLAS_URI

async function connect() {
  try {
    await mongoose.connect(
      uri,
      { 
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    )
  } catch(err) {
    console.error('There was an error connecting to mangoDB')
    console.error(err)
  }
  
}

module.exports = { connect }