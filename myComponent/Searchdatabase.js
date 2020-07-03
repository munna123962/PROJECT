import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, FlatList, BackHandler, Alert, Dimensions } from 'react-native';
import firebaseApp from '../firebaseConfig'
import { ScrollView } from 'react-native-gesture-handler';

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            search: '',

            fcards: [], allcards: [],SearchWord:''

        };
    }

    UNSAFE_componentWillMount() {

        this.fcards()
    }



fcards = () => {
    const id = firebaseApp.auth().currentUser.uid;
    const path = 'Users/ListOfUsers/Public'
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
    //console.log('--flat list structured data',cards)
    this.setState({ fcards: cards, allcards: cards })

}

doSearch = (searchableText) => {
    console.log('=====serach word', searchableText)
    let fullData = this.state.allcards; //[{id:'',name:'',cname:''},{id:'',name:'',cname:''}]
    let result = []
    for (var i = 0; i < fullData.length; i++) {
        const user = fullData[i]
        console.log('-----name', user.name, '---user.cname', user.cname)
        if (user.name.includes(searchableText) || user.cname.includes(searchableText)) {
            result.push(user)
            console.log('----saved', user.name, user.cname)
        }

    }
    this.setState({ fcards: result })

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

                        <Text style={{ fontSize: 14, color: 'gray', fontWeight: '500', marginLeft: 5 }}>{group}
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

                   
                  

                </View>
            </View>
           

            <ScrollView contentContainerStyle={{ width: '100%', height: this.ConvertFlexToFixed(1.1) }}>

                <View style={{ width: '100%', height: this.ConvertFlexToFixed(0.1) }}>
                    <TextInput style={{ borderColor: '#E8EBF0', borderWidth: 2, borderRadius: 10 }} placeholder={'Search by name'} onChangeText={(text) => { this.setState({SearchWord:text},()=>{this.doSearch(text)}) }}>

                    </TextInput>

                </View>


                <View style={{ width: '100%', height: this.ConvertFlexToFixed(0.9) }}>
                    <ScrollView nestedScrollEnabled={true}>
                        <FlatList

                            data={this.state.SearchWord.length<1? []: this.state.serachthis.state.bcards}
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
                                            this.props.navigation.navigate('Addmember', { data: item })
                                        }}
                                    />
                                );

                            }
                            }
                        />
                    </ScrollView>

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