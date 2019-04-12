const vendor = require('../../db').vendor
const route=require('express').Router()
route.get('/',(req,res)=>{
    console.log("hello")
   vendor.findAll()
   .then((vendor)=>{
       res.status(200).send(vendor)

   })
   .catch((err)=>{
      res.status(500).send({
          error:"Could not retrieve Vendor"
          
      })
   })

})
route.post('/',(req,res)=>{
    //console.log("called",req.body)
    vendor.create({
        name:req.body.name
    }).then((vendor)=>{
        res.status(201).send(vendor)
    }).catch((err)=>{
        res.status(500).send({
            error:"Could not retrieve Vendor"
            
        })
    })
 })
exports=module.exports=route