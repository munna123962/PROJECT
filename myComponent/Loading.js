import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, ActivityIndicator } from 'react-native';



export default class Loading extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    }
    

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize:20,color:'black'}}>Loading......</Text>
                <ActivityIndicator size='large' color='black'>

                </ActivityIndicator>
              
               



            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: { flex: 1 ,backgroundColor:'orange',justifyContent:'center',alignItems:'center'},

}

)