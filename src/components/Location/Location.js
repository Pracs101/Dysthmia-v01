import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import RNLocation from 'react-native-location';
import moment from 'moment';

class Location extends Component {
  state = {
    location: null
  }
  componentDidMount() {
    RNLocation.configure({
      distanceFilter: 10
    }).then(() => {
      this._startUpdatingLocation();
    });
  }

  _startUpdatingLocation = () => {
    this.locationSubscription = RNLocation.subscribeToLocationUpdates(
      locations => {
        this.setState({ location: locations[0] });
      }
    );
  };
  componentWillUnmount() {
    this.locationSubscription();
  }
  render() {
    let data = (
      <View>
        <Text style={styles.value} >
          Fetching
        </Text>
      </View>
    );
    if(this.state.location) {
      data = (
        <View>
          <View style={styles.container}  >
            <Text style={styles.name} >Time</Text>
            <Text style={styles.value} >{moment(this.state.location.timestamp).format('MMMM Do YYYY, h:mm a')}</Text>
          </View>
          {
          Object.keys(this.state.location).map(i => {
            if(i === 'fromMockProvider') return null;
            return (
              <View style={styles.container} key={i} >
                <Text style={styles.name} >{i}</Text>
                <Text style={styles.value} >{this.state.location[i]}</Text>
              </View>
            );
          })}
        </View>
      );
    }
    return (
      <ScrollView>
        <Text style={styles.title} >Location</Text>
        {data}
        <View style={{ height: 80 }} ></View>
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

export default Location;