import React from 'react';

const UserCards = ({ user }) => {
    const { _id, firstName, lastName, about } = user;

  return (
    <div>
      <div className="card bg-purple-100 w-96 shadow-sm">
  <figure>
    <img 
      src="https://www.venmond.com/demo/vendroid/img/avatar/big.jpg"
      alt="Photo"  />
  </figure>
  <div className="card-body p-2">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    <p>{about}</p>
    <div className="card-actions justify-center">
        <button className="btn btn-outline btn-secondary">Ignore</button>
        <button className="btn btn-outline btn-success">Interested</button>
    </div>
  </div>
</div>
    </div>
  );
}

export default UserCards;
