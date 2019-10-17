// External Dependancies
const User = require('../models/User')
const { responseSuccess } = require('../helpers')
exports.getUsers = async (res, reply) => {
	try {
		User.find()
				.then(users => {
					return reply.status(200).json(responseSuccess({
						code: 200,
						data: users,
						message: 'success'
					}))
				})
				.catch(() => {
					return reply.status(500).json(responseSuccess({ message: 'failed get data', error: 500, data: {}}))
				})
	} catch(err) {
		return reply.status(500).json(responseSuccess({ message: 'failed get data', error: 500, data: {} }))
	}
}

exports.removeUser = async (req, reply) => {
	try {
		const { id } = req.params
		User.findByIdAndDelete(id, (err) => {
			if (err) return reply.status(500).json(responseSuccess({ message: 'failed remove data', error: 500, data: {} }))
			return reply.status(200).json(responseSuccess({
				message: 'successs'
			}))
		})
	} catch(err) {
		return reply.status(500).json(responseSuccess({ message: 'failed get data', error: 500 , data: {}}))
	}
}

exports.registerUsers = async (data, reply) => {
	try {
		const {
			fullname,
			username,
			password,
			avatar,
		} = data.body
		User.findOne({ username }, async function (err, adventure) {
			if (err) reply.status(400).json(responseSuccess({ message: err.errmsg, error: err.code }))
			if(adventure) return reply.status(400).json(responseSuccess({ message: 'duplicate', error: 500, data: {} }))
			if(!adventure) {
				const user = new User({
					fullname,
					username,
					password,
					avatar,
				})
				await user.save((err) => {
					if (err) return reply.status(500).json(responseSuccess({ message: err.errmsg, error: err.code, data: {} }))
					return reply.status(200).json(responseSuccess({ code: 200, message: 'success', data: {} }))
				})
			}
		})
	} catch(err) {
		throw reply.boom.methodNotAllowed()
	}
}

exports.loginUsers = async (data, reply) => {
	try {
		const {
			username,
			password,
		} = data.body
		User.findOne({ username }, async function (err, user) {
			if (err) return reply.boom.unauthorized()
			if(user) {
				if(password === user.password){
					return reply.status(200).json(responseSuccess({ code: 200, data: user, message: 'success', data: {}}))
				}
				return reply.boom.unauthorized()
			}
			return reply.boom.unauthorized()
		})
	} catch(err) {
		return reply.boom.unauthorized()
	}
}
