import React from 'react';

const UserContext = React.createContext({
  user: {
    consumer_or_not: undefined,
    email: '',
    id: '',
    phone_number: '',
    real_name: '',
    resident_registration_number: '',
  },
  updateUser: () => {},
});

export default UserContext;
