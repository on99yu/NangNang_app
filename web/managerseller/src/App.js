import Container1 from './routePages/Container1';
import Container2 from './routePages/Container2';
import Container3 from './routePages/Container3';
import Container4 from './routePages/Container4';
import Container5 from './routePages/Container5';
import Container6 from './routePages/Container6';
import Container7 from './routePages/Container7';
import Container8 from './routePages/Container8';
import SignInFormPage from './routePages/SignInFormPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<SignInFormPage />} />
          <Route path="/" element={<Container1 />} />
          <Route path="/WalletManage" element={<Container2 />} />
          <Route path="/NetworkManage" element={<Container3 />} />
          <Route path="/BlockchainManage" element={<Container4 />} />
          <Route path="/PaymentRecord" element={<Container5 />} />
          <Route path="/WalletView" element={<Container7 />} />
          <Route path="/MyInfo" element={<Container6 />} />
          <Route path="/*" element={<Container8 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
