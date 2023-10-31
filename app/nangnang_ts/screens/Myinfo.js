import React, {useContext} from  'react';
import { View,Text,StyleSheet,ScrollView } from 'react-native';
import { Link } from '@react-navigation/native';

import HeaderLogo from '../components/HeaderLogo';
import ScreenTitle from '../components/ScreenTitle';
import Colors from '../constants/colors';
import SubmitButton from '../components/Buttons/SubmitButton';
import ContentsBox from '../components/ContentsBox';
import { usePayinfo } from '../context/PayinfoContext';
import { AuthContext } from '../context/AuthContext';

const Myinfo = ({navigation}) => {
    
    const [payinfo] = usePayinfo();
    const [state] = useContext(AuthContext);

    return (
        <View style={styles.PayinfoView}>
            <View style={styles.header}>
                <Link to={{screen:'MyWallets'}}  style={styles.link}>뒤로 가기</Link>
                <HeaderLogo />
            </View>
            <View style={styles.title}>
                <ScreenTitle title="내 정보" />
            </View>
            <ScrollView style={styles.content}>
                <ContentsBox title="사용자 이름" contents={state.name}/>
                <ContentsBox title="사용자 ID" contents={state.uid}/>
                <ContentsBox title="이메일" contents={state.email}/>
            </ScrollView>
            <View style={styles.button}>
                <SubmitButton onPress={() => navigation.navigate('MyWallets')}>내 지갑으로</SubmitButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    PayinfoView: {
        flex: 1,
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    link:{
        color: Colors.orange500,
        fontSize:15,
        fontWeight:'bold',

        alignSelf:'flex-end', 
        padding: 30,
        marginVertical: 16,
    },
    title:{
        flex:0.3
    },
    content:{
        flex:1,
    },
    button:{
        flex:0.3,
        width:'70%',
        alignSelf:'center',
    }
})
export default Myinfo;
