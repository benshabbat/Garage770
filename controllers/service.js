import Service from "../models/Service.js";
import Car from "../models/Car.js";
import User from "../models/User.js";

//test create user
export const createService = async (req, res, next) => {
  const carId = req.params.carId;
  const newService = new Service({ ...req.body, car: carId });
  try {
    const savedService = await newService.save();
    try {
      await Car.findByIdAndUpdate(carId, {
        $push: { services: [savedService._id] },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedService);
  } catch (err) {
    next(err);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedService);
  } catch (error) {
    next(error);
  }
};
export const deleteService = async (req, res, next) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json("The Service has been removed");
  } catch (error) {
    next(error);
  }
};
export const getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};
export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};
export const getServicesByType = async (req, res, next) => {
  const type = req.query.populate
  try {
    const services = await Service.find().populate(type);
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

export const getServicesByCar = async (req, res, next) => {
  try {
    const services = await Service.find({ car: req.params.car });
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};
export const getServicesByUser = async (req, res, next) => {
  try {
    const services = await Service.findById({ user: req.params.user });
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

