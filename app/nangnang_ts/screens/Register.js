import React, { useState} from 'react';
import { Text, View, StyleSheet,ActivityIndicator,Alert } from 'react-native';
import { Link } from '@react-navigation/native';
import axios from 'axios';

import Colors from '../constants/colors';
import HeaderLogo from '../components/HeaderLogo';
import InputText from '../components/InputText';
import ScreenTitle from '../components/ScreenTitle';
import SubmitButton from '../components/Buttons/SubmitButton';
const Register = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] =useState("");
    const [registerInput, setRegisterInput] = useState({
        id:"test",
        password: "test123",
        email: "test@gmail.com",
        name: "최동규",
    });

    const RegisterInputHandler = (key, value) => {
        setRegisterInput(prevState => ({
            ...prevState,
            [key]: value,
        }));
    }
    const RegisterHandler = async () =>{
        setIsLoading(true)
        try {
            const res = await axios({
                method:'POST',
                url:"https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/user/",
                data:{
                    id:registerInput.id,
                    password:registerInput.password,
                    email:registerInput.email,
                    name:registerInput.name,
                    consumer_or_not:1,
                    real_name:"",
                    phone_number:"",
                    resident_registration_number:"",
                }
            })
            console.log(JSON.stringify(res,null,2))
            Alert.alert("회원가입", "회원가입이 완료되었습니다.",[
                {
                    text:"확인",
                    onPress:()=>null,
                    style:"cancel"
                }
            ])
        }catch(e){
            console.log(e.message)
        }
        setIsLoading(false)
        navigation.navigate("Login")
    }
    return (
        <View style={styles.RegisterView}>
            <HeaderLogo />
            <View style={styles.title}>
                <ScreenTitle title="회원가입" content="암호화폐 지갑 통합 결제 플랫폼" />
            </View>
            <View style={styles.inputtext}>
                <InputText
                        name="아이디"
                        placeholder="아이디"
                        onChangeText={text => {
                            RegisterInputHandler('id', text)
                        }} />
                <InputText
                    name="비밀번호"
                    placeholder="******"
                    secureTextEntry={true}
                    onChangeText={text => {
                        RegisterInputHandler('password', text)
                    }} />
                <InputText
                    name="이메일"
                    placeholder="이메일"
                    onChangeText={text => {
                        RegisterInputHandler('email', text)
                    }} />
                <InputText
                    name="이름"
                    placeholder="홍길동"
                    onChangeText={text => {
                        RegisterInputHandler('name', text)
                    }} />
            </View>
            <View style={styles.ButtonView}>
                <SubmitButton onPress={RegisterHandler}>{isLoading ? <ActivityIndicator/> : "회원가입"}</SubmitButton>
                <View style={styles.GotoLogin}>
                    <Text>계정이 이미 있나요?</Text>
                    <Link to={{ screen: 'Login' }} style={styles.link}>로그인</Link>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    RegisterView: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    title: {
        flex: 1,
    },
    inputtext: {
        flex: 3,
    },
    ButtonView: {
        flex: 2,
        width: '70%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    GotoLogin: {
        marginTop: 10,
        width: '70%',

        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'flex-end',
    },
    link: {
        color: Colors.orange500,
    }

});
export default Register;