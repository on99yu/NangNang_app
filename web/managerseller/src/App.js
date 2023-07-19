import MainHomePage from './pages/MainLandingPage';
import MainBlockchainManagePage from './pages/MainBlockchainManagePage';
import MainPaymentRecordsPage from './pages/MainPaymentRecordsPage';
import MainMyInfoPage from './pages/MainMyInfoPage';
import MainWalletViewPage from './pages/MainWalletViewPage';
import MainEmptyPage from './pages/MainEmptyPage';
import SignInFormPage from './pages/SignInFormPage';
import SignUpFormPage from './pages/SignUpFormPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from './contexts/user-context';
import React, { useState } from 'react';

export default function App() {
  const [user, setUser] = useState({
    consumer_or_not: undefined,
    email: '',
    id: '',
    phone_number: '',
    real_name: '',
    resident_registration_number: '',
  });
  const [count, setCount] = useState('');

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ user, updateUser, count, setCount }}>
          <Routes>
            <Route path="/" element={<SignInFormPage />} />
            <Route path="/signup" element={<SignUpFormPage />} />
            <Route path="/main" element={<MainHomePage />} />

            <Route
              path="/BlockchainManage"
              element={<MainBlockchainManagePage />}
            />
            <Route path="/PaymentRecord" element={<MainPaymentRecordsPage />} />
            <Route path="/WalletView" element={<MainWalletViewPage />} />
            <Route path="/MyInfo" element={<MainMyInfoPage />} />
            <Route path="*" element={<MainEmptyPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}
