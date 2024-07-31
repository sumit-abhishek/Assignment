import React, { useState, useEffect } from "react";
import { fetchFromLocalStorage, saveToLocalStorage } from "../service";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
const UserList = () => {
  const [userListData, setUserListData] = useState([]);

  useEffect(() => {
    const data = fetchFromLocalStorage("userData") || [];
    setUserListData(data);
  }, []);

  //Function for Removing Data From Local Storage
  const removingUserData = (index) => {
    const updatedData = [...userListData];
    updatedData.splice(index, 1);
    setUserListData(updatedData);
    saveToLocalStorage("userData", updatedData);
  };
  return (
    <table className="w-full border-separate border-spacing-2 table">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">PAN Number</th>
          <th className="border border-slate-600 rounded-md">FullName</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Email
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Mobile Number
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Address Line 1
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Address Line 2
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            City
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            State
          </th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {userListData.map((user, index) => (
          <tr key={index} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">
              {user.pan}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {user.fullName}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {user.email}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {user.mobileNumber}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {user.addressLine1}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {user.addressLine2}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {user.city}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {user.state}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/edit-user/${index}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600" />
                </Link>
                <button onClick={() => removingUserData(index)}>
                  <MdOutlineDelete className="text-2xl text-red-600" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
