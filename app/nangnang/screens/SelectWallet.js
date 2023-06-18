import React, { useState, useContext, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList,TouchableOpacity,Modal} from 'react-native';
import { Link } from '@react-navigation/native';


import ScreenTitle from '../components/ScreenTitle';
import WalletInputModal from '../components/WalletInputModal';
import HeaderLogo from '../components/HeaderLogo';
import wallets from '../constants/wallets';
import Colors from '../constants/colors';
import SubmitButton from '../components/Buttons/SubmitButton';
import {WC_connector} from '../api/WC_connector';
import { usePayinfo } from '../context/PayinfoContext';
import { AuthContext } from '../context/AuthContext';

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
    // WC_connector(WalletConnect_connector) 에서 사용할 함수들을 가져옴
    const {
        connectWallet,
        killSession,
        sendTx,
        connector,
        shortenAddress,
      } = WC_connector();

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
                <Text style={{color:'red'}}>사용자 : {state.email}</Text>
                <HeaderLogo />
            </View>
            <View style={styles.title}>
                <ScreenTitle title="지갑 선택" />
            </View>
            {!connector.connected && (
                <View style={{flex:1, width:'50%',alignSelf:'center'}}>
                    <SubmitButton onPress={connectWallet}>지갑 연결</SubmitButton>
                </View>
            )}
            {/* 지갑이 연결되어있다면 아래 버튼들을 출력 */}
            {connector.connected && (
                <>
                <Text style={{color : Colors.indigo500,alignSelf:'center'}}> 지갑주소: {shortenAddress(connector.accounts[0])}</Text>
                <View style={{flex:1, width:'50%',alignSelf:'center'}}>
                    <SubmitButton onPress={killSession}>세션 종료</SubmitButton>
                </View>
                <View style={{flex:1, width:'50%',alignSelf:'center'}}>
                    {/* sendTx(toAccount: string, valueAmount: string) 인데 지금은 toAccount에 연결된 자기자신 지갑주소 넣은거고 valueAmount 값은 위에 만들었고(0x0으로) */}
                    <SubmitButton onPress={() => {
                        console.log("from SelectWallet 돈을 보낼 지갑주소", payinfo.walletaddress)
                        console.log("from SelectWallet 보낼 돈", payinfo.exchangedvalue)
                        sendTx(connector.accounts[0], "0xBBB")
                    }}>거래 전송</SubmitButton>
                </View>
                </>
            )}
            
            <View style={{flex:1, width:'50%',alignSelf:'center'}}>
                    <SubmitButton onPress={() => navigation.navigate('Payinfo')}>결제 정보 확인</SubmitButton>
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
                                    style={[styles.button,{backgroundColor: item.selected ? '#FF8691' : null}]}
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