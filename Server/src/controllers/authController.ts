import express from "express";
import { login, signup, verifyUser } from "../models/authModel";
// import { login, signup, verifyUser } from "../models/authModel.js";

const authController = express.Router();

authController.get("/verifyUser", verifyUser);
authController.post("/signup", signup);
authController.post("/login", login);

export default authController;