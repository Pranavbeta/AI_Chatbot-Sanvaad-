import { Router } from "express";
import {
  getAllUsers,
  userSignup,
  userLogin,
  userLogout,
  verifyUser,
  googleLogin,
} from "../controllers/user-controllers.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);
// userRoutes.get('/test',(req,res)=>{
//   res.send('test pass');
// })
userRoutes.get('/google',googleLogin)
export default userRoutes;  