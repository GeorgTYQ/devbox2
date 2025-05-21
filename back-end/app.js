

//提供路由，中间支持，请求/响应的处理
import express from 'express';
//安全管理项目敏感信息（密码，端口号）
//dotenv是一个零依赖的模块，用于将环境变量加载到process.env中
import dotenv from 'dotenv';
//解决前后端跨域问题
import cors from 'cors';
//解析请求体（可以直接解释json格式的请求体）
import bodyParser from 'body-parser'; //
import {PrismaClient} from '@prisma/client';


dotenv.config();

const app = express()
const prisma = new PrismaClient()

//dotenv是一个零依赖的模块，用于将环境变量加载到process.env中
const port = process.env.PORT || 3000
console.log("running on port " + port);


app.unsubscribe(cors({
  origins:"*",
  methods:['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders:['Content-Type']
}))

app.use(bodyParser.json())
