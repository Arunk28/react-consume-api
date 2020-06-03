import React, { useEffect, useState } from "react";
import MyVerticallyCenteredModal from "./modal";
import "./home.css";
// import Alert from "react-bootstrap/Alert";
import axios from "axios";
function Home() {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  const [requestData, setRequestData] = useState(new Date());
  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then(function (response) {
        setData(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [requestData]);

  function functionDelete(id) {
    axios
      .delete("http://localhost:3000/api/delete/" + id)
      .then(function (response) {
        console.log(response);
        setRequestData(new Date());
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Password</th>
            <th scope="col">href</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((y, i) => (
            <tr key={y.id}>
              <th>{(i = i + 1)}</th>
              <th>{y.name}</th>
              <th>****{y.password.slice(-2)}</th>
              <th>{y.picture}</th>
              <th>
                <labeL className="margin-right">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => setModalShow(true)}
                  >
                    Edit
                  </button>
                </labeL>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />

                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => functionDelete(y.id)}
                >
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
