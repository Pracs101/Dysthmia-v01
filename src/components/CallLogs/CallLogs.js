import React, { Component } from 'react';
import { ScrollView, View, Text, PermissionsAndroid, StyleSheet } from 'react-native';
import CallLogs from 'react-native-call-log';

class Calllogs extends Component {
  state = {
    logs: []
  }
  componentDidMount() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      {
        title: 'Call Logs',
        message:'Access your call logs',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    ).then(granted => {
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        CallLogs.load(10).then(c => {
          this.setState({ logs: c });
        });
      } else {
        alert('Call Log permission denied');
        console.log('Call Log permission denied');
      }
    })
  }
  render() {
    let data = null;
    if(this.state.logs) {
      data = this.state.logs.map((i, index) => {
        return (
          <View style={styles.box} key={i.timestamp + index} >
            {
              Object.keys(i).map((el, ind) => {
                return (
                  <View style={styles.container} key={ind} >
                    <Text style={styles.name} >{el}</Text>
                    <Text style={styles.value} >{i[el]}</Text>
                  </View>
                );
              })
            }
          </View>
        );
      })
    }
    return (
      <View>
        <Text style={styles.title} >Call Logs</Text>
        <ScrollView>
          {data}
          <View style={{ height: 300 }} ></View>
        </ScrollView>
      </View>
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
  box: {
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc'
  },  
  container: {
    marginVertical: 5,
    // marginHorizontal: 5
  },
  name: {
    fontSize: 15
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
  }
});

export default Calllogs;