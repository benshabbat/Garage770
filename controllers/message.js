import Message from "../models/Message.js";
import User from "../models/User.js";


export const createMessage = async (req, res, next) => {
  const from = req.params.from;
  const to = req.params.to;
  const newMessage = new Message({ ...req.body, to: to, from: from });
  try {
    const savedMessage = await newMessage.save();
    // try {
    //   await User.findByIdAndUpdate(from, {
    //     $push: { messages: [savedMessage._id] },
    //   });
    //   await User.findByIdAndUpdate(to, {
    //     $push: { messages: [savedMessage._id] },
    //   });
    // } catch (err) {
    //   next(err);
    // }
    res.status(200).json(savedMessage);
  } catch (err) {
    next(err);
  }
};

export const updateMessage = async (req, res, next) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.idMessage,
      {
        $set: {read:true},
      },
      { new: true }
    );
    res.status(200).json(updatedMessage);
  } catch (error) {
    next(error);
  }
};
export const deleteMessage = async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json("The Message has been removed");
  } catch (error) {
    next(error);
  }
};
export const getMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
// export const getMessagesByType = async (req, res, next) => {
//   const type = req.query.populate
//   try {
//     const services = await Service.find().populate(type);
//     res.status(200).json(services);
//   } catch (error) {
//     next(error);
//   }
// };

