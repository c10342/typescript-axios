const express = require('express')

const bodyParser = require('body-parser')

const app = express()

const path = require('path')


// 处理post请求数据
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


app.get('/simple/get',function(req,res){
    res.json({message:'success'})
})

app.get('/test/get',function(req,res){
    res.json(req.query)
})

app.post('/base/post',function(req,res){
    res.json(req.body)
})

app.post('/buff/post',function(req,res){
    let buff = []
    req.on('data',(chunk)=>{
        if(chunk){
            buff.push(chunk)
        }
    })
    req.on('end',()=>{
        let buf = Buffer.concat(buff)
        res.json({
            buff:buf.toJSON()
        })
    })
})

app.use('/', express.static(path.join(__dirname, './dist')))

const port = process.env.PORT || 5001

const host = process.env.HOST || 'localhost'

app.listen(port, host, () => {
    console.log(`服务器地址 : ${host}:${port}`)
})