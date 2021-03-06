import React,{Component} from 'react';
import {View,StyleSheet,Text,TextInput,Image,TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
export default class Selection extends Component{
    constructor(){
        super();
        this.state={privacy:'OC'

        }
    }
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
              <View style={{flex:0.9,backgroundColor:'orange',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{width:300,height:300,backgroundColor:'green',borderRadius:150,overflow:'hidden'}} onPress={()=>this.props.navigation.navigate('Contactlist')}>
                  <Image source={require('../images/sport.png')} style={{width:undefined,height:undefined,flex:1}} resizeMode={'contain'}>

                  </Image>

                </TouchableOpacity>

              </View>
                
            </View>
        )

        }
    
}