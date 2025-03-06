import React from 'react';
import { useAuth } from '../context/AuthContext';

const UserPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>User Profile</h1>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>Blood Type: {user.bloodType}</p>
        </div>
      )}
    </div>
  );
};

export default UserPage; 