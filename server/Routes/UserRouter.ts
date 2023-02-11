import {
	RegisterUser,
	GetAllUser,
	SingleGet,
	Loginuser,
} from "../Controller/UserController";
import express from "express";
const router = express.Router();

router.route("/getall").get(GetAllUser);
router.route("/getOne/:id").get(SingleGet);
router.route("/register").post(RegisterUser);
router.route("/login").post(Loginuser);

export default router;
