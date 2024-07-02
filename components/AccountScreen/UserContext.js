import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userFName, setUserFName] = useState('Travelly');
  const [userLName, setUserLName] = useState('User');
  const [userPhoneNum, setUserPhoneNum] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userImage, setUserImage] = useState(null);

  return (
    <UserContext.Provider value={{ userFName, setUserFName,
                                   userLName, setUserLName,
                                   userPhoneNum, setUserPhoneNum,
                                   userEmail, setUserEmail,
                                   userImage, setUserImage }}>
      {children}
    </UserContext.Provider>
  );
};
