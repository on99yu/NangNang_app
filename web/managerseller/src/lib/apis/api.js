// api.js 파일

// 가상의 지갑 데이터
const walletData = {
    id: 1,
    balance: 1000,
    currency: 'USD',
};

// 가상의 API 호출 함수
export const getWalletData = async () => {
    // 가상의 API 호출을 시뮬레이션하기 위해 간단한 딜레이를 추가합니다.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // API 호출 결과를 반환합니다.
    return walletData;
};
