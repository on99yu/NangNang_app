import React, { createContext, useState } from 'react';

// 초기 상태값 설정
const initialUserState = {
  email: '',
  id: '',
  phone_number: '',
  real_name: '',
  resident_registration_number: '',
  // ... 다른 사용자 정보 필드들
};

// Context 생성
export const UserContext = createContext();

// Context Provider 생성
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserState);

  // 사용자 정보 업데이트 함수
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
