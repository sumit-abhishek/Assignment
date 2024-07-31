import React, { useEffect, useState } from "react";
import "../Style/loginForm.css";
import Loader from "../Components/Loader";
import {
  emailAddressValidation,
  fetchFromLocalStorage,
  panCardValidation,
  postalCodeValidation,
  saveToLocalStorage,
} from "../service";
const AddingUserForm = () => {
  const [pan, setPan] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [panLoading, setPanLoading] = useState(false);
  const [postCodeLoading, setPostCodeLoading] = useState(false);

  useEffect(() => {
    const verifyPan = async () => {
      if (!panCardValidation(pan)) {
        return;
      }
      setPanLoading(true);
      try {
        const response = await fetch(
          "https://lab.pixel6.co/api/verify-pan.php",
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ panNumber: pan }),
          }
        );
        const data = await response.json();
        if (data.isValid) {
          setFullName(data.fullName);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setPanLoading(false);
      }
    };
    verifyPan();
  }, [pan]);

  const userData = fetchFromLocalStorage("userData") || [];
  useEffect(() => {
    const verifyPostalCode = async () => {
      if (!postalCodeValidation(postalCode)) {
        return;
      }
      setPostCodeLoading(true);
      try {
        const response = await fetch(
          "https://lab.pixel6.co/api/get-postcode-details.php",
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ postcode: Number(postalCode) }),
          }
        );
        const data = await response.json();
        setCity(data.city[0].name);
        setState(data.state[0].name);
      } catch (error) {
        console.log(error);
      } finally {
        setPostCodeLoading(false);
      }
    };
    verifyPostalCode();
  }, [postalCode]);

  const handlePan = (e) => {
    setPan(e.target.value.toUpperCase());
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePostalCode = (e) => {
    setPostalCode(e.target.value);
  };
  const submitButton = () => {
    if (!emailAddressValidation(email)) {
      alert("Add Correct Format");
      return;
    }
    const data = {
      pan,
      email,
      fullName,
      postalCode,
      city,
      state,
      mobileNumber,
      addressLine1,
      addressLine2,
    };
    userData.push(data);
    saveToLocalStorage("userData", userData);
  };
  return (
    <div className="main">
      <div className="login-form">
        <form className="row g-3">
          <div className="col-md-3">
            <label className="form-label">PAN Number</label>
            <div className="input-group">
              <input
                type="text"
                id="panNumber"
                className="form-control"
                value={pan}
                maxLength={10}
                onChange={handlePan}
              />
              <div className="input-group-text">{panLoading && <Loader />}</div>
            </div>
          </div>
          {/* <div className="col-md-3">
            <label className="form-label">PAN Number</label>
            <input
              type="text"
              id="panNumber"
              className="form-control"
              value={pan}
              maxLength={10}
              onChange={handlePan}
            />
            {panLoading && <Loader />}
          </div> */}
          <div className="col-md-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={fullName}
              maxLength={140}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={handleEmail}
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
                maxLength={10}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12">
            <label className="form-label">Address Line 1</label>
            <input
              type="text"
              className="form-control"
              placeholder="Address Line 1"
              onChange={(e) => setAddressLine1(e.target.value)}
              maxLength={255}
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Address Line 2</label>
            <input
              type="text"
              className="form-control"
              placeholder="Address Line 2"
              onChange={(e) => setAddressLine2(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Postal Code</label>
            <div className="input-group">
              <input
                type="text"
                value={postalCode}
                className="form-control"
                maxLength={6}
                onChange={handlePostalCode}
              />
              <div className="input-group-text">
                {postCodeLoading && <Loader />}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">City</label>
            <input type="text" className="form-control" value={city} />
          </div>
          <div className="col-md-4">
            <label className="form-label">State</label>
            <input type="text" className="form-control" value={state} />
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitButton}
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddingUserForm;
