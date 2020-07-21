import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native'
import { Picker } from '@react-native-community/picker';

export default class Profileviewedit extends Component {
    constructor() {
        super();
        this.state = {privacy:'',status:'',name:''}
    }
    list = ({ place, icon ,value,ontext,keyentry}) => {
        return (
            <View style={{ flex: 1, borderWidth: this.convertFlexToFixed(0.002), borderColor: '#F1F3F4', flexDirection: 'row' }}>
                
                <View style={{ flex: 0.85, justifyContent: 'center' }}>
                    <TextInput placeholder={place} style={{backgroundColor:'#E7D0FB'}}  
                    value={value} onChangeText={(text) => ontext(text)} keyboardType={keyentry} placeholderTextColor={'#F1F3F4'}> </TextInput>
                </View>
                <View style={{ flex: 0.15, backgroundColor: '#E7D0FB', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: this.convertFlexToFixed(0.05), height: this.convertFlexToFixed(0.05), borderRadius: this.convertFlexToFixed(0.05 / 2), overflow: 'hidden' }}>
                        <Image source={icon} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'}>

                        </Image>
                    </View>

                </View>
            </View>
        )
    }
    getScreenMaxHeight = () => {
        const h = Dimensions.get('window').height
        const w = Dimensions.get('window').width
        if (h > w) {
            return h
        } else {
            return w
        }
    }
    convertFlexToFixed = (flexValue) => {
        const screenHeight = this.getScreenMaxHeight()
        const fixed = screenHeight * flexValue
        return fixed
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ width: '100%', height: this.convertFlexToFixed(0.1), flexDirection: 'row' }}>
                    <View style={{ flex: 0.15, backgroundColor: 'rgba(128,0,128,0.8)', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: this.convertFlexToFixed(0.05), height: this.convertFlexToFixed(0.05) }}>
                            <Image source={require('../images/back.png')} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'}>

                            </Image>
                        </View>

                    </View>
                    <View style={{ flex: 0.7, backgroundColor: 'rgba(128,0,128,0.8)', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: this.convertFlexToFixed(0.03), color: 'white' }}>
                            Edit Profile
                       </Text>

                    </View>
                    <View style={{ flex: 0.15, backgroundColor: 'rgba(128,0,128,0.8)', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: this.convertFlexToFixed(0.05), height: this.convertFlexToFixed(0.05) }}>
                            <Image source={require('../images/attach.png')} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'}>

                            </Image>
                        </View>

                    </View>
                </View>
                <ScrollView contentContainerStyle={{ width: '100%', height: this.convertFlexToFixed(1.2) }}>
                    <View style={{ width: '100%', height: this.convertFlexToFixed(0.4), backgroundColor: '#E7D0FB', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: this.convertFlexToFixed(0.4), height: this.convertFlexToFixed(0.4), backgroundColor: 'brown', borderRadius: this.convertFlexToFixed(0.4 / 2), overflow: 'hidden' }}>
                            <Image source={require('../images/profilestyle.jpg')} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'}>

                            </Image>
                        </View>
                    </View>
                    <View style={{ width: '100%', height: this.convertFlexToFixed(0.8) }}>
                        <ScrollView nestedScrollEnabled={true} >
                            <View style={{ width: '100%', height: this.convertFlexToFixed(0.1),justifyContent:'center', borderWidth: this.convertFlexToFixed(0.002),borderColor: '#F1F3F4'}}>
                            <Picker  style={{backgroundColor:'#E7D0FB'}} selectedValue={this.state.privacy}
                                onValueChange={(text) => { this.setState({ privacy: text }) }}>
                                <Picker.Item label="Public" value="Public" />
                                <Picker.Item label="Private" value="Private" />
                            </Picker>




                            </View>
                            <View style={{ width: '100%', height: this.convertFlexToFixed(0.1),justifyContent:'center', borderWidth: this.convertFlexToFixed(0.002),borderColor: '#F1F3F4'}}>
                            <Picker style={{backgroundColor:'#E7D0FB'}} selectedValue={this.state.status} 
                                onValueChange={(text) => { this.setState({ status: text }) }}>
                                <Picker.Item label="AVL" value="AVL" />
                                <Picker.Item label="Not AVL" value="Not AVL" />
                            </Picker>




                            </View>
                            <View style={{ width: '100%', height: this.convertFlexToFixed(0.1) }}>

                                <this.list place={'Enter Name here'}  ontext={(text)=>{this.setState({name:text})}} icon={require('../images/mainname.png')} />

                            </View>
                            <View style={{ width: '100%', height: this.convertFlexToFixed(0.1) }}>
                                <this.list name={'Electrical Engineer'} icon={require('../images/profession.png')} />
                            </View>
                            <View style={{ width: '100%', height: this.convertFlexToFixed(0.1) }}>
                                <this.list name={'Ontime Group Of Companies'} icon={require('../images/company.png')} />
                            </View>
                            <View style={{ width: '100%', height: this.convertFlexToFixed(0.1) }}>
                                <this.list name={'+919951738731'} icon={require('../images/phone.jpg')} />
                            </View>
                            <View style={{ width: '100%', height: this.convertFlexToFixed(0.1) }}>
                                <this.list name={'+917842841662'} icon={require('../images/call.png')} />
                            </View>
                            <View style={{ width: '100%', height: this.convertFlexToFixed(0.1) }}>
                                <this.list name={'+919951738731'} icon={require('../images/Whatsapp.png')} />
                            </View>
                            <View style={{ width: '100%', height: this.convertFlexToFixed(0.1) }}>
                                <this.list name={'mohammedmunna596@gmail.com'} icon={require('../images/email.png')} />
                            </View>
                            <View style={{ width: '100%', height: this.convertFlexToFixed(0.1) }}>
                                <this.list name={'www.munna.com'} icon={require('../images/weba.png')} />
                            </View>
                            <View style={{ width: '100%', height: this.convertFlexToFixed(0.1) }}>
                                <this.list name={'Gadwal'} icon={require('../images/map.png')} />
                            </View>
                            <View style={{ width: '100%', height: this.convertFlexToFixed(0.1) }}>
                                <this.list name={'munna.mohammed.94'} icon={require('../images/fbb.png')} />
                            </View>
                            <View style={{ width: '100%', height: this.convertFlexToFixed(0.1) }}>
                                <this.list name={'munna.mohammed.123'} icon={require('../images/instagrama.png')} />
                            </View>
                            <View style={{ width: '100%', height: this.convertFlexToFixed(0.1) }}>
                                <this.list name={'munna.mohammed.123'} icon={require('../images/youtubea.png')} />
                            </View>
                            <View style={{ width: '100%', height: this.convertFlexToFixed(0.1) }}>
                                <this.list name={'munna.mohammed.123'} icon={require('../images/twitter.png')} />
                            </View>
                            <View style={{ width: '100%', height: this.convertFlexToFixed(0.1) }}>
                                <this.list name={'munna.mohammed.123'} icon={require('../images/ln.png')} />
                            </View>
                            <View style={{ width: '100%', height: this.convertFlexToFixed(0.1) }}>
                                <this.list name={'munna.mohammed.123'} icon={require('../images/telegrama.png')} />
                            </View>
                            <View style={{ width: '100%', height: this.convertFlexToFixed(0.1) }}>
                                <this.list name={'9951738731'} icon={require('../images/phonepay.png')} />
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: { flex: 1 }

})