import React, { useState, useContext, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList,TouchableOpacity,Alert,Pressable} from 'react-native';
import { Link } from '@react-navigation/native';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';

import ScreenTitle from '../components/ScreenTitle';
import WalletInputModal from '../components/WalletInputModal';
import HeaderLogo from '../components/HeaderLogo';
import wallets from '../constants/wallets';
import Colors from '../constants/colors';
import SubmitButton from '../components/Buttons/SubmitButton';
import { usePayinfo } from '../context/PayinfoContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import WalletButton from '../components/Buttons/WalletButton';
const formatData = (data, numColumns) =>{

    const numberOfFullRows = Math.floor(data.length/numColumns)

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while(numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0){
        data.push({id: `blank-${numberOfElementsLastRow}`, empty: true})
        numberOfElementsLastRow = numberOfElementsLastRow + 1;
    }
    return data;
}

const SelectWallet = ({navigation}) => {

    const{ isOpen, open, close, provider, isConnected, address } = useWalletConnectModal()
    const projectId = '3e3f9e4ec7896dafb000678ff1af2442'
    const providerMetadata = {
    name: 'YOUR_PROJECT_NAME',
    description: 'YOUR_PROJECT_DESCRIPTION',
    url: 'https://your-project-website.com/',
    icons: ['https://your-project-logo.com/'],
    redirect: {
        native: 'YOUR_APP_SCHEME://',
        universal: 'YOUR_APP_UNIVERSAL_LINK.com'
    }
    }
    const ConnectData = () => {
        const expiry = provider?.session?.expiry
        console.log("expiry = ", expiry);
        const uri = provider?.uri
        console.log("uri = ", uri);
        const namespaces = provider?.namespaces
        console.log("namespaces = ", namespaces);
        // const session = provider?.session
        // console.log("\n\nsession = ", session);
      
        const peer = provider?.session?.peer
        console.log("peer = ", peer);
        const pairingTopic = provider?.session?.pairingTopic
        console.log("pairingTopic = ", pairingTopic);
        const topic = provider?.session?.topic
        console.log("topic = ", topic);
        const url = provider?.session?.peer.metadata.url
        console.log("url = ", url);
      
        // 이게 지갑 이름 알아내는 코드
        const name = provider?.session?.peer.metadata.name
        console.log("name = ", name);
      
      
      
      }
      
    const killSession =  () => {
        provider?.disconnect();
        if(isConnected){
          console.log("아직 세션 살아있음");
        }
      }
    const [payinfo] = usePayinfo();  
    const [state, dispatch] =useContext(AuthContext);
    const [modalIsVisible, setModalIsVisible] = useState(false); 
    const [selectedItem, setSelectedItem] = useState({});
    const [walletlist, setWalletList] = useState([]);

    useEffect(()=>{
        setWalletList(wallets);
        return ()=>{

        }
    },[])
    const CW =()=>{
        console.log("CW 함수 실행")
        if(payinfo.selectedWalletID === ""){
            Alert.alert("지갑선택", "결제에 사용할 지갑을 먼저 선택해주세요",[
                {
                    text:"확인",
                    onPress:()=>null,
                    style:"cancel"
                }
            ])
        }else{
            open()
        }
    }
    const CloseModalHandler = () => {
        setModalIsVisible(false);
    }

    const handleListItemPress = (item) => {
        setSelectedItem(item)
        setModalIsVisible(true)
    }   

    return (
        <View style={styles.MyWalletsView}>
            <View style={styles.header}>
                <Link to={{screen:'Main'}} style={styles.link}>메인으로가기</Link>
                <Text style={{color:'red'}}>사용자 : {state.name}</Text>
                <HeaderLogo />
            </View>
            <View style={styles.title}>
                <ScreenTitle title="지갑 선택" />
            </View>
            <View style={styles.submitbutton}>
                {isConnected ?
                    <View>
                        <Text style={{color:Colors.indigo400, fontWeight:'bold'}}>
                            연결된 지갑 : {provider?.session?.peer.metadata.name}
                        </Text>
                        <WalletButton 
                            onPress={()=>provider?.request({
                            method: 'eth_sendTransaction',
                            params: [{
                                data: "0x1111",
                                from: payinfo.mywalletaddress,
                                to: payinfo.walletaddress,
                            }]
                            })
                            } style={{backgroundColor: Colors.orange500}}>
                            <Text style={styles.text}>{"결제 하기"}</Text>
                        </WalletButton>
                        <WalletButton onPress={()=>ConnectData()} style={{marginTop:16}}>
                            <Text style={styles.text}>{'지갑 연결 데이터 확인'}</Text>
                        </WalletButton>
                        <WalletButton onPress={()=>killSession()} style={{marginTop:16}}>
                            <Text style={styles.text}>{'지갑 연결 세션 종료'}</Text>
                        </WalletButton>
                    </View>
                    : <SubmitButton 
                        onPress={()=>CW()} >{'지갑 연결하기'}</SubmitButton>
                   
                }
            </View>
            <View style={{alignSelf:'flex-end',paddingHorizontal:16}}>
                    <Pressable style={{        
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: Colors.orange500,
                        padding:5,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}onPress={() => navigation.navigate('Payinfo')}><Text style={{fontWeight:'bold', color: Colors.orange400}}>결제 정보 확인</Text></Pressable>
            </View>
            <View style={styles.WalletBlockView}>
                <FlatList
                    numColumns={2}
                    data={formatData(walletlist,2)}
                    renderItem={({item}) => {
                        if (item.empty === true){
                            return <View style={[styles.WalletBlock, styles.WalletBlockInvisible]}/>
                        }
                        return (
                            <View style={styles.WalletBlock}>
                                <View style={styles.iconwrapper}>
                                    <Image
                                        style={styles.image}
                                        source={item.imageURL} />
                                </View>
                                <Text style={styles.indigo500}>{item.wallet}</Text>
                                <TouchableOpacity 
                                    style={[styles.button,{backgroundColor: item.selected ? Colors.orange400 : null}]}
                                    onPress={()=>handleListItemPress(item)}>
                                        <Text style={[styles.indigo500,{ fontSize: 15, alignSelf: 'center' }]}>{item.selected ? '선택됨'  : '결제하기'}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                    keyExtractor={item => item.id}
                    alwaysBounceVertical={false}
                />
            </View>
            <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />

            <WalletInputModal
                    selecteditem={selectedItem}
                    visible={modalIsVisible}
                    oncancel={CloseModalHandler}
                    walletlist={walletlist}
                    setWalletList={setWalletList}/>
        </View>
    );
};

const styles = StyleSheet.create({
    MyWalletsView: {
        flex: 1,
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    title:{
        flex:1,
        // marginTop:,
    },
    WalletBlockView: {
        flex: 7,
        flexDirection: 'row',
        // justifyContent: 'space-around',
    },
    WalletBlockInvisible:{
        backgroundColor:"transparent"
    },
    WalletBlock: {
        flex:1,
        backgroundColor: '#fff',
        borderRadius: 10,

        width: '40%',
        alignItems: 'center',

        margin:10,
    },
    iconwrapper: {
        margin: '10%',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: Colors.backgroundwhite,

        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '70%',
        height: '70%',
        borderRadius: 30
    },
    button: {
        borderColor: Colors.indigo500,
        borderRadius: 20,
        borderWidth: 1,

        alignSelf: 'center',
        margin: '10%',
        marginBottom: '10%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        // width: '100%',
    },
    submitbutton:{
        width:'40%',alignSelf:'center',
        marginBottom:16,
    },
    text:{
        colors: Colors.indigo500,
    },
    link:{
        color: Colors.orange500,
        fontSize:15,
        fontWeight:'bold',
        // borderWidth:1,

        alignSelf:'flex-end', 
        padding: 30,
        marginVertical: 16,
    },
})
export default SelectWallet;