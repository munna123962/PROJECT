import React,{Component} from 'react';
import {View,StyleSheet,Text,TextInput,Image,TouchableOpacity,Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import firebaseApp from '../firebaseConfig'
export default class Account extends Component{
    constructor(){
        super();
        this.state={privacy:''

        }
    }
   /* onSavePress=()=>{
        const id = firebaseApp.auth().currentUser.uid
       
        let path1 = ''
        if (!this.state.privacy.includes('Public')) {

            
            path1 = 'ProfilePrivacyUsers/ListOfProfilePrivacyUsers/Private/' + id + '/Userdetails/'
        } else {
      
            path1 = 'ProfilePrivacyUsers/ListOfProfilePrivacyUsers/Public/' + id + '/Userdetails/'
        }
        const data = {

            privacy: this.state.privacy
        }
       
        firebaseApp.database().ref(path1).update(data)
            .then((res) => {
                Alert.alert('Successfully Saved.....')

            })
          
            .catch((error) => {

                Alert.alert('Failed.....')
                console.log('Failed........', error.message)
             
            })
    }*/
    render(){
        return(
            <View style={{flex:1,backgroundColor:'red'}}>
              <View style={{flex:0.1,backgroundColor:'white',justifyContent:'center'}}>
                <Picker  style={{flex:0.5,backgroundColor:'skyblue',marginRight:20,marginLeft:20}} selectedValue={this.state.privacy} 
                onValueChange={(text,itemIndex)=>{this.setState({privacy:text})}}>
                <Picker.Item label="Public" value="Public"/>
                <Picker.Item label="Private" value="Private"/>
                  </Picker> 

                

              </View>
              <View style={{flex:0.1}}>
              
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('Viewprofile') }} style={{ flex: 1, backgroundColor: '#9651b5', margin: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{ fontSize: 20, color: 'black' }}>Save</Text>
                            </TouchableOpacity> 

              </View>
              <View style={{flex:0.9,backgroundColor:'orange',justifyContent:'center',alignItems:'center'}}>
               <Text style={{fontSize:20,color:'black'}}>{this.state.privacy}</Text>

              </View>
                
            </View>
        )

        }
    
}