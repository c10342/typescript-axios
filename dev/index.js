const express = require('express')

const bodyParser = require('body-parser')

const app = express()

const cookieParser = require('cookie-parser')

const path = require('path')

const multipart = require('connect-multiparty')

const atob = require('atob')

// const webpack = require('webpack')

// const webpackConfig = require('./build/webpack.config.js')

// const webpackDevMiddleware = require('webpack-dev-middleware')

// const webpackHotMiddleware = require('webpack-hot-middleware')

// const compiler = webpack(webpackConfig)

// app.use(webpackDevMiddleware(compiler, {
//     stats: {
//         colors: true,
//         chunks: false
//     }
// }))

// app.use(webpackHotMiddleware(compiler))


// app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, './dist')))


// 处理post请求数据
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use(cookieParser())

app.use(multipart({
    uploadDir: path.resolve(__dirname, 'upload-file')
}))


app.get('/simple/get', function (req, res) {
    res.json(req.query)
})

app.get('/test/get', function (req, res) {
    res.json(req.query)
})

app.post('/base/post', function (req, res) {
    try {
        res.json(req.body)
    } catch (error) {
        res.send(error.toString())
    }
})

app.post('/buff/post', function (req, res) {
    let buff = []
    req.on('data', (chunk) => {
        if (chunk) {
            buff.push(chunk)
        }
    })
    req.on('end', () => {
        let buf = Buffer.concat(buff)
        res.json({
            buff: buf.toJSON()
        })
    })
})

app.get('/cancel/get', function (req, res) {
    setTimeout(() => {
        res.json('hello')
    }, 1000)
})

app.post('/cancel/post', function (req, res) {
    setTimeout(() => {
        res.json(req.body)
    }, 1000)
})

app.get('/more/get', function (req, res) {
    res.json(req.cookies)
})

app.post('/more/upload', function (req, res) {
    console.log(req.body, req.files)
    res.end('upload success!')
})

app.post('/more/post', function (req, res) {
    const auth = req.headers.authorization
    const [type, credentials] = auth.split(' ')
    console.log(atob(credentials))
    const [username, password] = atob(credentials).split(':')
    if (type === 'Basic' && username === 'Yee' && password === '123456') {
        res.json(req.body)
    } else {
        res.status(401)
        res.end('UnAuthorization')
    }
})

app.get('/more/304', function (req, res) {
    res.status(304)
    res.end()
})

app.get('/more/A', function (req, res) {
    res.end('A')
})

app.get('/more/B', function (req, res) {
    res.end('B')
})


const port = process.env.PORT || 5001

const host = process.env.HOST || 'localhost'

app.listen(port, host, () => {
    console.log(`服务器地址 : ${host}:${port}`)
})