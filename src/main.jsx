import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import AddingUserForm from "./Pages/AddingUserForm.jsx";
import EditUser from "./Pages/EditUser.jsx";
import UserList from "./Components/UserList.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="add-user" element={<AddingUserForm />} />
      <Route path="edit-user/:index" element={<EditUser />} />
      <Route path="user-list" element={<UserList />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
