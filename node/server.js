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

app.put('/book/update/:id', async (req, res) => {
  try {
    await prisma.book.update({
      data: {
        isbn: '10022',
        name: 'Node.js',
        price: 1290,
      },
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.send({ message: "Success"});
  } catch (e) {
    res.status(500).send({ error:e });
  }
});

app.delete('/book/del/:id', async (req, res) => {
 try {
  await prisma.book.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send({ message: "Success"});
 } catch (e) {
  res.status(500).send({ error:e });
 }

});

app.post('/book/search', async (req, res) => {
try {
  const keyword = req.body.keyword;
  const data = await prisma.book.findMany({
    where: {
      name:{
        contains: keyword,
      },
    },
  })

  res.send({ result: data })
} catch (e) {
  res.status(500).send({ error:e });
}
});

app.post('/book/startWith', async (req, res) => {
  try {
    const keyword = req.body.keyword;
    const data = await prisma.book.findMany({
      where: {
        name:{
          startWith: keyword,
        },
      },
    })
  
    res.send({ result: data })
  } catch (e) {
    res.status(500).send({ error:e });
  }
  });

  app.post('/book/endsWith', async (req, res) => {
    try {
      const keyword = req.body.keyword;
      const data = await prisma.book.findMany({
        where: {
          name:{
            endsWith: keyword,
          },
        },
      })
    
      res.send({ result: data })
    } catch (e) {
      res.status(500).send({ error:e });
    }
    });
  
  app.get('/book/orderBy', async (req, res) => {
    try {
      const data = await prisma.book.findMany({
        orderBy: {
          price: 'desc'
        }
      });

      res.send({ results: data});
    } catch (e) {
      res.status(500).send({ error:e });
    }
  });

   
  app.get('/book/gt', async (req, res) => {
    try {
      const data = await prisma.book.findMany({
        where: {
          price :{
            gt: 1000
          }
          
        }
      });

      res.send({ results: data});
    } catch (e) {
      res.status(500).send({ error:e });
    }
  });

  app.get('/book/lt', async (req, res) => {
    try {
      const data = await prisma.book.findMany({
        where: {
          price :{
            lt: 1000
          },
          
        },
      });

      res.send({ results: data});
    } catch (e) {
      res.status(500).send({ error:e });
    }
  });

  app.get('/book/notNull', async (req, res) => {
    try {
      const data = await prisma.book.findMany({
        where: {
          detial :{
            not: null,
          },
          
        },
      });

      res.send({ results: data});
    } catch (e) {
      res.status(500).send({ error:e });
    }
  });

  app.get('/book/null', async (req, res) => {
    try {
      const data = await prisma.book.findMany({
        where: {
          detial :null,
        },
      });

      res.send({ results: data});
    } catch (e) {
      res.status(500).send({ error:e });
    }
  });

  app.get('/book/beetween', async (req, res) => {
    try {
      const data = await prisma.book.findMany({
        where: {
          price :{
            lte: 1000,
            gte: 500,
          },
        },
      });

      res.send({ results: data});
    } catch (e) {
      res.status(500).send({ error:e });
    }
  });

app.listen(3003, () =>{
  console.log("Server Starting... -> http://localhost:3003");
});
