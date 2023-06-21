import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BuyerWrap2 from './components/Buyer/BuyerWrap2';
import BuyerWrap1 from './components/Buyer/BuyerWrap1';
import EmptyPage from './components/EmptyPage';
import QrCode from './components/QrCode';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BuyerWrap2 />} />
        <Route path="/buyer" element={<BuyerWrap1 />} />
        <Route path="*" element={<EmptyPage />} />
        <Route path="/qrcode" element={<QrCode />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
