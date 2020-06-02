import React, { useState } from "react";
import axios from "axios";
import "./form.css";
import history from "../history";

function FormComponent() {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handlePwdChange(e) {
    setPwd(e.target.value);
  }
  function handleUrlChange(e) {
    setUrl(e.target.value);
  }
  function handleSubmit() {
    setLoading(true);
    axios
      .post("http://localhost:3000/api/signup", {
        name: name,
        password: pwd,
        picture: url,
      })
      .then(function (response) {
        console.log(response);
        clearData();
        history.push("/");
        setLoading(false);
      });
  }
  function clearData() {
    setName("");
    setPwd("");
    setUrl("");
  }
  return (
    <div className="width">
      <h2>Express Test Form</h2>
      <input
        type="text"
        name="name"
        className="form-control margin-bottom"
        value={name}
        onChange={handleNameChange}
        placeholder="Name"
      ></input>
      <input
        type="password"
        name="pwd"
        className="form-control margin-bottom"
        value={pwd}
        onChange={handlePwdChange}
        placeholder="Password"
      ></input>
      <input
        type="text"
        name="url"
        className="form-control margin-bottom"
        value={url}
        onChange={handleUrlChange}
        placeholder="Profile link"
      ></input>

      {loading && (
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}

      {!loading && (
        <button onClick={handleSubmit} className="btn btn-primary">
          Click me
        </button>
      )}
    </div>
  );
}

export default FormComponent;
