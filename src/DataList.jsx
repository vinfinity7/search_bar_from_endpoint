import React from 'react'
import { useState, useEffect } from 'react';
// import Papa from 'papaparse';
import 'bootstrap/dist/css/bootstrap.min.css';
const DataList = () => {

  const [searchApiData, setSearchApiData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [nameFilterVal, setNameFilterVal] = useState('');
  const [usernameFilterVal, setUsernameFilterVal] = useState('');

  useEffect(() => {

    // Papa.parse('Train_details_22122017.csv', {
    //   download: true,
    //   header: true,
    //   skipEmptyLines:true,
    //   complete: result => {
    //     setUserList(result.data);
    //     setSearchApiData(result.data);
    //   },
    //   error: error => {
    //     console.log(error.message);
    //   }
    // });


    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(result => {
        setUserList(result)
        setSearchApiData(result)
      })
      .catch(error => console.log(error));

  }, [])
  const handleFilter = (property, filterValue) => {
    const filteredData = searchApiData.filter(item =>
      item[property].toLowerCase().includes(filterValue.toLowerCase())
    );
    setUserList(filteredData);
  };

  return (
    <div>
      <div>

      </div>
      <table>
        <tr>
          <th>ID </th>
          <th>Name
            <input
              className="form-control"
              placeholder="Search"
              value={nameFilterVal}
              onChange={e => {
                setNameFilterVal(e.target.value);
                handleFilter('name', e.target.value);
              }}
            />
          </th>
          <th>Username
            <input
              className="form-control"
              placeholder="Search"
              value={usernameFilterVal}
              onChange={e => {
                setUsernameFilterVal(e.target.value);
                handleFilter('username', e.target.value);
              }}
            />
          </th>
          <th>Email</th>
        </tr>
        {
          userList && userList.length > 0 ? userList.map(user =>
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ) : 'No Results Found'
        }

      </table>

    </div>
  )
}

export default DataList