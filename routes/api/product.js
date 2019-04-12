const product = require('../../db').product
const route=require('express').Router();

route.get('/',(req,res)=>{
    product.findAll()
    .then((product)=>{
        res.status(200).send(product)
 
    })
    .catch((err)=>{
       res.status(500).send({
           error:"Could not retrieve Vendor"
           
       })
    })
 
 })
 route.post('/',(req,res)=>{
     if(isNaN(req.body.price)){
         return res.status(403).send({
             error:"Invalid Number"
         })
     }
     product.create({
         name:req.body.name,
         price:parseFloat(req.body.price)
     }).then((product)=>{
         res.status(201).send(product)
     }).catch((err)=>{
         res.status(500).send({
             error:"Could not retrieve Vendor"
             
         })
     })
  })
 


exports=module.exports=route;