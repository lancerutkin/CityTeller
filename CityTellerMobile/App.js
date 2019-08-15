/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Button,
  Animated
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import MapView from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';

const App = () => {

  Geolocation.setRNConfiguration({
    authorizationLevel: 'whenInUse'
  });
  Geolocation.requestAuthorization();
  const [longitude, setLongitude] = useState(0.0000);
  const [latitude, setLatitude] = useState(0.0000);
  const [latRange, setLatRange] = useState(0.015);
  const [lngRange, setLngRange] = useState(0.0121);
  const [canUpdate, setCanUpdate] = useState(false);
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const animatedTiming = 200;

  Geolocation.getCurrentPosition(
    ({ coords }) => {
      setLongitude(coords.longitude);
      setLatitude(coords.latitude);
    }, error => alert(error.message),
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
  );

  const allowUpdate = ({latitude, longitude, latitudeDelta, longitudeDelta})=> {
    if (isInitialLoad) {
      setIsInitialLoad(false);
    } else {
      setCanUpdate(true);
      setLatitude(latitude);
      setLongitude(longitude);
      setLatRange(latitudeDelta);
      setLngRange(longitudeDelta);
    }
  };

  const loadNewVendors = () => {
    setCanUpdate(false);
    console.log(latitude, longitude, latRange, lngRange);
  };

  const update = () => {
    if (canUpdate) {
      loadNewVendors();
    }
  };

  const AnimatedButton = Animated.createAnimatedComponent(Button);

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.container}>
              <MapView
                showUserLocation={true}
                followUserLocation={true}
                style={styles.map}
                region={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: latRange,
                  longitudeDelta: lngRange,
                }}
                onRegionChangeComplete={allowUpdate}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              {canUpdate ? <Button onPress={update} title="Update" /> : null}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  container: {
    position: 'relative',
    height: 500,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute"
  }
});

export default App;
