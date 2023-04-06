import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../global.css';
import './user.css';

function User() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state;


  const handleLogout = () => {
    // Perform logout logic here
    // ...

    // Redirect to login page
    navigate('/login');
  };

  const handleCreateNewStudyClick = () => {
    // Perform logout logic here
    // ...

    // Redirect to login page
    navigate(`/users/${user.username}/new_study`, { state: { user: user } });
  };

  return (
    <div className="user-page">
      <button className="user-page__logout-button" onClick={handleLogout}>
        Logout
      </button>
      <button className='user-page__new_study-button' onClick={handleCreateNewStudyClick}>Create new study</button>


      {user ? (
        <>
          <h1 className="user-page__title">Welcome, {user.username}!</h1>

          <ul className="user-page__list">
            <li className="user-page__list-item">
              <strong>ID:</strong> {user._id}
            </li>
            <li className="user-page__list-item">
              <strong>Email:</strong> {user.email}
            </li>
            <li className="user-page__list-item">
              <strong>First Name:</strong> {user.first_name}
            </li>
            <li className="user-page__list-item">
              <strong>Last Name:</strong> {user.last_name}
            </li>
            <li className="user-page__list-item">
              <strong>Role:</strong> {user.role}
            </li>
            <li className="user-page__list-item">
              <strong>Created:</strong> {Date(user.date_created)}
            </li>
            <li className="user-page__list-item">
              <strong>Updated:</strong> {Date(user.date_updated)}
            </li>
            <li className="user-page__list-item">
              <strong>Deleted:</strong> {user.is_deleted ? 'Yes' : 'No'}
            </li>
          </ul>
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
}

export default User;
