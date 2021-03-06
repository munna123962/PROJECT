import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Alert,Dimensions,ScrollView } from 'react-native';
import firebaseApp from '../firebaseConfig';
import Firebase from 'firebase';

export default class Resetpassword extends Component {
    constructor() {
        super();
        this.state = {
            oldpassword: '', ewpassword: '', conpassword: ''
        };
    }
    input = ({ name, place, ontext, isPassword }) => {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ flex: 0.35 }}>
                    <Text style={{ fontSize: 20, color: 'black' }}>{name}
                    </Text>


                </View>
                <View style={{ flex: 0.65 }}>
                    <TextInput secureTextEntry={isPassword} style={{ borderColor: '#E8EBF0', borderWidth: 2, borderRadius: 5 }} placeholder={place} onChangeText={(text) => ontext(text)}>

                    </TextInput>

                </View>
            </View>

        )
    }
    reauthenticate=(oldpassword)=>{
        var user =firebaseApp.auth().currentUser
        var cred=firebaseApp.auth().EmailAuthProvider.credential(user.email,this.state.oldpassword)
        return user.reauthenticateWithCredential(cred);
       

    }
   
    onChangePassword=(oldPass,newPass)=>{
        let _user = firebaseApp.auth().currentUser.uid;
        let user=firebaseApp.auth().currentUser
        console.log('------------------------------------onchangepass'+oldPass+'---'+newPass+'---'+user.email)
      
        if(_user !='' && _user !=null )
        {
            let credentials= Firebase.auth.EmailAuthProvider.credential(user.email,oldPass);
            console.log(credentials)
            user.reauthenticateWithCredential(credentials).then(()=>{
              user.updatePassword(newPass).then(()=> {
                
                Alert.alert('Success','Password changed successfully',[{text:'Okay'}])
                }).catch((error)=> {
                  
                  Alert.alert('Failed','Failed to change the password',[{text:'Okay'}])
                  });
              })
            .catch(()=>{
              
              Alert.alert('Failed','Existing password is incorrect',[{text:'Okay'}])
              })
        }
      }
    oncpsubmitpress = (oldpassword,ewpassword) => {
        if (this.state.oldpassword.length > 2 && this.state.ewpassword.length > 2) {
        console.log('enter press')
         this.reauthenticate(this.state.oldpassword).then(()=>{
            console.log('enter auth')
            firebaseApp.auth().currentUser.updatePassword(this.state.ewpassword)
            .then((response) => {
                console.log('updated successfully')
                Alert.alert('updated successfull')
            })
            .catch((error) => {
                Alert.alert('failure', error.message)
                console.log('failure', error.message)
            })

         }).catch((eroor)=>{
            Alert.alert('failure', error.message)
         })





          /*  firebaseApp.auth().EmailAuthProvider.credential(
                "manideep.s.2021@gmail.com",
                "123456"
            )
            firebaseApp.auth().currentUser.reauthenticateWithCredential(firebaseApp.auth.credential).then(function () {
                console.log('----------------------------reauth success')*/
               /*  firebaseApp.auth().currentUser.updatePassword(this.state.ewpassword)
                    .then((response) => {
                        console.log('updated successfully')
                        Alert.alert('updated successfull')
                    })
                    .catch((error) => {
                        Alert.alert('failure', error.message)
                        console.log('failure', error.message)
                    })
          /*  }).catch(function (error) {
                // An error happened.
                console.log('++++++++++++++++++reauth failed',error.message)
            });*/


        } else {
            Alert.alert('Invalid details')
        }
    }
    getScreenMaxHeight=()=>{
        const h=Dimensions.get('window').height
        const w=Dimensions.get('window').width
        if(h>w){
            return h
        }else{
            return w
        }
    }
    ConvertFlexToFixed=(flexvalue)=>{
        const screenHeight=this.getScreenMaxHeight();
        const fixed=screenHeight*flexvalue
        return fixed

    }



    render() {
        return (
<ScrollView>
            <View style={{width:'100%',height:this.ConvertFlexToFixed(1)}}>
                <View style={styles.headcontainer}>
                    <Text style={{ fontSize: 30, color: 'black' }}>Reset Password
                        </Text>

                </View>
                <View style={styles.ips}>
                    <View style={styles.internalips}>

                        <View style={{ flex: 0.25 }}>
                            <this.input isPassword={true} name={'Old Password'} place={'Enter Old Password here'} ontext={(text) => { this.setState({ oldpassword: text }) }} />
                        </View>
                        <View style={{ flex: 0.25 }}>

                            <this.input isPassword={true} name={'NewPassword'} place={'Enter NewPassword  here'} ontext={(text) => { this.setState({ ewpassword: text }) }} />
                        </View>

<View style={{flex:0.15}}>

                        <TouchableOpacity style={styles.submitbutton} onPress={() => { this.onChangePassword(this.state.oldpassword,this.state.ewpassword) }}>
                            <Text style={{ fontSize: 20, color: 'black' }}>Submit</Text>
                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.goBack() }}>
                            <Text style={{ fontSize: 15, color: 'black' }}>Go Back</Text>
                        </TouchableOpacity>
                    </View>


                </View>



            </View>
            </ScrollView>




        )
    }
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },

    headcontainer: { flex: 0.25, backgroundColor: '#9746ab', justifyContent: 'center', alignItems: 'center', borderBottomColor: 'gray', borderBottomWidth: 2 },
    ips: { flex: 0.75 },
    internalips: { flex: 1, margin: 20 },
    forrem: { flex: 0.15 },
    submitbutton: { flex: 1, backgroundColor: '#9651b5', justifyContent: 'center', alignItems: 'center', marginTop:10,marginBottom:10, borderRadius: 10 }

}

)