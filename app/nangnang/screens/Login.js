import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Link } from '@react-navigation/native';
import axios from 'axios';

import Colors from '../constants/colors';
import HeaderLogo from '../components/HeaderLogo';
import InputText from '../components/InputText';
import ScreenTitle from '../components/ScreenTitle';
import SubmitButton from '../components/Buttons/SubmitButton';
import GoogleButton from '../components/Buttons/GoogleButton';
import { useAuth } from '../constants/AuthContext';

// web : 185496097106-sp0mrog1pvfhkg0kijstue30hf0ugtf6.apps.googleusercontent.com
// IOS : 185496097106-9losums1qg0iljj25kgt1krhcsp4h5eg.apps.googleusercontent.com
// Android : 185496097106-35agk1e07b0h6t2egjm0sdh88odo1u5k.apps.googleusercontent.com

const Login = ({ navigation }) => {
    const [isLoading, setIsloading] =useState(false);
    const [loginInput, setLoginInput] = useState({
        email:"dgjjanggu@gmail.com",
        password:"dg990912@@",
    });

    const [_, setUser] = useAuth();

    const LoginInputHandler = (key, value) => {
        setLoginInput(prevState => ({
            ...prevState,
            [key]: value,
        }));
    }
    const LoginHandler = () => {
        axios({
            method:"POST",
            url:"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
            params:{
                key:'AIzaSyDYSJighl4OVsw3HPsTul-DRREMKyu0EOI',
            },
            data:{
                email:loginInput.email,
                password:loginInput.password,
            }
        }).then((res)=>{
            setUser(res.data);
            console.log(res.data);
        }).catch((e)=>{
            console.log(e.message);
        }).finally(()=>{
            setIsloading(false);
        })

    }

    return (
        <View style={styles.LoginView}>
            <HeaderLogo />
            <View style={styles.title}>
                <ScreenTitle title="낭낭" content="암호화폐 지갑 통합 결제 플랫폼" />
            </View>
            <View style={styles.inputtext}>
                <InputText
                    name="이메일"
                    placeholder="이메일"
                    value={loginInput.email}
                    onChangeText={text => {
                        LoginInputHandler('email', text)
                    }} />
                <InputText 
                    name="비밀번호" 
                    placeholder="비밀번호" 
                    secureTextEntry={true}
                    value={loginInput.password}
                    onChangeText={text => {
                        LoginInputHandler('password', text)
                    }} />
                <View style={styles.Findpassword}>
                    <Text>비밀번호를 잊어버리셨나요?</Text>
                </View>
            </View>
            <View style={styles.ButtonView}>
                <SubmitButton onPress={LoginHandler}>로그인</SubmitButton>
                <GoogleButton>구글로 로그인</GoogleButton>
                <View style={styles.GotoRegister}>
                    <Text>계정이 없으신가요?</Text>
                    <Link to={{screen:'Register'}} style={styles.link}>회원가입</Link>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    LoginView: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    title:{
        flex:1,
    },  
    inputtext:{
        flex:1,
    },
    Findpassword: {
        marginHorizontal: 20,
        marginTop: '5%',
        // marginBottom:'10%',
        width: '70%',

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'flex-end'
    },
    ButtonView: {
        flex:2,
        // paddinng:10,
        // marginTop: 10,
        width: '70%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    GotoRegister: {
        marginTop: 20,
        width: '70%',

        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'flex-end',
    },
    link:{
        color: Colors.orange500,
    },
});
export default Login;