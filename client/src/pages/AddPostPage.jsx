import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "redux/features/post/postSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkIsAuth } from "redux/features/auth/authSlice";

checkIsAuth

function AddPostPage() {
  const isAuth = useSelector(checkIsAuth);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  // const { status } = useSelector((state) => {
  //   return state.auth;
  // });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) toast(status);
    // if (isAuth) navigate("/");
  }, [status, navigate]);

  const handleSubmit = () => {
    if (title.length > 5 && text.length > 5) {
      try {
        const data = new formData();
        data.append('title', title);
        data.append('text', text);
        data.append('image', image);

        console.log('handleSubmit33333333333333333333333', new FormData());
        dispatch(createPost(data));

        // console.log("handleSubmit", title, text);
      } catch (error) {
        console.error(error);
      }
    } else {
      toast("All texts must be longer than 5 characters");
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="container flex flex-col p-6 items-center"
    >

      <h1 className="text-4xl text-center py-4">
      {
        isAuth ? "New post form": "PLEASE LOGIN!"
      }
      </h1>

      <label
        htmlFor="image"
        className="flex flex-col text-xl text-[#3DDE6ED] my-4 p-2 mt-2 bg-[#27374D]"
      >
        Add image:
        <input
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
          className="hidden p-2 mt-2 text-[#27374D]  flex-col"
        />
      </label>

      <div className="flex object-cover py-2">IMAGE</div>

      <label
        htmlFor="title"
        className="flex flex-col text-xl text-[#3DDE6ED] my-4"
      >
        title:
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
          required
          className="p-2 mt-2 text-[#27374D]"
        />
      </label>

      <label
        htmlFor="text"
        className="flex flex-col text-xl text-[#3DDE6ED] w-full my-4"
      >
        Post text:
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="text"
          required
          className="p-2 mt-2 h-[100px] text-[#27374D]"
        />
      </label>

      <div className="flex flex-col flex-gap-8 justify-center mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="min-w-[250px] mb-4 flex justify-center items-center text-xl roundet-sm p-4 bg-[#27374D] hover:bg-[red]"
        >
          save
        </button>

        <button
          type="button"
          onClick={()=>{}}
          className="min-w-[250px] mb-4 flex justify-center items-center text-xl roundet-sm p-4 bg-[#27374D] hover:bg-[red]"
        >
          back
        </button>
      </div>

    </form>
  );
}

export default AddPostPage;
