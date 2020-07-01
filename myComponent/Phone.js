import React,{Component} from 'react';
import {View,StyleSheet,Text,TextInput,Image,TouchbleOpacity, ImageBackground, Button,Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebaseApp from '../firebaseConfig'

export default class Phone extends Component{

    constructor(){
        super();
        this.state={number:'',otp:'',confirmresult:null

        };
    }
    validatePhoneNumber = () => {
        const rx= /^\d{10}$/
        return rx.test(this.state.number)
      }
    getOtp=()=>{
       
            const phoneNumber = '+91'+this.state.number
            firebaseApp.auth().signInWithPhoneNumber(phoneNumber)
              .then((confirmResult )=> {
                this.setState({ confirmresult:confirmResult })
              })
              .catch((error) => {
               Alert.alert(error.message)
        
                console.log(error)
              })
        
            }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'orange'}}>
                <ImageBackground source={require('../images/bg.jpg')} 
                style={{flex:1}} resizeMode={'cover'} >
                    <View style={{flex:0.3,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:40,color:'gold',fontWeight:'bold'}}>Login
                        </Text>
                       

                    </View>
                    <View style={{flex:0.7}}>
                        <View style={{flex:1,margin:20}}>
                            <View style={{flex:0.2,justifyContent:'center'}}>
                                <TextInput  placeholderTextColor={'gold'} placeholder={'Enter Number'} style={{backgroundColor:'white',borderRadius:5,borderColor:'gray',borderWidth:2
                             }}  onChangeText={(text)=>{this.setState({number:text})}}>

                             </TextInput>

                                


                            </View>
                            <View style={{flex:0.2,justifyContent:'center'}}>
                            <TextInput placeholderTextColor={'gold'} placeholder={'Enter OTP'} style={{backgroundColor:'white',borderRadius:5,borderColor:'gray',borderWidth:2
                             }}  onChangeText={(text)=>{this.setState({otp:text})}}>

                             </TextInput>
                                
                                </View>
                                <View style={{flex:0.2,justifyContent:'center'}}>
                                    
                                            <Button title="Get OTP" color="gray" onPress={()=>{this.getOtp()}}/>
                                                
                                            

                                    <View/>
                                
                                </View>
                                <View style={{flex:0.2,justifyContent:'center'}}>
                                <Button title="Login" color="gray" onPress={()=>{this.loginPress()}}/>   
                                
                                </View>
                                <View style={{flex:0.2}}>
                                
                                </View>

                        </View>
                            
                            </View>




                </ImageBackground>

            </View>
    
        )
    }
}


