import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Alert, Dimensions, ScrollView } from 'react-native';
import firebaseApp from '../firebaseConfig'
export default class Viewprofile extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            dp: '',

            privacy: '',
            name: '',
            job: '',
            cname: '',
            number: '',
            orientationChanged: false

        }
    }
    componentDidMount() {
        this.subscribeDimensions()
      
    }
  

    Details = ({ name, dname }) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <ScrollView horizontal={true}>

                    <View style={{ width: this.ConvertFlexToWidth(0.5), height: this.ConvertFlexToFixed(0.2), backgroundColor: 'blue', borderBottomWidth: 2, borderColor: '#E4E6EB', justifyContent: 'center' }}>
                        <Text style={{ fontSize: this.ConvertFlexToFixed(0.025), color: 'black', fontWeight: 'bold' }}>{name}
                        </Text>

                    </View>
                    <View style={{ width: this.ConvertFlexToWidth(0.5), height: this.ConvertFlexToFixed(0.2), justifyContent: 'center', backgroundColor: 'yellow', borderBottomWidth: 2, borderColor: '#E4E6EB' }}>
                        <Text style={{ fontSize: this.ConvertFlexToFixed(0.025), color: 'black' }} >{dname}
                        </Text>

                    </View>
                    <View style={{ width: this.ConvertFlexToWidth(0.5), height: this.ConvertFlexToFixed(0.2), backgroundColor: 'orange', borderBottomWidth: 2, borderColor: '#E4E6EB', justifyContent: 'center' }}>
                        <Text style={{ fontSize: this.ConvertFlexToFixed(0.025), color: 'black', fontWeight: 'bold' }}>{name}
                        </Text>

                    </View>
                    <View style={{ width: this.ConvertFlexToWidth(0.5), height: this.ConvertFlexToFixed(0.2), justifyContent: 'center', backgroundColor: 'yellow', borderBottomWidth: 2, borderColor: '#E4E6EB' }}>
                        <Text style={{ fontSize: this.ConvertFlexToFixed(0.025), color: 'black' }} >{dname}
                        </Text>

                    </View>
                </ScrollView>
            </View>




        )

    }
    UNSAFE_componentWillMount() {
        // console.log('enter bfm')
         this.focus = this.props.navigation.addListener('focus', () => {
 
 this. getProfileInf()
         
 
             //console.log('entered bfm')
 
 
         });
 
 
     }
     componentWillUnmount() {
         this.props.navigation.removeListener(this.focus)
     }
    
    getProfileInf = () => {
        const id = firebaseApp.auth().currentUser.uid
        
        let path = ''
    
     
           
            path = 'ProfileUsers/ListOfProfileUsers/Public/' + id + '/Userdetails/'
        

        //firebaseApp.database().ref(path).once('value')
        firebaseApp.database().ref(path).on('value', (res) => {
            
            // .then((res) => {
            var data = JSON.parse(JSON.stringify(res))
            // console.log(data)
            const id = firebaseApp.auth().currentUser.uid
            console.log('======================================check',data)
            if(data ==null)
            {
              this.getProfileInfprivate()
            }else{
             this.setState({
                id: id,
                name: data&& data.Name?data.Name:'', 
                job: data&& data.Job?data.Job:'', 
                cname: data&& data.CompanyName?data.CompanyName:'',
                number: data&&data.ContactNumber?data.ContactNumber:'',
                 dp: data&&data.dp?data.dp:'', privacy:data&&data.privacy?data.privacy:''
              
            })
        }
            // console.log(data)
            // })/*.catch((error) => {
            // console.log('error', error.message)
        })
    
    }
    getProfileInfprivate = () => {
        const id = firebaseApp.auth().currentUser.uid
        
        let path = ''
    
     
           
            path = 'ProfileUsers/ListOfProfileUsers/Private/' + id + '/Userdetails/'
        

        //firebaseApp.database().ref(path).once('value')
        firebaseApp.database().ref(path).on('value', (res) => {
            
            // .then((res) => {
            var data = JSON.parse(JSON.stringify(res))
            // console.log(data)
            const id = firebaseApp.auth().currentUser.uid
            console.log('======================================check',data)
            this.setState({
                id: id,
                name: data&& data.Name?data.Name:'', 
                job: data&& data.Job?data.Job:'', 
                cname: data&& data.CompanyName?data.CompanyName:'',
                number: data&&data.ContactNumber?data.ContactNumber:'',
                 dp: data&&data.dp?data.dp:'', privacy:data&&data.privacy?data.privacy:''
              
            })
           // path2= 'ProfileUsers/ListOfProfileUsers/Public/' + id + '/Userdetails/'
            firebaseApp.database().ref(ProfileUsers/ListOfProfileUsers/Public/' + id + '/Userdetails).off
            // console.log(data)
            // })/*.catch((error) => {
            // console.log('error', error.message)
        })
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
    ConvertFlexToFixed = (flexvalue) => {
        const screenHeight = this.getScreenMaxHeight();
        const fixed = screenHeight * flexvalue
        return fixed

    }
    getScreenWidth = () => {
        const w = Dimensions.get('window').width
        return w
    }

    ConvertFlexToWidth = (flex) => {
        const screenWidth = this.getScreenWidth();
        const fixed = screenWidth * flex
        return fixed

    }
    subscribeDimensions = () => {
        Dimensions.addEventListener('change', () => {
            this.setState({ orientationChanged: !this.state.orientationChanged })
        })
    }

    render() {
        return (



            <View style={{ flex: 1 }}>


                <View style={{ width: this.ConvertFlexToWidth(1), height: this.ConvertFlexToFixed(0.1), flexDirection: 'row', backgroundColor: 'purple', }}>

                    <TouchableOpacity style={{ width: this.ConvertFlexToWidth(0.15), height: this.ConvertFlexToFixed(0.1), justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.openDrawer() }} >
                        <View style={{ width: this.ConvertFlexToFixed(0.05), height: this.ConvertFlexToFixed(0.05) }}>
                            <Image source={require('../images/menu.png')} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'contain'}>

                            </Image>

                        </View>



                    </TouchableOpacity>

                    <View style={{ width: this.ConvertFlexToWidth(0.55), height: this.ConvertFlexToFixed(0.1), justifyContent: 'center', marginLeft: 5 }}>
                        <Text style={{ fontSize: this.ConvertFlexToFixed(0.03), color: 'black' }}>
                            Profile
                    </Text>
                    </View>
                    <TouchableOpacity style={{ width: this.ConvertFlexToWidth(0.15), height: this.ConvertFlexToFixed(0.1), justifyContent: 'center', alignItems: 'center' }} onPress={() => { }} >
                        <View style={{ width: this.ConvertFlexToFixed(0.05), height: this.ConvertFlexToFixed(0.05) }}>
                            <Image source={require('../images/company.png')} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'contain'}>

                            </Image>

                        </View>



                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: this.ConvertFlexToWidth(0.15), height: this.ConvertFlexToFixed(0.1), justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                        const sendingData = {
                            name: this.state.name, job: this.state.job, cname: this.state.cname,
                            number: this.state.number, dp: this.state.dp, privacy: this.state.privacy,id:this.state.id
                        }
                        this.props.navigation.navigate('Addprofile', { data: sendingData })
                    }}>
                        <View style={{ width: this.ConvertFlexToFixed(0.05), height: this.ConvertFlexToFixed(0.05) }}>
                            <Image source={require('../images/profession.png')} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'contain'}>

                            </Image>

                        </View>



                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ width: this.ConvertFlexToWidth(1), height: this.ConvertFlexToFixed(1.3) }}>


                    <View style={{ width: this.ConvertFlexToWidth(1), height: this.ConvertFlexToFixed(0.2), justifyContent: 'center', alignItems: 'center', backgroundColor: 'skyblue' }}>
                        <View style={{ width: this.ConvertFlexToFixed(0.15), height: this.ConvertFlexToFixed(0.15), backgroundColor: 'green', borderRadius: this.ConvertFlexToFixed(0.1), overflow: 'hidden' }}>
                            <Image source={{ uri: this.state.dp }} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'}>

                            </Image>
                        </View>

                    </View>

                    <View style={{ width: this.ConvertFlexToWidth(1), height: this.ConvertFlexToFixed(0.7) }}>

                        <ScrollView nestedScrollEnabled={true}>


                            <View style={{ width: this.ConvertFlexToWidth(1), height: this.ConvertFlexToFixed(0.2) }}>

                                <this.Details name={'Name'} dname={this.state.name} />


                            </View>
                            <View style={{ width: this.ConvertFlexToWidth(1), height: this.ConvertFlexToFixed(0.2) }}>

                                <this.Details name={'Job'} dname={this.state.job} />


                            </View>
                            <View style={{ width: this.ConvertFlexToWidth(1), height: this.ConvertFlexToFixed(0.2) }}>

                                <this.Details name={'Privacy'} dname={this.state.privacy} />


                            </View>
                            <View style={{ width: this.ConvertFlexToWidth(1), height: this.ConvertFlexToFixed(0.2) }}>
                                <this.Details name={'Job'} dname={this.state.job} />

                            </View>
                            <View style={{ width: this.ConvertFlexToWidth(1), height: this.ConvertFlexToFixed(0.2) }}>
                                <this.Details name={'Job'} dname={this.state.job} />

                            </View>
                            <View style={{ width: this.ConvertFlexToWidth(1), height: this.ConvertFlexToFixed(0.2) }}>

                                <this.Details name={'Name'} dname={this.state.name} />


                            </View>


                        </ScrollView>

                    </View>






                    <View style={{ width: this.ConvertFlexToWidth(1), height: this.ConvertFlexToFixed(0.2), justifyContent: 'center', alignItems: 'center', backgroundColor: 'skyblue' }}>
                        <View style={{ width: this.ConvertFlexToFixed(0.15), height: this.ConvertFlexToFixed(0.15), backgroundColor: 'green', borderRadius: this.ConvertFlexToFixed(0.1), overflow: 'hidden' }}>
                            <Image source={{ uri: this.state.dp }} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'}>

                            </Image>
                        </View>

                    </View>
                    <View style={{ width: this.ConvertFlexToWidth(1), height: this.ConvertFlexToFixed(0.2), justifyContent: 'center', alignItems: 'center', backgroundColor: 'skyblue' }}>
                        <View style={{ width: this.ConvertFlexToFixed(0.15), height: this.ConvertFlexToFixed(0.15), backgroundColor: 'green', borderRadius: this.ConvertFlexToFixed(0.1), overflow: 'hidden' }}>
                            <Image source={{ uri: this.state.dp }} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'}>

                            </Image>
                        </View>

                    </View>



                </ScrollView>
                <View style={{
                    width: this.ConvertFlexToFixed(0.15), height: this.ConvertFlexToFixed(0.07), position: 'absolute',
                    backgroundColor: 'purple', bottom: this.ConvertFlexToFixed(0.03),
                    right: this.ConvertFlexToFixed(0.01), borderRadius: this.ConvertFlexToFixed(0.01)
                }}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={()=>{this.props.navigation.navigate('Newprofile')}}>
                        <View style={{ width: this.ConvertFlexToFixed(0.05), height: this.ConvertFlexToFixed(0.05) }}>
                            <Image source={require('../images/add.png')} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'}>

                            </Image>

                        </View>
                    </TouchableOpacity>

                </View >


            </View>












        )
    }
}
const styles = StyleSheet.create({
    container: { flex: 1 },

}

)
