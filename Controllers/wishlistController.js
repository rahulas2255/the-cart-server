const wishlists = require('../wishlistModel')


// add
exports.addToWishlistController = async (req,res)=>{
    const {id,title,price,description,category,image,rating} = req.body
    const userId = req.payload
    try{
        const existingProduct = await wishlists.findOne({id,userId})
        if(existingProduct){
            res.status(406).json("Item already in your wishlist...")
        }else{
            const newProduct = new wishlists({
                id,title,price,description,category,image,rating,userId
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    }catch(err){
        res.status(401).json(err)
    }
}
// get
exports.getWishlistController = async (req,res)=>{
    const userId = req.payload
    try{
        const allProducts = await wishlists.find({userId})
        res.status(200).json(allProducts)
    }catch(err){
        res.status(401).json(err)
    }
}
// remove
exports.removeProductWishlistController = async (req,res)=>{
    const {id} = req.params
    try{
        const removeProduct = await wishlists.findByIdAndDelete({_id:id})
        res.status(200).json(removeProduct)
    }catch(err){
        res.status(401).json(err)
    }
}