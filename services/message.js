import Message from "../models/Message.js";
import User from "../models/User.js";

export const createMessage = async (req, res, next) => {
    const from = req.params.from;
    const to = req.params.to;
    const newMessage = new Message({ ...req.body, to, from 
    });
      const savedMessage = await newMessage.save();
      try {
        await User.findByIdAndUpdate(from, {
          $push: { messages: [savedMessage._id] },
        });
        await User.findByIdAndUpdate(to, {
          $push: { messages: [savedMessage._id] },
        });
        return savedMessage;
      } catch (err) {
        next(err);
      }
      res.status(200).json(savedMessage);
  };