import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/produtos', async (req: any, res: any) => {
    const produtos = await prisma.categoria.findMany()

    res.json(produtos)

})
app.post('/produtos', async (req: any, res: any) => {

    const data = req.body
    const { descricao, status } = data

    await prisma.categoria.create({

        data: {
            descricao,
            status
        }

    })
    res.send().status(200)


})
app.put('/produtos/:id', async (req: any, res: any) => {
    const id  = Number(req.params.id )  

    const data = req.body
    const { descricao, status } = data

    await prisma.categoria.update({
        where: {
             id
        },
        data: {
            descricao,
            status
        },
    })
    res.send().status(200)




})
app.delete("/produtos/:id", async (req:any, res:any)=>{
    
    const id = Number(req.params.id) 
    await prisma.categoria.delete(
     {   where:{
            id
        }}
    )

    res.send().status(200)


})

app.listen(port, () => {
    console.log(`Sevidor rodado na porta ${port}`)
})