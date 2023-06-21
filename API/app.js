const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');

require('dotenv').config();// .env파일 사용

app.use(express.json());
app.use('/static', express.static(__dirname+'/public'));
//app.use(express.static('public')); //정적 파일 폴더 제공하기

// app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs'); // ejs 세팅
app.set('views', __dirname+'/views'); // view 폴더 세팅

app.engine('ejs', require('ejs').__express);

app.get('/qrpage',(req,res) =>{
  var data = {
    'id' : req.query.id,
    'price' : req.query.price
  };
    //db에 영수증 데이터 row 만들기
    res.render('qrpage',{'data': data});
});
app.get('/tokenBalanceTrans',async (req,res)=>{
  var data = req.body;
  var dollarBalance = await wonToDollar(req.body.wonBalance);
  var tokenBalance = await dollarToToken(dollarBalance,'USDC');
  
});
app.post('/checkTransaction', async (req,res)=>{
    const data =  await getTransaction(req.body.transactionHash,process.env.ETH_SCAN_APIKEY);
    if(data==1){
      res.send({"status":"NotOK"});
    }else if(data==0){
      res.send({"status":"OK"});
    }
});

app.post('/getBalance', async(req,res)=>{
    const data = req.body;
    var tokenBalance = await getBalance(data.tokenName,data.walletAddress);
    console.log("가격은",tokenBalance);
    res.send({"balance" : tokenBalance});
});

async function getTransaction(txhash,apiKey){
  const response = await axios.get(`https://api-goerli.etherscan.io/api?module=transaction&action=getstatus&txhash=${txhash}&apikey=${apiKey}`).catch(error => {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
    return response.data.result.isError;
}

async function getBalance(tokenName, walletAddress){
  var contractAddress, data, balanceData, tokenDemicalNum;
  if(tokenName==='ETH'){
    contractAddress = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';
    data = await axios.get(`https://api-goerli.etherscan.io/api?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${process.env.ETH_SCAN_APIKEY}`).catch(error => {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log(error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
    tokenDemicalNum = 10**18;
  }else{
    if(tokenName==='USDT'){
      contractAddress = '0xC2C527C0CACF457746Bd31B2a698Fe89de2b6d49';
    }else if(tokenName==='USDC'){
      contractAddress = '0x07865c6E87B9F70255377e024ace6630C1Eaa37F';
    }else if(tokenName==='UNI'){
      contractAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
    }else if(tokenName==='WETH'){
      contractAddress = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';
    }
    data = await axios.get(`https://api-goerli.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${walletAddress}&tag=latest&apikey=${process.env.ETH_SCAN_APIKEY}`).catch(error => {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log(error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log('Error', error.message);
      }
      console.log(error.config);
    }); 
    if(tokenName==='USDT'||tokenName==='USDC'){
      tokenDemicalNum=10**6;
    }else if(tokenName==='UNI'||tokenName==='WETH'){
      tokenDemicalNum=10**18;
    }
  }
  balanceData = data.data.result/tokenDemicalNum;
  return balanceData; 
}
app.listen(port,()=>{ 
    console.log(`서버가 실행됩니다. http://localhost:${port}`);
});

async function wonToDollar(wonBalance){
  data = await axios.get(`https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD`).catch(error => {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log(error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
var transData = wonBalance/data.data[0].basePrice;
return transData;
}

async function dollarToToken(dollarBalance,tokenName){
  var tokenIds='ethereum,tether,usd-coin,uniswap,weth';
  var tokenBalance;
  data = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenIds}&vs_currencies=usd`).catch(error => {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log(error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  if(tokenName==='ETH'){
    tokenBalance=data.data.ethereum.usd;
  }else if(tokenName==='USDT'){
    tokenBalance=data.data.tether.usd;
  }else if(tokenName==='USDC'){
    tokenBalance=data.data.usd-coin.usd;
  }
  console.log(tokenBalance);
}