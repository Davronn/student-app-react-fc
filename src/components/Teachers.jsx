import React from 'react'
import Profile from './ProfileLinkTo'

function Teachers() {
  return (
    <div className='container'>
      <div className="d-flex justify-content-between align-items-center p-2" >
        <h2 className="my-3">Teachers app</h2>
        <div className="">
          <Profile />
        </div>
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by First Name , Last Name and Group"
        />
      </div>
    </div>
  )
}

export default Teachers