import MainHomePage from './pages/MainHomePage';
import MainWalletManagePage from './pages/MainWalletManagePage';
import MainNetworkManagePage from './pages/MainNetworkManagePage';
import MainBlockchainManagePage from './pages/MainBlockchainManagePage';
import MainPaymentRecordsPage from './pages/MainPaymentRecordsPage';
import MainMyInfoPage from './pages/MainMyInfoPage';
import MainWalletViewPage from './pages/MainWalletViewPage';
import MainEmptyPage from './pages/MainEmptyPage';
import SignInFormPage from './pages/SignInFormPage';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken') || ''
  );

  const handleSetAccessToken = (newToken) => {
    setAccessToken(newToken);
    localStorage.setItem('accessToken', newToken);
  };

  const isValidToken = (curAccessToken) => {
    console.log('accessToken:', accessToken);
    console.log('curAccessToken:', curAccessToken);

    if (accessToken === curAccessToken) {
      alert('유효한 접근입니다.');
      console.log(accessToken, curAccessToken);
    } else {
      alert('유효하지 않은 접근입니다.', accessToken);
      window.location.href = '/login';
    }
  };

  const walletSourceList = [
    {
      id: 0,
      name: 'RAINBOW',
      imgUrl: require('./asset/images/Rainbow.png'),
    },
    {
      id: 1,
      name: 'METAMASK',
      imgUrl: require('./asset/images/MetaMask.png'),
    },
    {
      id: 2,
      name: 'TRUSTWALLET',
      imgUrl: require('./asset/images/TrustWallet.png'),
    },
    {
      id: 3,
      name: 'CRYPTO.COM',
      imgUrl: require('./asset/images/CryptoDotCom.png'),
    },
    {
      id: 4,
      name: 'PILLER',
      imgUrl: require('./asset/images/PillerWallet.png'),
    },
    {
      id: 5,
      name: 'MATH',
      imgUrl: require('./asset/images/MathWallet.png'),
    },
    {
      id: 6,
      name: 'ARGENT',
      imgUrl: require('./asset/images/ArgentWallet.png'),
    },
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="login"
            element={
              <SignInFormPage handleSetAccessToken={handleSetAccessToken} />
            }
          />
          <Route
            path="/"
            element={<MainHomePage isValidLogin={isValidToken} />}
          />
          <Route
            path="/WalletManage"
            element={<MainWalletManagePage alletImage={walletSourceList} />}
          />
          <Route path="/NetworkManage" element={<MainNetworkManagePage />} />
          <Route
            path="/BlockchainManage"
            element={<MainBlockchainManagePage />}
          />
          <Route path="/PaymentRecord" element={<MainPaymentRecordsPage />} />
          <Route
            path="/WalletView"
            element={<MainWalletViewPage walletImage={walletSourceList} />}
          />
          <Route path="/MyInfo" element={<MainMyInfoPage />} />
          <Route path="*" element={<MainEmptyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
