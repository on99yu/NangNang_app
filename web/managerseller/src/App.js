import MainHomePage from './pages/MainHomePage';
import MainWalletManagePage from './pages/MainWalletManagePage';
import MainNetworkManagePage from './pages/MainNetworkManagePage';
import MainBlockchainManagePage from './pages/MainBlockchainManagePage';
import MainPaymentRecordsPage from './pages/MainPaymentRecordsPage';
import MainMyInfoPage from './pages/MainMyInfoPage';
import MainWalletViewPage from './pages/MainWalletViewPage';
import MainEmptyPage from './pages/MainEmptyPage';
import SignInFormPage from './pages/SignInFormPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<SignInFormPage />} />
          <Route path="/" element={<MainHomePage />} />
          <Route path="/WalletManage" element={<MainWalletManagePage />} />
          <Route path="/NetworkManage" element={<MainNetworkManagePage />} />
          <Route
            path="/BlockchainManage"
            element={<MainBlockchainManagePage />}
          />
          <Route path="/PaymentRecord" element={<MainPaymentRecordsPage />} />
          <Route path="/WalletView" element={<MainWalletViewPage />} />
          <Route path="/MyInfo" element={<MainMyInfoPage />} />
          <Route path="*" element={<MainEmptyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
