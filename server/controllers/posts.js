// Models
import Post from "../models/Post.js";
import User from "../models/User.js";

import path, { dirname } from "path";
import { fileURLToPath } from "url";



// Create a post
export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    // Юзер вшитий в рек за допомогою мідлвару checkAuth
    const user = await User.findById(req.userId);

    if (req.files) {
      // Формуєм ім'я файлу
      let fileName = new Date().toString() + req.fields.image.name;
      // Отримуєм шлях до данного контроллера
      const __dirname = dirname(fileURLToPath(import.meta.url));
      // Перемістити файл з форми в папку аплоадс
      req.files.image.mv(path.join(__dirname, "..", "uploads", fileName));

      const newPostWithImage = new Post({
        username: user.username,
        title,
        text,
        imgUrl: fileName,
        author: req.userId,
      });

      await newPostWithImage.save();

      // Додаємо новий пост в масив постів юзера
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithImage },
      });

      return res.json({ message: "New post created!", newPostWithImage });
    }

    const newPostWithoutImage = new Post({
      username: user.username,
      title,
      text,
      author: req.userId,
    });

    await newPostWithoutImage.save(); 
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPostWithoutImage },
    });

    return res.json({ message: "New post created!", newPostWithoutImage });

  } catch (error) {
    console.error(error.message);
    res.json({
      message: "Post not created. Something went wrong while creating a post.",
      error,
    });
  }
};
