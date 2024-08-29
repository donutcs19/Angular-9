const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const fileUpload = require('express-fileupload');

const bookController = require('./controller/BookController');


app.use("/book", bookController);
app.use("/uploads", express.static("uploads"));
app.use(fileUpload());

app.post("/book/testUpload", (req, res) => {
try {
  const myFile = req.files.myFile;

  myFile.mv("./uploads" + myFile.name, (err) => {
    if(err){
      res.status(500).send({ error: err });
    }
    res.send({ message: "success" });
  });
} catch (e) {
  res.status(500).send({ error: e.message });
}

});

app.get('/readFile', (req, res) => {
  try {
    const fs = require('fs');
    fs.readFile('test.txt', (err, data) => {
      if (err){
        throw err;
      }
      res.send(data);
    })
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
})

app.get('/writeFile', (req, res) => {
  try {
    const fs = require('fs');
    fs.writeFile('test.txt','Shikikie Node.js', (err) => {
      if (err){
        throw err;
      }
      res.send({message : "success"});
    })
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
})

app.get('/removeFile', (req, res) => {
  try {
    const fs = require('fs');
    fs.unlinkSync("test.txt");
    res.send({message : "success"});
    
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
})

app.get('/fileExists', (req, res) => {
  try {
    const fs = require('fs');
    const found = fs.existsSync("package.json")
    res.send({found: found});
    
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
})

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

  app.get('/book/sum', async (req, res) => {
    try {
      const data = await prisma.book.aggregate({
        _sum: {
          price : true
        },
      });

      res.send({ results: data});
    } catch (e) {
      res.status(500).send({ error:e });
    }
  });

  app.get('/book/max', async (req, res) => {
    try {
      const data = await prisma.book.aggregate({
        _max: {
          price : true
        },
      });

      res.send({ results: data});
    } catch (e) {
      res.status(500).send({ error:e });
    }
  });

  app.get('/book/min', async (req, res) => {
    try {
      const data = await prisma.book.aggregate({
        _min: {
          price : true
        },
      });

      res.send({ results: data});
    } catch (e) {
      res.status(500).send({ error:e });
    }
  });

  app.get('/book/avg', async (req, res) => {
    try {
      const data = await prisma.book.aggregate({
        _avg: {
          price : true
        },
      });

      res.send({ results: data});
    } catch (e) {
      res.status(500).send({ error:e });
    }
  });

app.get('/book/find-ydm', async (req, res) => {
  try {
    const data = await prisma.book.findMany({
      where: {
        registerDate: new Date("2024-05-09"),
      },
    });

    res.send({ results: data });
  } catch (e) {
    res.status(500).send({error:e})
  }
});

app.get('/book/find-yd', async (req, res) => {
  try {
    const data = await prisma.book.findMany({
      where: {
        registerDate:{
          gte: new Date("2024-05-09"),
          lte: new Date("2024-05-31"),
        } 
      },
    });

    res.send({ results: data });
  } catch (e) {
    res.status(500).send({ error:e })
  }
});

app.get('/book/find-year', async (req, res) => {
  try {
    const data = await prisma.book.findMany({
      where: {
        registerDate:{
          gte: new Date("2024-01-01"),
          lte: new Date("2024-12-31"),
        } ,
      },
    });

    res.send({ results: data });
  } catch (e) {
    res.status(500).send({ error:e })
  }
});


app.get('/user/createToken', (req, res) =>{
try {
  const secret = process.env.TOKEN_SECRET;
  const payload = {
    id: 100,
    name: "Shikikie",
    level: "admin",
  };
  const token = jwt.sign(payload, secret, {expiresIn: "1d"});

  res.send({token: token});
} catch (e) {
  res.status(500).send({error: e})
}
});

app.get('/user/verifyToken', (req, res) =>{
  try {
    const secret = process.env.TOKEN_SECRET;
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwLCJuYW1lIjoiU2hpa2lraWUiLCJsZXZlbCI6ImFkbWluIiwiaWF0IjoxNzI0ODUzMzMxLCJleHAiOjE3MjQ5Mzk3MzF9.CCK2CfmtYT07739CrUJq5ofxN4ib4_SSh9etciP8Wj4"
    
    const result = jwt.verify(token, secret);
  
    res.send({results: result});
  } catch (e) {
    res.status(500).send({error: e})
  }
  });
  
function checkSignIn(req, res, next){
  try {
    const secret = process.env.TOKEN_SECRET;
    const token = req.headers["authorization"];
    const result = jwt.verify(token, secret);

    if(result != undefined){
      next();
    }
  } catch (e) {
    console.log(e)
    res.status(500).send({error: e.message});
  }
}

app.get("/user/info", checkSignIn, (req, res, next) => {
  try {
    res.send('hello Shikikie')
  } catch (error) {
    res.status(500).send({error: e});
  }
});

app.get('/oneToOne', async(req, res) => {
  try {
    const data = await prisma.orderDetail.findMany({
      include: {
        book: true
      }
    });
    res.send({ results : data})
  } catch (e) {
    res.status(500).send({error: e});
  }
});

app.get('/oneToMany', async(req, res) => {
  try {
    const data = await prisma.book.findMany({
      include: {
        orderDetails: true
      }
    });
    res.send({ results : data})
  } catch (e) {
    res.status(500).send({error: e});
  }
});

app.get("/multiModel", async (req, res) => {
try {
  const data = await prisma.customer.findMany({
    include: {
      Order: {
        include: {
          orderDetail: true,
        },
      },
    },
  });

  res.send({ results: data });
} catch (e) {
  res.status(500).send({error: e});
}
});

app.listen(3003, () =>{
  console.log("Server Starting... -> http://localhost:3003");
});
