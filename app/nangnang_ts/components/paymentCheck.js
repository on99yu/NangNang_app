import React from 'react'

export default paymentCheck

const paymentCheck = async (transactionhash)=>{
    try{
      const receiptid = await axios({
        method:"POST",
        url:"https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/paymentprocess/startsetting",

      })
      console.log("영수증 번호 생성 - ",JSON.stringify(receiptid.data,null, 2))
      const receiptid_num = receiptid.data.data
    //   const res = await EtherScanAPI.get(`?module=transaction&action=gettxreceiptstatus&txhash=${transactionhash}&apikey=CDFTCSDIJ4HNYU41CJYRP2I3SSCNJ7PGYD`)
    //   console.log('paymentCheck - 거래 결과 ', res.data.status)
    //   console.log('transactionhash 값 ',transactionhash )
    //   const status = res.data.status
      const status = 1
      if(status === "1" || status === 1){
        const walletname =  await state.wallet.find(e => e.selected)
        console.log("결제정보 저장 시에 walletname 확인", walletname)
        console.log(walletname.walletname)
        try{
            const savepayment = await axios({
                method:"POST",
                url:"https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/paymentprocess/storepaymentdata",
                data:{
                    priceAddressInfo_object : {
                        payment_receipt_idx : receiptid_num,
                        seller_id : payinfo.sellerid,
                        consumer_id : state.uid,
                        sender_wallet_address : connector.accounts[0],
                        receiver_wallet_address : payinfo.walletaddress,
                        total_won_price : payinfo.price,
                        total_coin_price : payinfo.exchangedvalue
                    },
                  products: [
                    {
                      product_name: payinfo.product,
                      product_won_price_per: payinfo.price,
                      quantity: 1
                    },
                  ],
                  networkInfo_obejct : {
                    payment_receipt_idx : receiptid_num,
                    main_blockchain_name : "Ethereum",
                    detailed_network_name : "Ethereum Mainnet",
                    detailed_network_real_id_num : 1,
                    payment_wallet_name : walletname.walletname,
                  }
                }
            })
            console.log("paymentcheck 결과", JSON.stringify(savepayment.data,null, 2))
        }catch(e){
            console.log(e)
        }
        navigation.navigate('PayResult')
        //결제 완료 API 저장되어야함
        console.log("결제 완료")
      }else{
        console.log("결제에 오류가 발생했습니다.")
      }
    }catch(e){
      console.log(e)
    }
  } 