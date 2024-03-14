const products = require('../productModel')

// get all products
exports.getAllProductController = async (req,res)=>{
    try{
        const result = await products.find()
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(404).json(err)
    }
}
// getAProduct
exports.getAProductController = async (req,res)=>{
    const {id} = req.params
    try{
      const result = await products.findOne({id})
      res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}    