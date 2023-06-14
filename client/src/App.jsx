//import Layout from "components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import MainPage from "pages/MainPage";
import PostsPage from "pages/PostsPage";
import PostPage from "pages/PostPage";
import EditPostPage from "pages/EditPostPage";
import AddPostPage from "pages/AddPostPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import Navbar from "components/Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "redux/features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe);
  }, []);

  return (
    // <Layout>
    <BrowserRouter>
      <Navbar />

      <div className="flex justify-center">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/:id" element={<PostPage />} />
          <Route path="/:id/edit" element={<EditPostPage />} />
          <Route path="/new" element={<AddPostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>

      <ToastContainer position="bottom-right"></ToastContainer>
    </BrowserRouter>
    // </Layout>
  );
}

export default App;
