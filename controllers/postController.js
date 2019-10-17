// External Dependancies
const { validateObjectId, responseSuccess } = require('../helpers')
// Get Data Models
const Post = require('../models/Post')

exports.getPosts = async (res, reply) => {
	try {
		Post.find().sort('-editedAt').find(function (err, posts) {
			// user posts array
			if(err) return reply.status(400).json(responseSuccess({ message: 'failed get data', error: 400 }))
			return reply.status(200).json(responseSuccess({
				code: 200,
				data: posts,
				message: 'success'
			}))
		})
	} catch (err) {
		return reply.status(400).json(responseSuccess({ message: 'failed get data', error: 400 }))
	}
}

// Get single post by ID
exports.getSinglePost = async (req, reply) => {
	try {
		const id = req.params === undefined ? req.id : req.params.id
		const post = await Post.findById(id)
		return post
	} catch (err) {
		throw reply.status(400).json(responseSuccess({ message: 'failed get data', error: 400 }))
	}
}

exports.getPostbyUserId = async (req, reply) => {
	try {
		const id = req.params === undefined ? req.id : req.params.id
		Post.find({user_id: id})
				.then(posts=> {
					return reply.status(200).json(responseSuccess({
						code: 200,
						data: posts,
						message: 'success'
					}))
				})
				.catch(() => reply.status(400).json(responseSuccess({ message: 'failed get data', error: 400 })))
	} catch (err) {
		throw reply.status(400).json(responseSuccess({ message: 'failed get data', error: 400 }))
	}
}

// Add a new post
exports.addPost = async (req, reply) => {
	try {
		let {
			title,
			like,
			dislike,
			user_id,
		} = req.body
		if(validateObjectId(user_id)) {
			const Obj = {
				title,
				like,
				dislike,
				user_id,
			}
			console.log(Obj);
			
			const post = new Post(Obj)
			await post.save((err) => {
			// 	console.log(err);
				
				if (err) return reply.code(500).send(responseSuccess({ message: err.errmsg, error: err.code, data: {} }))
				return reply.send(responseSuccess({ code: 200, message: 'success' }))
			})
			// return newPost
		} else {
			throw reply.boom.methodNotAllowed()
		}
	} catch (err) {
		throw reply.boom.methodNotAllowed()
	}
}

// Update an existing post
exports.updatePost = async (req, reply) => {
	try {
		const id = req.params === undefined ? req.id : req.params.id
		const { title, user_id } = req.body
		// const update = await Post.findByIdAndUpdate(id, updateData, { new: true })
		Post.findOne({ _id: id }, function (err, post) {
			if(err) throw reply.boom.methodNotAllowed()
			if(post.user_id == user_id){
				Post.where({ _id: post._id }).updateOne({ title, editedAt: new Date() }, (err, done) => {
					if(err) throw reply.boom.methodNotAllowed()
					return reply.send(responseSuccess({ code: 200, message: 'success' }))
				})
			} else {
				throw reply.boom.methodNotAllowed()
			}
		})
	} catch (err) {
		throw reply.boom.methodNotAllowed()
	}
}

// Delete a post
exports.deletePost = async (req, reply) => {
	try {
		const id = req.params === undefined ? req.id : req.params.id
		Post.findOneAndDelete({_id: id})
		.then(() => reply.send(responseSuccess({ code: 200, message: 'success' })))
		.catch(() => reply.boom.methodNotAllowed())
	} catch (err) {
		throw reply.boom.methodNotAllowed()
	}
}

exports.likePost = async (req, reply) => {
	try {
		const id = req.params === undefined ? req.id : req.params.id
		const { user_id } = req.body
		Post.findOne({ _id: id }, function (err, post) {
			if(err) throw reply.boom.methodNotAllowed()
			if(post.like.length > 0 && (post.like.findIndex(x => x == user_id) === -1)){
				post.like.push(user_id)
			} else if(post.like.length === 0){
				post.like.push(user_id)
			}
			if(post.dislike.length > 0){
				newDislike = []
				post.dislike.forEach(id => {
					if(id != user_id){
						newDislike.push(id)
					}
				})
			}
			Post.where({ _id: post._id }).updateOne({like: post.like, dislike: newDislike}, (err, done) => {
				if(err) throw reply.boom.methodNotAllowed()
				return reply.send(responseSuccess({ code: 200, message: 'success' }))
			})
		})
	} catch (err) {
		throw reply.boom.methodNotAllowed()
	}
}

exports.dislikePost = async (req, reply) => {
	try {
		const id = req.params === undefined ? req.id : req.params.id
		const { user_id } = req.body
		Post.findOne({ _id: id }, function (err, post) {
			if(err) throw reply.boom.methodNotAllowed()
			console.log(post);
			
			if(post.dislike.length > 0 && (post.dislike.findIndex(x => x == user_id) === -1)){
				post.dislike.push(user_id)
			} else if(post.dislike.length === 0){
				post.dislike.push(user_id)
			}
			if(post.like.length > 0){
				newLike = []
				post.like.forEach(id => {
					console.log(id);
					
					if(id != user_id){
						console.log(id !== user_id);
						newLike.push(id)
					}
				})
			}
			Post.where({ _id: post._id }).updateOne({dislike: post.dislike, like: newLike}, (err, done) => {
				if(err) throw reply.boom.methodNotAllowed()
				return reply.send(responseSuccess({ code: 200, message: 'success' }))
			})
		})
	} catch (err) {
		throw reply.boom.methodNotAllowed()
	}
}
