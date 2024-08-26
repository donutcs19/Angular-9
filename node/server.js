const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("Hello Shikikie");
});

app.get('/hello/:name', (req, res) =>{
  res.send("Hello" + req.params.name);
});

app.get('/hi/:name/:age', (req, res) =>{
 const name = req.params.name;
 const age = req.params.age;

 res.send("Name : " + name + "Age : " + age);
});

app.post("/hello", (req, res) => {
  res.send(req.body);
});

app.put("/hello33", (req, res) => {
 res.send(req.body);
});

app.delete("/del/:id", (req, res) => {
  res.send("my Delete id = " + req.params.id);
});

//connect postgres
app.get("/book/list", async (req, res) => {
  const data = await prisma.book.findMany();
  res.send({ data: data});
});

app.post('/book/create', async (req, res) => {
 const data = req.body;
 const result = await prisma.book.create({ data: data, });
 res.send({result: result});
});

app.post("/book/createManual", async (req, res ) => {
  const result = await prisma.book.create({
    data: {
      "isbn": "10030",
      "name": "Express.js",
      "price": 1390

    },
  });
 res.send({result: result});

});

app.listen(3003);
