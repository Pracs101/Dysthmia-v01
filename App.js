import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';

import Location from './src/components/Location/Location';
import CallLogs from './src/components/CallLogs/CallLogs';
import Sensors from './src/components/Sensors/Sensors';

class App extends Component {
  state = {
    name: 'location'
  }

  render() {
    let data = null;
    if(this.state.name === 'location') {
      data = <Location />
    }
    if(this.state.name === 'callLogs') {
      data = <CallLogs />
    }
    if(this.state.name === 'sensors') {
      data = <Sensors />
    }
      
    return (
      <View>
        <View style={styles.header} >
          <TouchableNativeFeedback onPress={() => this.setState({ name: 'location' })} >
            <View style={styles.button} >
              <Text>Location</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => this.setState({ name: 'callLogs' })} >
            <View style={styles.button} >
              <Text>Call Logs</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => this.setState({ name: 'sensors' })} >
            <View style={styles.button} >
              <Text>Sensors</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        {data}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignContent: 'center',
    flexWrap: 'wrap'
  },
  button: {
    width: 100,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;