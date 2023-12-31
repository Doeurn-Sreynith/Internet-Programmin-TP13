const Products = require("../models/products")
const mongoose = require('mongoose')

const findAllProduct = async ()=>{
  try {
    const products = await Products.find()
    .populate("category")
    .populate("item")
    .exec()
    return {
      success: true,
      data: products
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}

const findById = async (id) => {
  try {
    const product = await Products.findById(id)
    return {
      success: true,
      data: product
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}

const findAll = async (category = '', item = '') => {
  let matchCond = {};
  if(category) matchCond['category'] = mongoose.Types.ObjectId(category)
  if(item) matchCond['item'] = mongoose.Types.ObjectId(item)

  const products = await Products.aggregate([
    {
      "$match": matchCond
    },
    {
      $lookup: {
        from: "Prices",
        localField: "_id",
        foreignField: "Products",
        as: "Prices"
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category"
      },
    },
    {

      $lookup: {
        from: "items",
        localField: "item",
        foreignField: "_id",
        as: "item"
      }
    },
    { "$unwind": "$category" },
    { "$unwind": "$item" },
  ])

  if (!products?.length)
    return []

  return products
}

const create = async (newProduct) => {
  try {
    const product = await Products.create(newProduct)
    return {
      success: true,
      data: product
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}

const update = async (id, newProduct) => {
  try {
    const product = await Products.findById(id)
    product.title = newProduct.title
    product.price = newProduct.price
    product.category = newProduct.category
    product.item = newProduct.item
    product.user = newProduct.user
    product.imageUrl = newProduct.imageUrl
    await product.save()
    return {
      success: true,
      data: product
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}

const remove = async (id) => {
  try{
    await Products.deleteOne({_id:id})
    return {
      success : true,
      data : "product deleted"
    }
  }catch(err){
    return {
      success : false,
      err : err.message
    }
  }
}


const findProductPrice = async () => {
    return await Products.aggregate([
      {
        $lookup:{
          from: "Prices",
          localField: "_id",
          foreignField: "product",
          as: "Prices"
        }
      },
      
      {
        $project: {
          _id: 1,
          title: 1,
          price: 1,
          category: 1,
          item: 1 ,
          user: 1,
          imageUrl: 1,
          Prices: {
            _id: 1,
            product: 1,
            price: 1,
            source: 1,
          }
        }
      }
    ])
  
}

module.exports = {
  findById,
  update,
  remove,
  findAll,
  create,
  findAllProduct,
  findProductPrice
}