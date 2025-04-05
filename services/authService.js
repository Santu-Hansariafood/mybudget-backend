import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;
// console.log("JWT_SECRET:", JWT_SECRET);

export const registerUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return { user: newUser, token };
};

export const getUsers = async () => {
  return await User.find({}, "-password");
};

export const getUserById = async (id) => {
  const user = await User.findById(id, "-password");
  if (!user) throw new Error("User not found");
  return user;
};

export const updateUser = async (id, updates) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  Object.assign(user, updates);
  await user.save();
  return user;
};

export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error("User not found");
  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid email or password");

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  };
};
