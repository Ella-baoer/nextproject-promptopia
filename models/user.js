import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    require: [true, "Email is required!"],
  },
  userName: {
    type: String,
    require: [true, "UserName is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username is invalid, it should be contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String
  }
});

const User = models.User || model('User', userSchema)

export default User