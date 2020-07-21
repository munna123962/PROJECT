import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, FlatList, BackHandler, Alert, Dimensions,Linking } from 'react-native';
import firebaseApp from '../firebaseConfig'
import { ScrollView } from 'react-native-gesture-handler';

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            search: '',

            cardsData: [],fcards:[],bcards:[],rfcards:[],rbcards:[],allCardsData:[]
           

        };
    }
  UNSAFE_componentWillMount() {
        console.log('enter bfm')
        this.focus = this.props.navigation.addListener('focus', () => {
            console.log('--------check 1')
           
            this.fcards()
            
            
 
    console.log('entered bfm')
   
 
        });


    }
    componentWillUnmount() {
        this.props.navigation.removeListener(this.focus)
    }
   

   
    
    bcards = () => {
        const id = firebaseApp.auth().currentUser.uid;
        const path = 'Users/ListOfUsers/' + id + '/Businesszone/ListOfMembers'
       // console.log('-----get cards from server')
        firebaseApp.database().ref(path).on('value', (result) => {
            const dataa = JSON.parse(JSON.stringify(result))
            //console.log('-----got data from server')
            this.structureFlat(dataa)
            
        })
    }
    structureFlat = (dataa) => {
        //  { id: '0', name: 'MohammedMunna',job:'Electrical Engineer', cname:'Bsmarts AllIndia ', number: '9951738731'}
        let cardsa = []
        for (var indx in dataa) {
            // console.log('-----indx is',indx)
            //console.log(data[indx])
            const singleCarda = {
                id: indx, name: dataa[indx].MemDetails.Name, job: dataa[indx].MemDetails.Job, cname: dataa[indx].MemDetails.CompanyName,
                number: dataa[indx].MemDetails.ContactNumber, dp: dataa[indx].MemDetails['dp'], group: dataa[indx].MemDetails.group
            }
            cardsa.push(singleCarda)
        }
        console.log('--flat list structured  data bcards',cardsa)
        this.setState({ bcards: cardsa },()=>{this.getRefOfOtherUsersFcards()})

    }

    getRefOfOtherUsersFcards=()=>{
        const id = firebaseApp.auth().currentUser.uid;
        const path = 'Users/ListOfUsers/' + id + '/Friendzone/RefOfMembers'
       // console.log('-----get cards from server')
        firebaseApp.database().ref(path).on('value', (result) => {
            const datafp = JSON.parse(JSON.stringify(result))
            console.log('-----got data from f server fpath',datafp)
            this.structureRefDataf(datafp)
            
        })
    }
    structureRefDataf = (paths) => {
        let cards = []
        for (var indx in paths) {
            console.log('-----indx',indx)
            console.log('-----indx',paths[indx])
            firebaseApp.database().ref(paths[indx]).once('value').then((result)=>{
                const data = JSON.parse(JSON.stringify(result))
                const singleCard = {
                    id: indx, 
                    name: data.Userdetails.Name, 
                    job: data.Userdetails.Job, 
                    cname: data.Userdetails.CompanyName,
                    number: data.Userdetails.ContactNumber, 
                    dp: data.Userdetails['dp'],
                    group: 'FriendZone'
                }
                cards.push(singleCard)
                console.log('-----cards fpathdata',cards)
            }).catch((e)=>{
                    console.log('============================error',e)
            })
            
            
        }
        //console.log('--flat list structured data',cards)
        this.setState({ rfcards: cards },()=>{this.getRefOfOtherUsersBcards()})

    }
    getRefOfOtherUsersBcards=()=>{
        const id = firebaseApp.auth().currentUser.uid;
        const path = 'Users/ListOfUsers/' + id + '/Businesszone/RefOfMembers'
       // console.log('-----get cards from server')
        firebaseApp.database().ref(path).on('value', (result) => {
            const databp = JSON.parse(JSON.stringify(result))
            console.log('-----got path from  b refserver bpath',databp)
            this.structureRefDataB(databp)
            
        })
    }
    structureRefDataB = (paths) => {
        let cards = []
        for (var indx in paths) {
            console.log('-----indx',indx)
            console.log('-----indx',paths[indx])
            firebaseApp.database().ref(paths[indx]).once('value').then((result)=>{
                const data = JSON.parse(JSON.stringify(result))
                const singleCard = {
                    id: indx, 
                    name: data.Userdetails.Name, 
                    job: data.Userdetails.Job, 
                    cname: data.Userdetails.CompanyName,
                    number: data.Userdetails.ContactNumber, 
                    dp: data.Userdetails['dp'],
                    group: 'BusinessZone'
                }
                cards.push(singleCard)
                console.log('-----got pathdata from  b refserver bpathdata',cards)

            }).catch((e)=>{
                    console.log('============================error',e)
            })
            
            
        }
        //console.log('--flat list structured data',cards)
        this.setState({ rbcards: cards },()=>{this.mergingArrays()})

    }

    fcards = () => {
        const id = firebaseApp.auth().currentUser.uid;
        const path = 'Users/ListOfUsers/' + id + '/Friendzone/ListOfMembers'
       // console.log('-----get cards from server')
        firebaseApp.database().ref(path).on('value', (result) => {
            const data = JSON.parse(JSON.stringify(result))
           // console.log('-----got data from server')
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
                id: indx, name: data[indx].MemDetails.Name, job: data[indx].MemDetails.Job, cname: data[indx].MemDetails.CompanyName,
                number: data[indx].MemDetails.ContactNumber, dp: data[indx].MemDetails['dp'], group: data[indx].MemDetails.group
            }
            cards.push(singleCard)
        }
        console.log('--flat list structured data fcards',cards)
        this.setState({ fcards: cards },()=>{this.bcards()})

    }
    mergingArrays=()=>{
        
    
        const bothCards = [...this.state.fcards, ...this.state.bcards, ...this.state.rfcards,...this.state.rbcards]
        
       
        this.setState({cardsData:bothCards,allCardsData:bothCards})
        console.log('--flat list structured data',bothCards)
    }

    doSearch = (searchableText) => {
        console.log('=====serach word', searchableText)
        let fullData = this.state.allCardsData; //[{id:'',name:'',cname:''},{id:'',name:'',cname:''}]
        let result = []
        for (var i = 0; i < fullData.length; i++) {
            const user = fullData[i]
            console.log('-----name', user.name, '---user.cname', user.cname)
            if (user.name.includes(searchableText) || user.cname.includes(searchableText)) {
                result.push(user)
                console.log('----saved', user.name, user.cname)
            }

        }
        this.setState({ cardsData: result })

    }
   /* addMobileNo = () => {
        let fullData = this.state.CardsData; //[{id:'',name:'',cname:4525},{id:'',name:'',cname:''}]
        let result = 0
        for (var i = 0; i < fullData.length; i++) {
            const user = fullData[i]
            if (user.number.length > 0) {
                const number = parseInt(user.number)
                result = result + number;
            }



        }
        return result

    }
    getAllNames = () => {
        let fullData = this.state.CardsData; //[{id:'',name:'',cname:4525},{id:'',name:'',cname:''}]
        let result = []
        for (var i = 0; i < fullData.length; i++) {
            const user = fullData[i]
            result.push(user.name)



        }
        return result
    }*/
    showDp=(icon)=>{
        if(icon== undefined || icon ==''|| icon ==null)
        {
            return( <Image resizeMode={'cover'} style={{ flex: 1, width: undefined, height: undefined }} source={require('../images/defaultDp.jpg')}>

            </Image>)
        }
        else{
           return (
                <Image resizeMode={'cover'} style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: icon }}>

                </Image> 
            )
        }
    }
    contacts = ({ icon, name, job, cname, number, onPress, group }) => {
        return (
            <TouchableOpacity onPress={() => onPress()} style={{ width: '100%', height: 160, flexDirection: 'row', borderWidth: 3, borderColor: '#F1F3F4', backgroundColor: 'white' }}>

            <View style={{ flexBasis: 80, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 75, height: 80, backgroundColor: 'green', borderRadius: 45, overflow: 'hidden' }}>
                   {this.showDp(icon)}

                </View>

            </View>
            <View  style={{ flexBasis: 240, flexGrow: 1, backgroundColor: 'white' }}>
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

                        <Text style={{ fontSize: 14, color: 'gray', fontWeight: '500', marginLeft: 5 }}>{group}
                        </Text>
                    </View>
                    <View style={{ flex: 0.1, justifyContent: 'center' }}>

                        <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400', marginLeft: 5 }}>Date & Time:
                        </Text>
                    </View>
                </View>


            </View>
            <View style={{ flexBasis: 40, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: 35, height: 35, borderRadius: 45, overflow: 'hidden' }}>
                    <Image resizeMode={'cover'} style={{ flex: 1, width: undefined, height: undefined }} source={require('../images/dial.png')}>

                    </Image>

                </View>
            </View>

        </TouchableOpacity>
        )




    }
    UNSAFE_componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {

        return true;


    };
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
                                Business Cards
                    </Text>
                        </View>

                        <TouchableOpacity style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }} onPress={() => {

                            this.props.navigation.navigate('Myadd')
                        }}>
                            <View style={{ width: this.ConvertFlexToFixed(0.05), height: this.ConvertFlexToFixed(0.05) }}>

                                <Image source={require('../images/add.png')} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'contain'}>

                                </Image>

                            </View>



                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }} onPress={() => {

                        }}>
                            <View style={{ width: this.ConvertFlexToFixed(0.05), height: this.ConvertFlexToFixed(0.05) }}>

                                <Image source={require('../images/calendar.png')} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'contain'}>

                                </Image>

                            </View>



                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{ width: '100%', height: this.ConvertFlexToFixed(0.1) }}>


                    <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 0.2, backgroundColor: 'skyblue',justifyContent:'center' }} onPress={()=>{}}>
                            <Text style={{fontSize:18,color:'black'}}>
                                All
                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 0.4, backgroundColor: 'orange',justifyContent:'center' }} onPress={()=>{this.props.navigation.navigate('Business')}}>
                            <Text style={{fontSize:18,color:'black'}}>
                                BusinessZone
                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 0.4, backgroundColor: 'green',justifyContent:'center' }} onPress={()=>{this.props.navigation.navigate('Friend')}}>
                        <Text style={{fontSize:18,color:'black'}}>
                                FriendZone
                            </Text>

                        </TouchableOpacity>
                    </View>
                    
                    </View>

                    <ScrollView contentContainerStyle={{ width: '100%', height: this.ConvertFlexToFixed(1.1) }}>

                        <View style={{ width: '100%', height: this.ConvertFlexToFixed(0.1) }}>
                            <TextInput style={{ borderColor: '#E8EBF0', borderWidth: 2, borderRadius: 10 }} placeholder={'Search by name'} onChangeText={(text) => { this.doSearch(text) }}>

                            </TextInput>

                        </View>


                        <View style={{ width: '100%', height: this.ConvertFlexToFixed(0.9) }}>
                            <ScrollView nestedScrollEnabled={true}>
                                <FlatList
                                
                                    data={this.state.cardsData}
                                    extraData={this.state}
                                    renderItem={({ item }) => {
                                        return (
                                            <this.contacts
                                                name={item.name}
                                                job={item.job}
                                                cname={item.cname}
                                                number={item.number}
                                                icon={item.dp }
                                                group={item.group}
                                                onPress={() => {  Alert.alert('Choose Option for '+item.name,'Here',[
                                                    {text:'Edit',onPress:()=>{this.props.navigation.navigate('Myedit',{data:item})}},
                                                    {text:'Cancel',onPress:()=>{this.props.navigation.navigate('Business')}},
                                                    {text:'Dial',onPress:()=>{ 
 
                                                        const number = parseInt(item.number)
                                                      let phoneNumber = 'tel:${number}';

                                                      Linking.openURL(phoneNumber);
                                                  
                                                 
                                                    }}])
                                                   
                                                }}
                                            />
                                        );

                                    }
                                    }
                                />
                            </ScrollView>

                        </View>

                        <View style={{ width: '100%', height: this.ConvertFlexToFixed(0.1) }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 0.3, backgroundColor: 'green', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18, color: 'black' }}>T Cards</Text>

                                </View>
                                <View style={{ flex: 0.2, backgroundColor: 'orange', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18, color: 'black' }}>5</Text>

                                </View>
                                <View style={{ flex: 0.3, backgroundColor: 'skyblue', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18, color: 'black' }}>T Number</Text>

                                </View>
                                <View style={{ flex: 0.2, backgroundColor: 'orange', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18, color: 'black' }}>5</Text>

                                </View>
                            </View>
                        </View>


                    </ScrollView>


                </View>
        )
    }
}
const styles = StyleSheet.create({
                    
    heading: { flex: 1, backgroundColor: 'purple', flexDirection: 'row' },


}

)