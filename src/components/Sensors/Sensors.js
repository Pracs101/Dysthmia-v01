import React, { Component } from 'react';
import { DeviceEventEmitter, View, ScrollView, Text, StyleSheet, NativeModules } from 'react-native';

const mSensorManager = NativeModules.SensorManager;

class Sensors extends Component {
  state = {
    steps: null,
    light: null
  }
  componentDidMount() {
    mSensorManager.startStepCounter(1000);
    DeviceEventEmitter.addListener('StepCounter', (data) => {
      /**
      * data.steps
      **/
      this.setState({ steps: data.steps });
    });
    mSensorManager.startLightSensor(100);
    DeviceEventEmitter.addListener('LightSensor', (data) => {
      /**
      * data.light
      **/
      this.setState({ light: data.light });
    });
  }
  componentWillUnmount() {
    mSensorManager.stopLightSensor();
    mSensorManager.stopStepCounter();
  }
  render() {
    return (
      <ScrollView>
        <Text style={styles.title} >Sensors</Text>
        <View style={styles.container}>
          <Text style={styles.name} >Light</Text>
          <Text style={styles.value} >{this.state.light}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.name} >Steps</Text>
          <Text style={styles.value} >{this.state.steps}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 15
  },
  container: {
    marginVertical: 10,
    marginHorizontal: 5
  },
  name: {
    fontSize: 15
  },
  value: {
    fontSize: 25,
    fontWeight: "bold",
  }
});

export default Sensors;