const cartItems = require ('../cartModel')

// add to cart 
exports.addToCartController = async(req,res)=>{
    const {id,title,image,price,quantity} = req.body
    const userId = req.payload
    try{
        const existingProduct = await cartItems.findOne({id,userId})
        if(existingProduct){
            existingProduct.quantity+=1
            existingProduct.totalPrice = existingProduct.price * existingProduct.quantity
            await existingProduct.save()
            res.status(200).json("Items added successfully")
        }else{
            const newProduct = new cartItems({
                id,title,price,image,quantity,totalPrice:price,userId
            })
            await newProduct.save()
            res.status(200).json("item added successfully to your cart")
        }
    }catch{
        res.status(401).json(err)
    }

}

// get cart
exports.getCartController = async (req,res)=>{
    const userId = req.payload
    try{
        const allProducts = await cartItems.find({userId})
        res.status(200).json(allProducts)
    }catch{
        res.status(401).json(err)
    }
}

// remove cart item
exports.removeCartItemController = async (req,res)=>{
    const {id} = req.params 
    try{
        const removeProduct = await cartItems.findByIdAndDelete({_id:id})
        res.status(200).json(removeProduct)
    }catch(err){
        res.status(401).json(err)
    }
}
// Increase quantity
exports.incrementItem = async (req,res)=>{
    const {id} = req.params
    try{
        const selectedProduct = await cartItems.findOne({_id:id})
        selectedProduct.quantity+=1
        selectedProduct.totalPrice = selectedProduct.quantity * selectedProduct.price
        await selectedProduct.save()
        res.status(200).json(selectedProduct)
    }catch(err){
        res.status(401).json(err)
    }
}
// decrement quantity
exports.decrementItemController = async (req,res)=>{
    const {id} = req.params
    try{
        const selectedProduct = await cartItems.findOne({_id:id})
        selectedProduct.quantity-=1
        if(selectedProduct.quantity==0){
            await cartItems.deleteOne({_id:id})
            res.status(200).json("Quantity updated")
        }else{
            selectedProduct.totalPrice = selectedProduct.quantity * selectedProduct.price
            await selectedProduct.save()
            res.status(200).json(selectedProduct)
        }
    }catch(err){
        res.status(401).json(err)
    }
    
}
// emptycart
exports.emptyCartController = async (req,res)=>{
    const userId = req.payload
    try{
        const result = await cartItems.deleteMany({userId})
        res.status(200).json("deleted successfully")
    }catch(err){
        res.status(401).json(err)
    }     
}