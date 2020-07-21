import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import firebaseApp from '../firebaseConfig'
export default class DocuPicker extends Component {
    constructor() {
        super();
        this.state = {
            singlefile: 'https://img.icons8.com/offices/40/000000/attach.png'

        };
    }
    async single() {
        console.log('enter single function')
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            //Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            console.log('URI : ' + res.uri);
            console.log('Type : ' + res.type);
            console.log('File Name : ' + res.name);
            console.log('File Size : ' + res.size);
            //Setting the state to show single file attributes
            this.setState({ singlefile: res });
        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }



    }
   /* async multiple() {
        //Opening Document Picker for selection of multiple file
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.images],
                //There can me more options as well find above
            });
            for (const res of results) {
                //Printing the log realted to the file
                console.log('res : ' + JSON.stringify(res));
                console.log('URI : ' + res.uri);
                console.log('Type : ' + res.type);
                console.log('File Name : ' + res.name);
                console.log('File Size : ' + res.size);
            }
            //Setting the state to show multiple file attributes
            this.setState({ multiplefile: results });
        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from multiple doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    }*/
    save=()=>{
      
    uploadImageToFb = (fbPath, userDetailsPath) => {
        
        const image = this.state.singlefile.uri;
      
        const originalXMLHttpRequest = window.XMLHttpRequest;
        const originalBlob = window.Blob;
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;

        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;

        let uploadBlob = null;

        let uploadTask = firebaseApp
            .storage()
            .ref()
            .child(fbPath);
        const mime = "image/jpg";

        return fs
            .readFile(image, "base64")
            .then(data => {
                return Blob.build(data, { type: `${mime};BASE64` });
            })
            .then(blob => {
                uploadBlob = blob;
                return uploadTask.put(blob, {
                    contentType: mime,
                    customMetadata: {
                        name: imageName
                    }
                });
            })
            .then(() => {
                uploadBlob.close();
                window.XMLHttpRequest = originalXMLHttpRequest;
                window.Blob = originalBlob;

                return uploadTask.getDownloadURL();
            })
            .then(imgUrl => {
                console.log('----downloadable url ', imgUrl)

                const urlData = { dp: imgUrl }
                return firebaseApp.database().ref(userDetailsPath).update(urlData);

            })
            .then((res) => {
                Alert.alert('Saved Successfully with image')
                this.props.navigation.navigate('Dashboard')
                return res
            })
            .catch(error => {
                console.log(error)
                return error;
            });
    };

}



    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'purple' }}>
                    <Text style={{ fontSize: 20, color: 'black' }}>Document Picker</Text>
                </View>
                <View style={{ flex: 0.8 }}>
                    <Text style={{ fontSize: 18, color: 'black' }}>
                        {this.state.singlefile.name}</Text>
                    <Text style={{ fontSize: 18, color: 'black' }}>
                        {this.state.singlefile.type}</Text>
                    <Text style={{ fontSize: 18, color: 'black' }}>
                        {this.state.singlefile.size}</Text>
                    <Text style={{ fontSize: 18, color: 'black' }}>
                        {this.state.singlefile.uri}</Text>
                </View>
                <View style={{ flex: 0.3 }}>
                    <View style={{ width: 300, height: 100 }} >
                        <Image source={{ uri: this.state.singlefile.uri }} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'}>

                        </Image>
                    </View>

                </View>
                <View style={{ flex: 0.1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center', backgroundColor: '#CACFD2' }}>
                        <Text style={{ fontSize: 18, color: 'black' }}>Attach file</Text>
                    </View>
                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center', backgroundColor: '#CACFD2' }}>
                        <TouchableOpacity style={{ width: 50, height: 50 }} onPress={() => this.single()}>
                            <Image source={require('../images/attach.png')} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'}>

                            </Image>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center', backgroundColor: '#CACFD2' }}>
                        <TouchableOpacity style={{ width: 50, height: 50 }} onPress={() => this.save()}>
                            <Image source={require('../images/sport.png')} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'}>

                            </Image>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    }
}
/**/