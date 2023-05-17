import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList,TouchableOpacity,Modal} from 'react-native';
import { Link } from '@react-navigation/native';


import ScreenTitle from '../components/ScreenTitle';
import WalletInputModal from '../components/WalletInputModal';
import HeaderLogo from '../components/HeaderLogo';
import wallets from '../constants/wallets';
import { useAuth } from '../constants/AuthContext';
import Colors from '../constants/colors';
import SubmitButton from '../components/Buttons/SubmitButton';
import {WC_connector} from '../API/WC_connector';

const formatData = (data, numColumns) =>{

    const numberOfFullRows = Math.floor(data.length/numColumns)

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while(numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0){
        data.push({id: `blank-${numberOfElementsLastRow}`, empty: true})
        numberOfElementsLastRow = numberOfElementsLastRow + 1;
    }
    return data;
}


const MyWallets = ({navigation}) => {
    // WC_connector(WalletConnect_connector) 에서 사용할 함수들을 가져옴
    const {
        connectWallet,
        killSession,
        sendTx,
        connector,
        shortenAddress,
      } = WC_connector();

    const [user] = useAuth();
    const [modalIsVisible, setModalIsVisible] = useState(false); 
    const [selectedItem, setSelectedItem] = useState({});

    const CloseModalHandler = () => {
        setModalIsVisible(false);
    }
    const handleListItemPress = (item) => {
        setSelectedItem(item)
        setModalIsVisible(true)
    }
    const temp = () => {   
        console.log("temp clicked");
    }

    // sendTx 함수에서 사용하는 값인데 이건 나중에 값 받아와서 넣어야함
    // 지금은 그냥 temp 값으로 0x0을 넣어놓음
    const valueAmount = '0x0';

    return (
        <View style={styles.MyWalletsView}>
            <View style={styles.header}>
                <Link to={{screen:'Main'}} style={styles.link}>메인으로가기</Link>
                <Text style={{color:'red'}}>사용자 : {user.email.slice(0,9)}</Text>
                <HeaderLogo />
            </View>
            <View style={styles.title}>
                <ScreenTitle title="지갑 선택" />
            </View>
            {/* 지갑 연결이 안되어있다면 아래 버튼을 출력 */}
            {!connector.connected && (
                <View style={{flex:1, width:'50%',alignSelf:'center'}}>
                    <SubmitButton onPress={connectWallet}>지갑 연결</SubmitButton>
                </View>
            )}
            {/* 지갑이 연결되어있다면 아래 버튼들을 출력 */}
            {connector.connected && (
                <>
                <Text>address : {shortenAddress(connector.accounts[0])}</Text>
                <View style={{flex:1, width:'50%',alignSelf:'center'}}>
                    <SubmitButton onPress={killSession}>세션 종료</SubmitButton>
                </View>
                <View style={{flex:1, width:'50%',alignSelf:'center'}}>
                    {/* sendTx(toAccount: string, valueAmount: string) 인데 지금은 toAccount에 연결된 자기자신 지갑주소 넣은거고 valueAmount 값은 위에 만들었고(0x0으로) */}
                    <SubmitButton onPress={() => sendTx(connector.accounts[0], valueAmount)}>거래 전송</SubmitButton>
                </View>
                </>
            )}
            
            <View style={{flex:1, width:'50%',alignSelf:'center'}}>
                    <SubmitButton onPress={() => navigation.navigate('Payinfo')}>결제 정보 확인</SubmitButton>
            </View>
            <View style={styles.WalletBlockView}>
                <FlatList
                    numColumns={2}
                    data={formatData(wallets,2)}
                    renderItem={({ item}) => {
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
                                    style={styles.button}
                                    onPress={()=>handleListItemPress(item)}>
                                    <Text style={[styles.indigo500,{ fontSize: 10, alignSelf: 'center' }]}>지갑 주소 입력</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                    keyExtractor={item => item.id}
                    alwaysBounceVertical={false}
                />
                <WalletInputModal
                    title={selectedItem.wallet}
                    visible={modalIsVisible} 
                    oncancel={CloseModalHandler}/>
            </View>
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
export default MyWallets;