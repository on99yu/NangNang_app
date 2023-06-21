import MainHomePage from './pages/MainHomePage';
import MainWalletManagePage from './pages/MainWalletManagePage';
import MainNetworkManagePage from './pages/MainNetworkManagePage';
import MainBlockchainManagePage from './pages/MainBlockchainManagePage';
import MainPaymentRecordsPage from './pages/MainPaymentRecordsPage';
import MainMyInfoPage from './pages/MainMyInfoPage';
import MainWalletViewPage from './pages/MainWalletViewPage';
import MainEmptyPage from './pages/MainEmptyPage';
import SignInFormPage from './pages/SignInFormPage';
import SignUpFormPage from './pages/SignUpFormPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';

export default function App() {
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
        <UserProvider>
          <Routes>
            <Route path="/" element={<SignInFormPage />} />
            <Route path="/signup" element={<SignUpFormPage />} />
            <Route path="/main" element={<MainHomePage />} />
            <Route
              path="/WalletManage"
              element={<MainWalletManagePage walletImage={walletSourceList} />}
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
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}
