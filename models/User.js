// External Dependancies
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
	fullname: String,
	username: String,
	avatar: String,
	password: String,
	createdAt: { type: Date, default: Date.now },
	editedAt: { type: Date, default: Date.now }, 
})

// const user = {
//   email : "investree.tester01@gmail.com",
//   familyName : "Testing",
//   givenName: "Investree",
//   id: "114138968174057505832",
//   name: "Investree Testing",
//   photo: "https://lh6.googleusercontent.com/-b5rBpCCqaNk/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfoiAmxlBQeWAtHuuJsgdu0bnROag/s96-c/photo.jpg"}

module.exports = mongoose.model('User', userSchema)
