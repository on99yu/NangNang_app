const mockProductData = [
    {
        "sellerPlatform": "Platform A",
        "productName": "Product X",
        "productPrice": 10000,
        "walletName": "Trust Wallet",
        "walletContractAddress": "0x123abc",
        "receiptNo": 12345,
        "sellerId": "SellerID001"
    },
    {
        "sellerPlatform": "Platform B",
        "productName": "Product Y",
        "productPrice": 10000,
        "walletName": "taehwanWallet",
        "walletContractAddress": "0x456def",
        "receiptNo": 23456,
        "sellerId": "SellerID002"
    },
    {
        "sellerPlatform": "Platform A",
        "productName": "Product Z",
        "productPrice": 5000,
        "walletName": "Trust Wallet",
        "walletContractAddress": "0x789ghi",
        "receiptNo": 34567,
        "sellerId": "SellerID003"
    },
    {
        "sellerPlatform": "Platform C",
        "productName": "Product X",
        "productPrice": 5000,
        "walletName": "taehwanWallet",
        "walletContractAddress": "0xabc123",
        "receiptNo": 45678,
        "sellerId": "SellerID004"
    },
    {
        "sellerPlatform": "Platform A",
        "productName": "Product Y",
        "productPrice": 15000,
        "walletName": "MetaMask",
        "walletContractAddress": "0xdef456",
        "receiptNo": 56789,
        "sellerId": "SellerID005"
    },
    {
        "sellerPlatform": "Platform B",
        "productName": "Product Z",
        "productPrice": 15000,
        "walletName": "MetaMask",
        "walletContractAddress": "0x123abc",
        "receiptNo": 67890,
        "sellerId": "SellerID006"
    },
    {
        "sellerPlatform": "Platform C",
        "productName": "Product X",
        "productPrice": 10000,
        "walletName": "Trust Wallet",
        "walletContractAddress": "0x456def",
        "receiptNo": 78901,
        "sellerId": "SellerID007"
    },
    {
        "sellerPlatform": "Platform A",
        "productName": "Product Y",
        "productPrice": 10000,
        "walletName": "Bitpay",
        "walletContractAddress": "0x789ghi",
        "receiptNo": 89012,
        "sellerId": "SellerID008"
    },
    {
        "sellerPlatform": "Platform B",
        "productName": "Product Z",
        "productPrice": 5000,
        "walletName": "Argent",
        "walletContractAddress": "0xabc123",
        "receiptNo": 90123,
        "sellerId": "SellerID009"
    },
    {
        "sellerPlatform": "Platform C",
        "productName": "Product X",
        "productPrice": 15000,
        "walletName": "Rainbow",
        "walletContractAddress": "0xdef456",
        "receiptNo": 12345,
        "sellerId": "SellerID010"
    }
];

const randomIndex = Math.floor(Math.random() * mockProductData.length);
const randomItem = mockProductData[randomIndex];

export { randomItem, mockProductData };