import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User cabinet
export const show = async (req, res) => {
  const validPaths = {
    register: "/register",
    login: "/login",
    getMe: "/me",
  };

  res.json({ message: "Hi! Api '/auth' is work!", validPaths });
};

// Register user
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.json({
        message: "You already have this account registered with this account",
      });
    }

    const salt = bcrypt.genSaltSync(10); // важкість хеша
    const hash = bcrypt.hashSync(password, salt); // хешуєм пароль

    const newUser = new User({ username, password: hash });

    const token = jwt.sign(
      {
        //зрозуміти чи авторизувався юзер
        id: newUser._id,
      },
      process.env.JWT_SECREET, // ключове слово по якому формується токен
      { expiresIn: "30d" } // на скільки зберігається торен
    );

    await newUser.save();

    res.json({ newUser, token, message: "Your account has been registered" });
  } catch (error) {
    console.error(error.message);
    res.json({
      message: "Something went wrong while creating your account",
      error,
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ message: "User does not exist!" });
    }

    // Порівнює хеші паролів
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({ message: "Password does not correct!" });
    }

    const token = jwt.sign(
      {
        //зрозуміти чи авторизувався юзер
        id: user._id,
      },
      process.env.JWT_SECREET, // ключове слово по якому формується токен
      { expiresIn: "30d" } // на скільки зберігається торен
    );

    res.json({ token, user, message: "Success login!" });
  } catch (error) {
    console.error(error.message);
    res.json({
      message: "Something went wrong while login to your account",
      error,
    });
  }
};

// User cabinet
export const getMe = async (req, res) => {
  try {
    // Змінну userId ми вшили в мідлварі checkAuth
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({ message: "User does not exist" });
    }

    const token = jwt.sign(
      {
        //зрозуміти чи авторизувався юзер
        id: user._id,
      },
      process.env.JWT_SECREET, // ключове слово по якому формується токен
      { expiresIn: "30d" } // на скільки зберігається торен
    );

    res.json({ user, token, message: "Success" });
  } catch (error) {
    console.error(error.message);
    res.json({
      message: "Something went wrong! No access to your account!",
      error,
    });
  }
};
