import MainHomePage from "./pages/MainLandingPage";
import MainBlockchainManagePage from "./pages/MainBlockchainManagePage";
import MainPaymentRecordsPage from "./pages/MainPaymentRecordsPage";
import MainMyInfoPage from "./pages/MainMyInfoPage";
import MainWalletViewPage from "./pages/MainWalletViewPage";
import MainEmptyPage from "./pages/MainEmptyPage";
import SignInFormPage from "./pages/SignInFormPage";
import SignUpFormPage from "./pages/SignUpFormPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
