import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, registerUser } from "redux/features/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSelector((state) => {
    return state.auth;
  });

  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) toast(status);
    if (isAuth) navigate("/");
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    if (username.length > 5 && password.length > 5) {
      try {
        dispatch(registerUser({ username, password }));
        // setPassword("");
        // setUsername("");
      } catch (error) {
        console.error(error);
      }
    } else if (username.length <= 5 && username.length != 0){
        toast("Your login must be longer than 5 characters");
    } else if (password.length <= 5 && password.length != 0){
        toast("Your password must be longer than 5 characters");
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="container flex flex-col p-6 items-center"
    >
      <h1 className="text-4xl text-center py-4">Register form</h1>

      <label
        htmlFor="username"
        className="flex flex-col text-xl text-[#3DDE6ED] my-4"
      >
        Username:
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          required
          className="p-2 mt-2 text-[#27374D]"
        />
      </label>

      <label
        htmlFor="password"
        className="flex flex-col text-xl text-[#3DDE6ED] my-4"
      >
        Password:
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
          className="p-2 mt-2 text-[#27374D]"
        />
      </label>

      <div className="flex flex-col flex-gap-8 justify-center mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="min-w-[250px] mb-4 flex justify-center items-center text-xl roundet-sm p-4 bg-[#27374D] hover:bg-[red]"
        >
          register
        </button>

        <Link
          to="/login"
          className="min-w-[250px] flex justify-center items-center text-xl roundet-sm p-4 bg-[#9DB2BF] hover:bg-[red]"
        >
          log in
        </Link>
      </div>
    </form>
  );
}

export default RegisterPage;
