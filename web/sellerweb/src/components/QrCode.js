import { useState, useEffect } from 'react';
import { randomItem } from '../mocks/mockData';

const QrCode = () => {
  const [qrCodeData, setQRCodeData] = useState('');

  console.log(randomItem);

  useEffect(() => {
    const fetchQRCodeData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/qrpage?sellerFlatform=${randomItem.sellerPlatform}&productName=${randomItem.productName}&productPrice=${randomItem.productPrice}&walletName=${randomItem.walletName}&walletContractAddress=${randomItem.walletContractAddress}&recieptNo=${randomItem.receiptNo}&sellerId=${randomItem.sellerId}`
        ); // QR 코드 데이터를 가져올 API의 URL을 입력해야 합니다.
        const data = await response.json();
        setQRCodeData(data.qrCode); // API에서 받아온 데이터 중 QR 코드 값을 상태에 저장합니다.
        console.log(qrCodeData);
      } catch (error) {
        console.error('Error fetching QR code data:', error);
      }
    };

    fetchQRCodeData();
  }, [qrCodeData]);

  return (
    <div>
      <div>this is qrcode</div>
    </div>
  );
};

export default QrCode;
