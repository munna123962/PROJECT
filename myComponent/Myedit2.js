import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity,Alert } from 'react-native';
import firebaseApp from '../firebaseConfig'


export default class Myedit extends Component {
    constructor() {
        super();
        this.state = {name:'',job:'',cname:'',number:''
            };
    }
    input = ({ name, place, ontext }) => {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ flex: 0.35 }}>
                    <Text style={{ fontSize: 20, color: 'black' }}>{name}
                    </Text>


                </View>
                <View style={{ flex: 0.65 }}>
                    <TextInput style={{ borderColor: '#E8EBF0', borderWidth: 2, borderRadius: 5 }} placeholder={place} onChangeText={(text) => ontext(text)}>

                    </TextInput>

                </View>
            </View>

        )
    }
    
    onSavePress=()=>{
        
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headcontainer}>
                <TouchableOpacity style={{flex:0.15,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.props.navigation.goBack()}}>
                        <View style={{width:30,height:30}}>
                            <Image source={require('../images/back.png')} style={{flex:1,width:undefined,height:undefined}} resizeMode={'contain'}>

                            </Image>

                        </View>
                       


                    </TouchableOpacity>
                    <View style={{flex:0.70,justifyContent:'center',marginLeft:5}}>
                    <Text style={{fontSize:20,color:'black'}}>
                        Mohammed Munna
                    </Text>
                    </View>



                </View>
                <View style={styles.ips}>
                    <View style={styles.internalips}>
                    <View style={{ flex: 0.2 }}>
                        <Text style={{fontSize:18,color:'pink'}}>
                            {this.state.name}
                        </Text>
                            <this.input name={'Name'} place={'Enter Name here'} ontext={(text) => { this.setState({ name: text }) }} />
                        </View>

                        <View style={{ flex: 0.2 }}>
                            <this.input name={'Job Title'} place={'Enter Job Title here'} ontext={(text) => { this.setState({job: text }) }} />
                        </View>
                        <View style={{ flex: 0.2 }}>

                            <this.input name={'Company Name'} place={'Enter Company Name here'} ontext={(text) => { this.setState({ cname: text }) }} />
                        </View>
                        <View style={{ flex: 0.2 }}>

                            <this.input name={'Contact Number'} place={'Enter Contact Number here'} ontext={(text) => { this.setState({ number: text }) }} />
                        </View>
                        <View style={styles.uploadimage}>
                            <View style={{flex:0.6}}>
                            <Text style={{ fontSize: 20, color: 'black' }}>Upload Image</Text>

                            </View>
                            <TouchableOpacity style={styles.choosefile}>
                            <Text style={{ fontSize: 20, color: 'black' }}>Choose File</Text>
                        </TouchableOpacity>

                            
                        </View>

                       

                        
                        <TouchableOpacity onPress={()=>{this.onSavePress()}} style={styles.savebutton}>
                            <Text style={{ fontSize: 20, color: 'black' }}>Save</Text>
                        </TouchableOpacity>
                        
                        
                    </View>

                </View>



            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },

    headcontainer: { flex: 0.1, backgroundColor: '#9746ab',flexDirection:'row' },
    ips: { flex: 0.9 },
    internalips: { flex: 1, margin: 20 },
    
    savebutton: { flex: 0.1, backgroundColor: '#9651b5', justifyContent: 'center', alignItems: 'center', margin: 20, borderRadius: 10 },
    uploadimage:{flex:0.1,alignItems:'center',flexDirection:'row'},
    choosefile: { flex: 0.4, backgroundColor: '#9651b5',borderRadius:5,alignItems:'center' },

}

)