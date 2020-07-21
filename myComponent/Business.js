import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, FlatList, BackHandler, Alert, Dimensions, Linking } from 'react-native';
import firebaseApp from '../firebaseConfig'
import { ScrollView } from 'react-native-gesture-handler';
import openMap from 'react-native-open-maps';
import getDirections from 'react-native-google-maps-directions'

export default class Business extends Component {
    constructor() {
        super();
        this.state = {
            search: '',

            bcards: [], scards: [],
            allbcards: [],number:''

        };
    }

   UNSAFE_componentWillMount() {
       // console.log('enter bfm')
        this.focus = this.props.navigation.addListener('focus', () => {


            this.bcards()

            //console.log('entered bfm')


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
             //console.log('-----got data from server',dataa)
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
        console.log('--flat list structured data', cardsa)
        this.setState({ bcards: cardsa, allbcards: cardsa })

    }


    doSearch = (searchableText) => {
        console.log('=====serach word', searchableText)
        let fullData = this.state.allbcards; //[{id:'',name:'',cname:''},{id:'',name:'',cname:''}]
        let result = []
        for (var i = 0; i < fullData.length; i++) {
            const user = fullData[i]
         //   console.log('-----name', user.name, '---user.cname', user.cname)
            if (user.name.includes(searchableText) || user.cname.includes(searchableText)) {
                result.push(user)
                //console.log('----saved', user.name, user.cname)
            }

        }
        this.setState({ bcards: result })

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
/* UNSAFE_componentWillMount() {
        console.log('enter bfm')
        this.focus = this.props.navigation.addListener('focus', () => {

            
                const Database = this.props.route.params.mata
                console.log('------------------------------------------------------------ mataaaaa', Database)
               
              
            
                for (var indx of Database) {

                     console.log('-----indx is',indx)
                    console.log('vvvvvvv',Database[indx])
                  //  const singleCarda = {
                       // id: indx, name: Database[indx].name, job: Database[indx].job, cname: Database[indx].cname,
                       // number: Database[indx].number, dp: Database[indx], group: Database[indx].roup
                  //  }
                   // cardsa.push(singleCarda)
                }
                console.log('--flat list structured data', cardsa)
                this.setState({ scards: cardsa })

            


            console.log('entered bfm')


        });


    }
    componentWillUnmount() {
        this.props.navigation.removeListener(this.focus)
    }*/










contacts = ({ icon, name, job, cname, number, onPress, group, onTouch }) => {
    return (

        <TouchableOpacity onPress={() => onPress()} style={{ width: '100%', height: 160, flexDirection: 'row', borderWidth: 3, borderColor: '#F1F3F4', backgroundColor: 'white' }}>

            <View style={{ flexBasis: 80, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 75, height: 80, backgroundColor: 'green', borderRadius: 45, overflow: 'hidden' }}>
                    <Image resizeMode={'cover'} style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: icon }}>

                    </Image>

                </View>

            </View>
            <View style={{ flexBasis: 240, flexGrow: 1, backgroundColor: 'white' }}>
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
linkPhone=(number)=>{
    console.log('link number',number)
    this.setState({number:number})
    console.log('link number',this.state.number)
    
    const phoneNumber = 'tel:${this.state.number}';
    console.log('link number',phoneNumber)
    Linking.openURL(phoneNumber);

}
 linkMap=()=>{
    console.log('link Map')
    const data = {
        /*source: {
         latitude: -33.8356372,
       longitude: 18.6947617
       },
       destination: {
         latitude: -33.8600024,
         longitude: 18.697459
       },*/
       params: [
         {
           key: "travelmode",
           value: "driving"        // may be "walking", "bicycling" or "transit" as well
         },
         {
           key: "dir_action",
           value: "navigate"       // this instantly initializes navigation using the given travel mode
         }
       ],
     /*  waypoints: [
         {
           latitude: -33.8600025,
           longitude: 18.697452
         },
         {
           latitude: -33.8600026,
           longitude: 18.697453
         },
            {
           latitude: -33.8600036,
           longitude: 18.697493
         }
       ]*/
     }
  
     getDirections(data)
   }
   linkWhat=(text,number)=>{
    Linking.openURL(`whatsapp://send?text=${text}&phone=${number}`);

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
                    <TouchableOpacity style={{ flex: 0.2, backgroundColor: 'skyblue', justifyContent: 'center' }} onPress={() => { this.props.navigation.navigate('Dashboard') }}>
                        <Text style={{ fontSize: 18, color: 'black' }}>
                            All
                            </Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.4, backgroundColor: 'orange', justifyContent: 'center' }} onPress={() => { }}>
                        <Text style={{ fontSize: 18, color: 'black' }}>
                            BusinessZone
                            </Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.4, backgroundColor: 'green', justifyContent: 'center' }} onPress={() => { this.props.navigation.navigate('Friend') }}>
                        <Text style={{ fontSize: 18, color: 'black' }}>
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

                            data={this.state.bcards}
                            extraData={this.state}
                            renderItem={({ item }) => {
                                return (
                                    <this.contacts
                                        name={item.name}
                                        job={item.job}
                                        cname={item.cname}
                                        number={item.number}
                                        icon={item.dp}
                                        group={item.group}

                                        onPress={() => {
                                            Alert.alert('Choose Option for ' + item.name, 'Here', [
                                                { text: 'Edit', onPress: () => { this.props.navigation.navigate('Myedit', { data: item }) } },
                                              //  { text: 'Cancel', onPress: () => { this.props.navigation.navigate('Business') } },
                                                {
                                                    text: 'Map', onPress: () => this.linkWhat(item.name,item.number)
                                                },
                                                {
                                                    text: 'Dial', onPress: () => this.linkPhone(item.number)
                                                }])

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
    container: { flex: 1 },
    heading: { flex: 1, backgroundColor: 'purple', flexDirection: 'row' },


}

)