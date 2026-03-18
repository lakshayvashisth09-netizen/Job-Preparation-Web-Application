import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "Token is required"]
  } }, {
  timestamp: true

  }
);

const Blacklist = mongoose.model("Blacklist", blacklistSchema);

export { Blacklist };
