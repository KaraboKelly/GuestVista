import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GuestHouses = () => {
  const [guesthouses, setGuesthouses] = useState([]);
  const [numGuesthouses, setNumGuesthouses] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://guestvista-4308f-default-rtdb.firebaseio.com/addGuesthouses.json")
      .then((res) => res.json())
      .then((data) => {
        const loadedGuesthouses = [];

        for (const key in data) {
          loadedGuesthouses.push({
            id: key,
            ...data[key],
          });
        }

        setGuesthouses(loadedGuesthouses);
        setNumGuesthouses(loadedGuesthouses.length);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredGuesthouses = guesthouses.filter((guesthouse) =>
    guesthouse.gName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const HouseItem = (props) => {
    return (
      <>
        <tr className="table-row" key={props.id}>
          <td className='table-data'>
            <div className='ghl--name-container'>
              <img className='table--logo' src='../icons/house.png' />
              <h3>{props.gName}</h3>
            </div>
          </td>
          <td>{props.location}</td>
          <div className='table--actions'>
            <img src="../icons/edit.svg" alt="edit" />
            <img src="../icons/message.svg" alt="message" />
            <img src="../icons/delete.svg" alt="delete" onClick={event => deleteHouse(props.id)} />
          </div>
        </tr>
      </>
    )
  }

  const deleteHouse = (id) => {
    fetch(`https://guestvista-4308f-default-rtdb.firebaseio.com/addGuesthouses/${id}.json`, {
      method: "DELETE",
    })
      .then(() => {
        setGuesthouses((prevGuesthouses) =>
          prevGuesthouses.filter((g) => g.id !== id)
        );
        setNumGuesthouses((prevNumGuesthouses) => prevNumGuesthouses - 1);
      })
      .catch((err) => console.log(err));
  }

  function createNew() {
    navigate('/admin/new-guesthouse')
  }


  return (
    <>
      <div className='admin--header'>
        <h1>Registered Guest Houses</h1>
      </div>

      <div>
        {/* summary data section */}
        <div className="guesthouses-count">
          <span>Total Guesthouses: </span>
          <input type="text" value={numGuesthouses} readOnly />
        </div>

        <div>
            <input
              type="text"
              placeholder="Search Guesthouses"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">Search</button>
          </div>

      </div>
      <div className='admin--container'>
        {/* Filters Section */}
        <div className='admin--filters'>
          <h3>Sort by</h3>
          <div className='admin--radios'>
            <div className='admin--radio'>
              <input type="radio" id="name" name='sort' />
              <label htmlfor="name">Name</label>
            </div>
            {/* <br /> */}

            <div className='admin--radio'>
              <input type="radio" id="price" name='sort' />
              <label htmlfor="price">Price</label>
            </div>
            {/* <br /> */}

            <div className='admin--radio'>
              <input type="radio" id="rating" name='sort' />
              <label htmlfor="rating">Rating</label>
            </div>
            {/* <br /> */}

            <div className='admin--radio'>
              <input type="radio" id="location" name='sort' />
              <label htmlfor="location">Location</label>
            </div>
            {/* <br /> */}
          </div>
        </div>

        {/* Table Section */}
        <div className='table--container'>

          <table className='table'>
            <thead className='table-head'>
              <td style={{ textIndent: "10px" }}>Name</td>
              <td>Location</td>
              <td style={{ textAlign: "center" }}>Actions</td>
            </thead>
            <tbody>
              {filteredGuesthouses.map((guesthouse) => (
                <HouseItem
                  id={guesthouse.id}
                  gName={guesthouse.gName}
                  location={guesthouse.location}
                />
              ))}
            </tbody>
          </table>

          <div className='ghl--new-button'>
            <button onClick={createNew} >New Entry</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default GuestHouses