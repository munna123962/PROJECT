import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';

export default class Contactlist extends Component {
    constructor() {
        super();
        this.state = {data:[]};
    }
    contacts = ({ sn, icon, name, number }) => {
        return (

            <View style={{ width: '100%', height: 150, flexDirection: 'row', borderWidth: 1, borderColor: '#F1F3F4' }}>
                <View style={{ flex: 0.15, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: 'gray' }}>{sn}</Text>

                </View>
                <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 60, height: 60, backgroundColor: 'green', borderRadius: 30, overflow: 'hidden' }}>
                        <Image resizeMode={'cover'} style={{ flex: 1, width: undefined, height: undefined }} source={icon}>

                        </Image>

                    </View>

                </View>
                <View style={{ flex: 0.6, backgroundColor: 'white' }}>
                    <View style={{ flex: 0.5, justifyContent: 'center' }}>

                        <Text style={{ fontSize: 16, color: 'gray', fontWeight: 'bold', marginLeft: 5 }}>{name}
                        </Text>
                    </View>
                    <View style={{ flex: 0.5 }}>

                        <Text style={{ fontSize: 14, color: 'gray', fontWeight: '500', marginLeft: 5 }}>{number}
                        </Text>
                    </View>


                </View>

            </View>
        )





    }
    componentDidMount(){
        this.apiData()
    }
    apiData=() => {
    
          fetch('https://reactnative.dev/movies.json')
          .then((response)=> response.json())
          .then((json) => setState({data:json.movies}))
          .catch((error) => console.error(error))
         
    }
         
   
    /* <this.contacts sn={'1'} name={'Mohammed Munna'} number={'9951738731'} icon={require('./images/logo2.jpg')}/>*/

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchbar}>
                    <TouchableOpacity style={{flex:0.15,backgroundColor:'orange',justifyContent:'center'}} onPress={()=>this.props.navigation.openDrawer()}>
                        <Text style={{fontSize:20,color:'purple'}}>Menu</Text>


                    </TouchableOpacity>



                </View>
                <View style={styles.listcontainer}>
                    <FlatList
                //  data={[{ id: '0', name: 'MohammedMunna', number: '9951738731' },
                    //  { id: '1', name: 'younus', number: '9642573572' }]}
                      data={this.state.data}
                        renderItem={({ item }) => {
                            return (
                                <this.contacts  name={item.title} number={item.releaseYear} icon={require('../images/logo2.jpg')} />
                             //  <Text style={{fontSize:20,color:'black'}}>{item.title}</Text>
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
    container: { flex: 1 },
    searchbar: { flex: 0.1, backgroundColor: 'green',flexDirection:'row' },
    listcontainer: { flex: 0.9 },



}
);
/*
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View ,Image} from 'react-native';
contacts = ({ sn, icon, name, number }) => {
    return (

        <View style={{ width: '100%', height: 150, flexDirection: 'row', borderWidth: 1, borderColor: '#F1F3F4' }}>
            <View style={{ flex: 0.15, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: 'gray' }}>{sn}</Text>

            </View>
            <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 60, height: 60, backgroundColor: 'green', borderRadius: 30, overflow: 'hidden' }}>
                    <Image resizeMode={'cover'} style={{ flex: 1, width: undefined, height: undefined }} source={icon}>

                    </Image>

                </View>

            </View>
            <View style={{ flex: 0.6, backgroundColor: 'white' }}>
                <View style={{ flex: 0.5, justifyContent: 'center' }}>

                    <Text style={{ fontSize: 16, color: 'gray', fontWeight: 'bold', marginLeft: 5 }}>{name}
                    </Text>
                </View>
                <View style={{ flex: 0.5 }}>

                    <Text style={{ fontSize: 14, color: 'gray', fontWeight: '500', marginLeft: 5 }}>{number}
                    </Text>
                </View>


            </View>

        </View>
    )





}

export default App = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetch('https://reactnative.dev/movies.json')
        .then((response) => response.json())
        .then((json) => setData(json.movies))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
  
    return (
      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
           
            renderItem={({ item }) => (
                <this.contacts  name={item.title} number={item.releaseYear} icon={require('../images/logo2.jpg')} />
            )}
          />
        )}
      </View>
    );
  };*/
  