const express = require("express");
const router = express.Router();
const Queries = require("../models/queries");

router.get("/", (req, res) => {
  Queries.find()
    .then((queries) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.json(queries);
    })
    .catch((err) => res.send("Error: " + err));
});

router.post("/", async (req, res) => {
  const query = new Queries({
    query: req.body.query,
  });
  try {
    const q = await query.save();
    res.json(q);
  } catch (err) {
    res.send("Error: " + err);
  }
});

router.get("/query", (req, res) => {
  if (req.query.q == "") {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ matching: [] });
  } else {
    Queries.find()
      .then((queries) => {
        var i;
        matching = [];
        for (i = 0; i < queries.length; i++) {
          if (queries[i].query.indexOf(req.query.q.toLowerCase()) == 0) {
            matching.push(queries[i].query);
          }
        }

        res.header("Access-Control-Allow-Origin", "*");
        res.json({ matching });
      })
      .catch((err) => res.send("Error: " + err));
  }
});

/*router.get('/',(req,res)=>{
        Alien.find()
        .then(aliens=>res.json(aliens))
        .catch(err=>res.send('Error: '+err))
})

router.get('/:id',(req,res)=>{
    Alien.findById(req.params.id)
    .then(alien=>res.json(alien))
    .catch(err=>res.send('Error: '+err))
})


router.patch('/:id',async (req,res)=>{
    try{
        const alien=await Alien.findById(req.params.id)
        alien.sub=req.body.sub
        const al=await alien.save()
        res.json(al)
    }
    catch(err){
        res.send('Error: '+err)
    }
})


router.delete('/:id',(req,res)=>{
    Alien.findByIdAndRemove(req.params.id)
    .then(data=>res.json(data))
    .catch(err=>res.send(err))
})

router.post('/',async (req,res)=>{
    const alien=new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })
    try{
        const al= await alien.save()
        res.json(al)
    }
    catch(err){
        res.send('Error: '+err)
    }
})*/

module.exports = router;
