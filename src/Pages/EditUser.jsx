import React, { useState, useEffect } from "react";
import { fetchFromLocalStorage, saveToLocalStorage } from "../service";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const { index } = useParams();
  const [user, setUser] = useState(null);
  // const [value, setValue] = useState();

  useEffect(() => {
    const data = fetchFromLocalStorage("userData") || [];
    if (data[index]) {
      setUser(data[index]);
    }
  }, [index]);

  const handleChangeAddressLine1 = (e) => {
    const { value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      addressLine1: value,
    }));
  };

  const handleChangeAddressLine2 = (e) => {
    const { value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      addressLine2: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = fetchFromLocalStorage("userData") || [];
    data[index] = user;
    saveToLocalStorage("userData", data);
  };
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="main">
      <div className="login-form">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-3">
            <label className="form-label">PAN Number</label>
            <input
              type="text"
              id="panNumber"
              className="form-control"
              maxLength={10}
              readOnly
              value={user.pan}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={user.fullName}
              maxLength={140}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={user.email}
              name="email"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Mobile No</label>
            <div className="input-group">
              <div className="input-group-text">+91</div>
              <input
                type="text"
                className="form-control"
                placeholder="Mobile No."
                readOnly
                value={user.mobileNumber}
              />
            </div>
          </div>
          <div className="col-12">
            <label className="form-label">Address Line 1</label>
            <input
              type="text"
              className="form-control"
              placeholder="Address Line 1"
              maxLength={255}
              value={user.addressLine1}
              onChange={handleChangeAddressLine1}
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Address Line 2</label>
            <input
              type="text"
              className="form-control"
              placeholder="Address Line 2"
              value={user.addressLine2}
              onChange={handleChangeAddressLine2}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Postal Code</label>

            <input
              type="text"
              className="form-control"
              maxLength={6}
              readOnly
              value={user.postalCode}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={user.city}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={user.state}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Edit User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
