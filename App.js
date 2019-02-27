import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, KeyboardAvoidingView } from 'react-native';
import {Location, Permissions, MapView} from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      latitude: 60.200692,
      longitude: 24.934302,
      behavior: 'position'
    }
  }
  getAddress = async() => {

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    } else {
    const address = JSON.stringify(this.state.address);
    let result = await Location.geocodeAsync(address);
    console.log(result);
    let latitude = result[0].latitude;
    let longitude = result[0].longitude;
    this.setState({
      latitude, longitude
    });
  }

  }
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={this.state.behavior}>
          <MapView
            style={{width: 500, height: 600}} 
            
            region={{
              latitude:this.state.latitude,
              longitude:this.state.longitude,
              latitudeDelta:0.04,
              longitudeDelta:0.05
            }}> 
            
            <MapView.Marker coordinate={{latitude:this.state.latitude, longitude: this.state.longitude}} title={this.state.address} />
          </MapView>

          
          <View style={styles.box}>
                <TextInput  
                  style={{fontSize: 18}}  
                  placeholder='address' 
                  onChangeText={(address) => this.setState({address})}
                /> 
                <Button title="Find" onPress={this.getAddress} />
          </View>
        </KeyboardAvoidingView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  map: {
    flex: 4
  },
  box: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
});
