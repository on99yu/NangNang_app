import React from 'react';
import {  Text,  StyleSheet, Pressable, ActivityIndicator,  } from 'react-native';

import Colors from '../../constants/colors';

const WalletButton = ({children, onPress, loading,style}) => {
    return (
    <Pressable
        style={({pressed})=>[ {backgroundColor: pressed ? Colors.orange300 : null },styles.button]}
        onPress={onPress}
        >
        {loading && <ActivityIndicator size="small" color={Colors.Incarnadine500}/>}
        <Text style={styles.text}>{children}</Text>
    </Pressable>
    );
};

const styles = StyleSheet.create({
    button:{
        borderRadius: 10,
        borderColor: Colors.orange500,
        borderWidth:2,

        width: '100%',
        height: 40,
        marginTop: 16,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontWeight:"bold",
        color: Colors.orange400,
        alignSelf:'center',
    }
})

export default WalletButton;