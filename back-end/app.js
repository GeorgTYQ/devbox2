

//提供路由，中间支持，请求/响应的处理
import express from 'express';
//安全管理项目敏感信息（密码，端口号）
//dotenv是一个零依赖的模块，用于将环境变量加载到process.env中
import dotenv from 'dotenv';
//解决前后端跨域问题
import cors from 'cors';
//解析请求体（可以直接解释json格式的请求体）
import bodyParser from 'body-parser'; //
import { config } from './config.js'; //配置文件
import nodemon from 'nodemon'; //自动重启服务
import {PrismaClient} from '@prisma/client';


dotenv.config();

const app = express()
const prisma = new PrismaClient()

//dotenv是一个零依赖的模块，用于将环境变量加载到process.env中
const port = process.env.PORT || 3000
console.log("running on port " + port);


app.use(cors({
  origins:"*",
  methods:['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders:['Content-Type']
}))

app.use(bodyParser.json())

//读取用户
app.get('/users', async (req, res) => {
  try {
    //等待读取用户数据，当有数据时，赋值users
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read users' });
  }

}
)



//读取单个用户
app.get('/users/:id', async (req, res) => {
  try {
    //等待读取用户数据，当有数据时，赋值users
    const users = await prisma.user.findUnique({
      where:{id:req.params.id}
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read users' });
  }

}
)

//写用户
app.post('/users', async (req, res) => {
  try{
    const {name,email,html5,css3,javascript} = req.body; //获取请求体中的新用户数据
    //进行判断是否数据齐全
    if (!name || !email || !html5 || !css3 || !javascript) {
      //用户方 error
      return res.status(400).json({ error: 'All fields are required' });
      
    }
    const users = await prisma.user.create({
      name,
      email,
      html5,
      css3,
      javascript,
    }); //读取用户数据
    res.status(201).json(newUser); //返回新用户数据
  }catch (error) {
    //数据库方 error
    res.status(500).json({ error: 'Failed to write users' });
  }

})


//监听端口
app.listen(
  config.port, 
  () => {
    console.log(`Server is running on port ${config.port}`);
  }
); 