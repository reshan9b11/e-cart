const route= require('express').Router()
route.use('/vendor',require('./vendor'))
route.use('/product',require('./product'))
exports=module.exports={
    route
}