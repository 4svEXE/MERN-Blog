import { Router } from "express";
import { show, register, login, getMe } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js"; // Мідлвар який перевіряє токен юзера

const router = new Router();

router.get("/", show);

router.post("/register", register); // Замість (req, res) => {} пишемо логіку в контроллері

router.post("/login", login);

router.get("/me", checkAuth, getMe); // Роут з мідлваром

export default router;
