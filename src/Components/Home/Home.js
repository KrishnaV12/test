import React, {useState, useEffect } from "react"
import { getUsers } from "../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import "./home.scss"

const Home = () => {
    const [userDetail, setUserDetail] = useState([])
    const [edit, setEdit] = useState(null)
    const dispatch = useDispatch()
    const user = useSelector(state => state.home.users)

    useEffect(() => {
        axios.get('https://reqres.in/api/users?page=1')
        .then(res => {
            setUserDetail(res.data.data)
        })
        .catch(e => {
            console.log(e.message)
        })
    },[])

    const handleEdit = (id, edit) => {
        const updateUser = userDetail.map((ele) => {
            if(ele.id === id){
                return {...ele, first_name: edit}
            }
            return ele
        })
        setUserDetail(updateUser)
    }



    const handleDelete = (id) => {
        const deleteUser = userDetail.filter((ele) => ele.id !== id)
        setUserDetail(deleteUser)
    }



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
                <td><img className="profile__pic" src={item.avatar}/></td>
                <td>{item.first_name}</td>
                <td>{item.email}</td>
                <td>
                  <button  className="rounded" onClick={() => handleEdit(item.id, 'New Name')}>
                    Edit
                  </button>
                </td>
                <td>
                  <button  className="rounded" onClick={() => handleDelete(item.id)}>
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