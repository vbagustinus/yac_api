// External Dependancies
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const productSchema = new mongoose.Schema({
	title: String,
	like: [{ type : ObjectId, ref: 'User', default: [] }],
	dislike: [{ type : ObjectId, ref: 'User', default: [] }],
	user_id: { type : ObjectId, ref: 'User' },
	createdAt: { type: Date, default: Date.now },
	editedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Post', productSchema)
