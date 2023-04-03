import Car from "../models/Car.js";
import User from "../models/User.js";



//test create Car
export const createCar = async (req, res, next) => {
  const userId = req.params.userId;
  const newCar = new Car({...req.body, owner: userId});
  try {
    const savedCar = await newCar.save();
    try{
      await User.findByIdAndUpdate(userId, {
        $push:{cars:[savedCar._id]}
      })
    }catch(err){
      next(err);
    }
    res.status(200).json(savedCar);
  } catch (err) {
    next(err);
  }
};

export const updateCar = async (req, res, next) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCar);
  } catch (error) {
    next(error);
  }
};
export const deleteCar = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    await Car.findByIdAndDelete(req.params.id);
    try{
      await User.findByIdAndUpdate(userId, {
        $pull:{cars: req.params.id}
      })
    }catch(err){
      next(err);
    }
    res.status(200).json("The Car has been removed");
  } catch (error) {
    next(error);
  }
};
export const getCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id).populate("services");
    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
};
export const getCars = async (req, res, next) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};
export const getCarsByType = async (req, res, next) => {
  const type = req.query.populate
  try {
    const cars = await Car.find().populate(type);
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};
export const getCarsWhitService = async (req, res, next) => {
  try {
    const cars = await Car.find().populate("services");
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};
export const getCarsByOwner = async (req, res, next) => {
  try {
    const cars = await Car.find({owner:req.params.user}).populate("services");
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};
