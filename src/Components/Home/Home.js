import React, { useState, useEffect } from "react";
import { getUsers } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "./home.scss";

const Home = () => {
  const [userDetail, setUserDetail] = useState([]);
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState("");
  const [editUserId, setEditUserId] = useState(null); // new state to keep track of edited user ID
  const dispatch = useDispatch();
  const user = useSelector((state) => state.home.users);

  useEffect(() => {
    dispatch(getUsers())
      .then((res) => {
        console.log("INSIDE COMPONENT", res);
        setUserDetail(res.payload);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [dispatch]);

  const handleEdit = (id) => {
    setEditUserId(id); // update edited user ID
    setEdit(true);
  };

  const handleEmailChange = (id, email) => {
    const updateUserEmail = userDetail.map((ele) => {
      if (ele.id === id) {
        return { ...ele, email: email };
      }
      return ele;
    });
    setUserDetail(updateUserEmail);
    setEdit(false);
    setEditUserId(null); // reset edited user ID
  };

  const handleDelete = (id) => {
    const deleteUser = userDetail.filter((ele) => ele.id !== id);
    setUserDetail(deleteUser);
  };

  return (
    <div>
      <ul className="nav wrapper">
        <li className="container">
          <h3>TEST</h3>
        </li>
      </ul>
      <div>
        <div>
          <table className="table table-dark table-striped-columns">
            <thead>
              <tr>
                <th scope="col">Display Picture</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {userDetail.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img className="profile__pic" src={item.avatar} />
                    </td>
                    <td>{item.first_name}</td>
                    {edit && editUserId === item.id ? ( // conditionally render email input for edited user
                      <td>
                        <input
                          placeholder="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                          onClick={() => handleEmailChange(item.id, email)}
                        >
                          Save
                        </button>
                      </td>
                    ) : (
                      <td>{item.email}</td>
                    )}
                    <td>
                      <button
                        className="rounded"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="rounded"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
       

    </div>
        </div>
        </div>
    )
}

export default Home