import React from 'react'
import { View,Text,StyleSheet} from 'react-native'
import SubmitButton from '../components/Buttons/SubmitButton';
function Paymentdetail({route, navigation}) {
    const {pid} = route.params; 
    const goback = ()=>{
        navigation.goBack()
    }
  return (
    <View>
        <Text style={{color:'black', fontSize:50,}}>
            {pid}
        </Text>
        <View style={styles.button}>
                <SubmitButton onPress={goback}>확인</SubmitButton>
        </View>
    </View>
    
  )
}
const styles = StyleSheet.create({
    
    button:{
        flex:0.3,
        width:'70%',
        alignSelf:'center',
        // alignItems:'center'
    }
})
export default Paymentdetail