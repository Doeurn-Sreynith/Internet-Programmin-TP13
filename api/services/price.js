const Prices = require("../models/prices");

const findAll = async () => {
  // to do
  try {
    const prices = await Prices.find()
    return {
      success : true,
      data : prices
    }
  } catch (error) {
    return {
      success : false,
      error : error.message
    }
  }
}

const create = async (newPrice) => {
  // to do
  try {
    const createdPrice = await Prices.create(newPrice);
    // return createdPrice;
    return {
      success: true,
      data: createdPrice
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

const update = async () => {
  // to do
}

const remove = async () => {
  // to doF
}


module.exports = {
  findAll,
  create,
}