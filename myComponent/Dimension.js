import React, { Component } from "react";  
import { Platform, StyleSheet, View, Text, Button, Dimensions } from "react-native";  

export default class Dimension extends Component {  

  constructor() {  
super();  
this.state = { screenWidth: "", screenHeight: "" }  
}  

  getScreenSize = () => {  
const screenWidth = Math.round(Dimensions.get('window').width);  
const screenHeight = Math.round(Dimensions.get('window').height);  
this.setState({ screenWidth: screenWidth, screenHeight: screenHeight })  
}  


  render() {  
return (  
<View style={styles.container}>  
<View style={{ marginTop: 150 }}>  
<Text style={styles.headerText}> Screen width : {this.state.screenWidth}</Text>  
<Text style={styles.headerText}>Screen height : {this.state.screenHeight}</Text>  
</View>  
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>  
<View style={[{ width: "40%", margin: 10 }]}>  
<Button  
              onPress={this.getScreenSize}  
              title="Get screen size"  
/>  
</View>  
</View>  

</View>  
);  
}  
}  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
// justifyContent: 'center',  
//alignItems: 'center'  
},  
  headerText: {  
    fontSize: 20,  
    textAlign: "center",  
    margin: 10,  
    fontWeight: "bold"  
},  
});