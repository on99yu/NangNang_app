import { QRCodeSVG } from "qrcode.react";

const QrGenerator = (props) => {
  let time = new Date();
  // const data = {
  //   key: "NANGNANG",
  //   Name: "YOON",
  //   Price: "5000",
  //   Wallet: "metamask",
  //   Coin: "ETH",
  //   WalletKey: "0x2a535b423542c23a211cd3124a1121b33a",
  //   PaymentTime: time.toLocaleString(),
  // };

  // const dataString = JSON.stringify(data);
  const dataString2 = `NANGNANG,YOON,5000,metamask,ETH,0x2a535b423542c23a211cd3124a1121b33a,${time.toLocaleString()}`;

  return (
    <QRCodeSVG
      value={dataString2}
      size={128}
      bgColor={"#ffffff"}
      fgColor={"#000000"}
      level={"L"}
      includeMargin={false}
      // imageSettings={{
      //   src: "../images/Group 71.png",
      //   x: undefined,
      //   y: undefined,
      //   height: 34,
      //   width: 34,
      //   excavate: true,
      // }}
    />
  );
};

export default QrGenerator;
