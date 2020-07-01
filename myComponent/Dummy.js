import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';



export default class Dummy extends Component {
    constructor() {
        super();
        this.state = {

        };
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView >

                    <View style={{ width: '100%', height: 100, backgroundColor: 'blue' }}>

                    </View>
                    <View style={{ width: '100%', height: 100, backgroundColor: 'yellow' }}>

                    </View>
                    <View style={{ width: '100%', height: 100, backgroundColor: 'orange' }}>

                    </View>
                    <View style={{ width: '100%', height: 100, backgroundColor: 'purple' }}>

                    </View>
                    <View style={{ width: '100%', height: 100, backgroundColor: 'green' }}>

                    </View>
                    <View style={{ width: '100%', height: 100, backgroundColor: 'yellow' }}>

                    </View>
                    <View style={{ width: '100%', height: 100, backgroundColor: 'orange' }}>

                    </View>
                    <View style={{ width: '100%', height: 100, backgroundColor: 'purple' }}>

                    </View>
                    <View style={{ width: '100%', height: 100, backgroundColor: 'green' }}>

                    </View>
                    
                </ScrollView>



            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'orange' },

}

)