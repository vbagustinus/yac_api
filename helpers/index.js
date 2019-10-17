const mongoose = require('mongoose')
const {Types: {ObjectId}} = mongoose

const validateObjectId = (id) => ObjectId.isValid(id) && (new ObjectId(id)).toString() === id
const responseSuccess = ({ code , error, message, data }) => {
	return {
		statusCode: code || 500,
		data: data || {},
		message: message || '',
    error: error || '',
	}
}
module.exports = {
  validateObjectId,
  responseSuccess
}