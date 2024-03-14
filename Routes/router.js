const express = require('express')
const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')
const cartController = require('../Controllers/cartController')
const jwtMiddleware = require('../MiddleWare/jwtMiddleware')
const wishlistController = require('../Controllers/wishlistController')
const router = new express.Router()

// get all product
router.get('/all-products',productController.getAllProductController)
// regitser
router.post('/register',userController.registerController)
// login
router.post('/login',userController.loginController)
// 
router.get('/view-product/:id',productController.getAProductController)

// addtowishlist
router.post('/add-to-wishlist',jwtMiddleware,wishlistController.addToWishlistController)

// gettowishlist
router.get('/get-wishlist',jwtMiddleware,wishlistController.getWishlistController)
// removewishlist
router.delete('/wishlist-remove/:id',jwtMiddleware,wishlistController.removeProductWishlistController)
// addtocart
router.post('/add-to-cart',jwtMiddleware,cartController.addToCartController)
// getcart
router.get('/get-cart',jwtMiddleware,cartController.getCartController)
// remove cart
router.delete('/remove-cart/:id',jwtMiddleware,cartController.removeCartItemController)
// increment
router.get('/cart-increment/:id',jwtMiddleware,cartController.incrementItem)
// decrement
router.get('/cart-decrement/:id',jwtMiddleware,cartController.decrementItemController)
// empty cart
router.delete('/empty-cart',jwtMiddleware,cartController.emptyCartController)
 
module.exports = router