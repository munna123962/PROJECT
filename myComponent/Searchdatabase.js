import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, FlatList, BackHandler, Alert, Dimensions } from 'react-native';
import firebaseApp from '../firebaseConfig'
import RNFetchBlob from "rn-fetch-blob";

export default class Searchdatabase extends Component {
    constructor() {
        super();
        this.state = {
            search: '',

            pcards: [], allpcards: [],SearchWord:'',
            

        };
    }

    componentDidMount() {
        this.pcards()
      
 
     }
   


pcards = () => {
    const id = firebaseApp.auth().currentUser.uid;
    const path = 'ProfileUsers/ListOfProfileUsers/Public'
    // console.log('-----get cards from server')
    firebaseApp.database().ref(path).on('value', (result) => {
        const data = JSON.parse(JSON.stringify(result))
        console.log('-----got data from server',data)
        this.structureFlatList(data)
    })
}
structureFlatList = (data) => {
    //  { id: '0', name: 'MohammedMunna',job:'Electrical Engineer', cname:'Bsmarts AllIndia ', number: '9951738731'}
    let cards = []
    for (var indx in data) {
        // console.log('-----indx is',indx)
        //console.log(data[indx])
        const singleCard = {
            id: indx, name: data[indx].Userdetails.Name, job: data[indx].Userdetails.Job, cname: data[indx].Userdetails.CompanyName,
            number: data[indx].Userdetails.ContactNumber, dp: data[indx].Userdetails['dp'], privacy: data[indx].Userdetails.privacy,
            path:'ProfileUsers/ListOfProfileUsers/Public/'+indx
        
        }
        cards.push(singleCard)
    }
    //console.log('--flat list structured data',cards)
    this.setState({ pcards: cards, allpcards: cards })

}

doSearch = (searchableText) => {
    console.log('=====serach word', searchableText)
    let fullData = this.state.allpcards; //[{id:'',name:'',cname:''},{id:'',name:'',cname:''}]
    let result = []
    for (var i = 0; i < fullData.length; i++) {
        const user = fullData[i]
        console.log('-----name', user.name, '---user.cname', user.cname)
        if (user.name.includes(searchableText) || user.cname.includes(searchableText)) {
            result.push(user)
            console.log('----saved', user.name, user.cname)
        }

    }
    this.setState({ pcards: result })

}

contacts = ({ icon, name, job, cname, number, onPress, group }) => {
    return (

        <TouchableOpacity onPress={() => onPress()} style={{ width: '100%', height: 160, flexDirection: 'row', borderWidth: 3, borderColor: '#F1F3F4', backgroundColor: 'white' }}>

            <View style={{ flexBasis: 100, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 80, height: 80, backgroundColor: 'green', borderRadius: 45, overflow: 'hidden' }}>
                    <Image resizeMode={'cover'} style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: icon }}>

                    </Image>

                </View>

            </View>
            <View style={{ flexBasis: 260, flexGrow: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.2, justifyContent: 'center' }}>

                        <Text style={{ fontSize: 16, color: 'orange', fontWeight: 'bold', marginLeft: 5 }}>{name}
                        </Text>
                    </View>
                    <View style={{ flex: 0.2, justifyContent: 'center' }}>

                        <Text style={{ fontSize: 14, color: 'gray', fontWeight: '500', marginLeft: 5 }}>{job}
                        </Text>
                    </View>
                    <View style={{ flex: 0.2, justifyContent: 'center' }}>

                        <Text style={{ fontSize: 14, color: 'gray', fontWeight: '500', marginLeft: 5 }}>{cname}
                        </Text>
                    </View>
                    <View style={{ flex: 0.15, justifyContent: 'center' }}>

                        <Text style={{ fontSize: 14, color: 'gray', fontWeight: '500', marginLeft: 5 }}>{number}
                        </Text>
                    </View>
                    <View style={{ flex: 0.15, justifyContent: 'center' }}>

                        <Text style={{ fontSize: 14, color: 'gray', fontWeight: '500', marginLeft: 5 }}>public
                        </Text>
                    </View>
                    <View style={{ flex: 0.1, justifyContent: 'center' }}>

