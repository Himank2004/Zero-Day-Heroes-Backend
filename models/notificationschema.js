import mongoose from "mongoose";
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  actionUser: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['follow', 'like', 'comment','post'], required: true }, 
  post: { type: Schema.Types.ObjectId, ref: 'Post' }, 
  message: { type: String, required: true }, // notification message
  createdAt: { type: Date, default: Date.now },
});

const Notification = new mongoose.model("Notification", NotificationSchema);
export {Notification};