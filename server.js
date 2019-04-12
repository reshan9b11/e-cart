
const express = require('express')
const {
  db,
  vendors,
  products
} = require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/',
  express.static(__dirname + '/public')
);

//http method for vendor

app.get('/vendor', findAllVendor);
app.post('/vendor', addVendor);
app.post('/deletevendor', deleteVendor);



async function findAllVendor(req, res) {
  const result = await vendors.findAll()
  res.send(result)
}

async function addVendor(req, res) {
  try {
    const result = await vendors.create({
      name: req.body.name
    })
    res.send({ success: true })
  } catch (e) {
    res.send({ success: false, err: e.message })
  }
}

async function deleteVendor(req, res) {
  try {
    const dltven = await vendors.destroy({
      where: {
        id: req.body.id
      }
    })
    if (dltven != 0) {
      res.send({ success: true });
    }
    else {
      res.send({ success: false, error: 'Invalid id' })
    }
  } catch (e) {
    res.send({ success: false, error: e.Message })
  }
}

// http method for product 
app.get('/product',findAllProduct);
app.post('/product', addProduct);
app.post('/deletproduct',deleteProduct);



 async function findAllProduct (req, res) {
  try{
    console.log("hiiiiiiiiiiii")
  const pro = await products.findAll(
    {
      include:vendors
    }
  )
  res.send(pro)
  }catch (e) {
    res.send({ success: false, err: e.message })
  }
 
}

 async function addProduct(req, res){
  try {
    const pro = await products.create(req.body)
    res.send({ success: true })
  } catch (e) {
    res.send({ success: false, err: e.message })
  }
}



async function deleteProduct(req,res){
 try{
  let dltPro= await products.destroy({
    where :{
      id: parseInt(req.body.id)
    }
  })
  if(dltPro!=0){
    res.send({success : true})
  }else{
    res.send({success : false,error: 'invalid id'})
  }
}
catch(e){
 res.send({success:false,error:e.Message}) 
}
}
const PORT=process.env.PORT || 8888
db.sync()
  .then(() => {
    app.listen(PORT)
  })