                        <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400', marginLeft: 5 }}>Date & Time:
                            </Text>
                    </View>
                </View>


            </View>

        </TouchableOpacity>
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
ConvertFlexToFixed = (flexvalue) => {
    const screenHeight = this.getScreenMaxHeight();
    const fixed = screenHeight * flexvalue
    return fixed

}

bzsave=(idSave,pathSave)=>{
   /* this.setState({name:name,job:job,cname:cname,number:number,id:id,dp:dp});
    console.log('llllllll')
    this.onSavePress();*/
    const id = firebaseApp.auth().currentUser.uid
    const path = 'Users/ListOfUsers/' + id + '/Businesszone/RefOfMembers/'+idSave
    firebaseApp.database().ref(path).set(pathSave)
            .then((res) => {
                Alert.alert('Saved Successfully')
                
            })
            .catch((e)=>{
                console.log('-----error saving business ref user',e)
            })

}

    fzsave=(idSave,pathSave)=>{
       /* this.setState({name:name,job:job,cname:cname,number:number,id:id,dp:dp});
        console.log('llllllll')
        this.onFSavePress();*/

        const id = firebaseApp.auth().currentUser.uid
    const path = 'Users/ListOfUsers/' + id + '/Friendzone/RefOfMembers/'+idSave
    firebaseApp.database().ref(path).set(pathSave)
            .then((res) => {
                Alert.alert('Saved Successfully')
            })
            .catch((e)=>{
                console.log('-----error saving business ref user',e)
            })
    }
  //Users/ListOfUsers/VvZjrNR73dcZ6JGtMRS02NsRPEY2/Businesszone/ListOfMembers/-MB_1CEQQM7y56Uuj5n7
    
   

                


render() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', height: this.ConvertFlexToFixed(0.1) }}>
                <View style={styles.heading}>
                    <TouchableOpacity style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.openDrawer() }} >
                        <View style={{ width: this.ConvertFlexToFixed(0.05), height: this.ConvertFlexToFixed(0.05) }}>
                            <Image source={require('../images/menu.png')} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'contain'}>

                            </Image>

                        </View>



                    </TouchableOpacity>
                    <View style={{ flex: 0.55, justifyContent: 'center', marginLeft: 5 }}>
                        <Text style={{ fontSize: this.ConvertFlexToFixed(0.03), color: 'black' }}>
                          {this.state.name}
                    </Text>
                    </View>

                   
                  

                </View>
            </View>
           

           

                <View style={{ width: '100%', height: this.ConvertFlexToFixed(0.1) }}>
                    <TextInput style={{ borderColor: '#E8EBF0', borderWidth: 2, borderRadius: 10 }} placeholder={'Search by name'} onChangeText={(text) => { this.setState({SearchWord:text},()=>{this.doSearch(text)}) }}>

                    </TextInput>

                </View>


                <View style={{ width: '100%', height: this.ConvertFlexToFixed(0.8) }}>
                  
                        <FlatList

                            data={this.state.SearchWord.length<1? []: this.state.pcards}
                            extraData={this.state}
                            renderItem={({ item }) => {
                                return (
                                    <this.contacts
                                        id={item.id}
                                        name={item.name}
                                        job={item.job}
                                        cname={item.cname}
                                        number={item.number}
                                        icon={item.dp}
                                      

                                        onPress={() => {
                                            console.log('-----------------------------------===---------item id',item.id)
                                            Alert.alert('Do you want to Add '+item.name,'which zone',[
                                                {text:'BusinessZone',onPress:()=>this.bzsave(item.id,item.path,item.privacy)},
                                                {text:'FriendZone',onPress:()=>this.fzsave(item.id,item.path,item.privacy)},
                                                {text:'Cancel',onPress:()=>{this.props.navigation.navigate('Searchdatabase')}}])
                                        }}
                                    />
                                );

                            }
                            }
                        />
                    

                </View>




           


        </View>
    )
}
}
const styles = StyleSheet.create({
    
    heading: { flex:1, backgroundColor: 'purple', flexDirection: 'row' },


}

)