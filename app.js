const express = require('express')
      app = express()
      cors = require('cors')
      logger = require('morgan')
      mongoose = require('mongoose')
      boom = require('express-boom')
      cookieParser = require('cookie-parser')
      indexRouter = require('./routes/index')
      usersRouter = require('./routes/users')
      postRouter = require('./routes/posts')

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://localhost:27017/yac`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err))

app.use(cors())
app.use(boom())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/post', postRouter)

module.exports = app
