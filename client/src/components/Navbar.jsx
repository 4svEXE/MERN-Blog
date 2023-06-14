import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const isAuth = useSelector(checkIsAuth);
  const activeStyles = {
    "border-bottom": "1px solid #fff",
  };

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("You are logged out!");
  };

  const paths = [
    {
      to: "/",
      title: "Home",
    },
    {
      to: "/posts",
      title: "Posts",
    },
    {
      to: "/new",
      title: "New post",
    },
  ];

  return (
    <div className="w-full px-6 flex py-6 justify-between items-center bg-[#27374D90]">
      <NavLink to={"/"} className="">
        <span className="flex justify-center items-center w-6 h-6 p-6 bg-[red] text-2xl rounded-sm">
          E
        </span>
      </NavLink>

      <ul className="flex flex-gap-8">
        {isAuth &&
          paths.map((path, i) => (
            <li key={path + i}>
              <NavLink
                to={path.to}
                className="text-xs p-4 hover:bg-[red] p-3 transition-all duration-300"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                {path.title}
              </NavLink>
            </li>
          ))}
      </ul>

      {isAuth ? (
        <button
          onClick={logoutHandler}
          className="flex justify-center items-center text-xs roundet-sm p-3 duration-300 transition-all bg-[#27374D] hover:bg-[red]"
        >
          log out
        </button>
      ) : (
        <Link
          to={"/login"}
          className="flex justify-center items-center text-xs roundet-sm p-3 duration-300 transition-all bg-[#27374D] hover:bg-[red]"
        >
          log in
        </Link>
      )}
    </div>
  );
}

export default Navbar;
