import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Button, Alert, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import axios from 'axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CoordinatesContext, Coordinate } from './maps/CoordinatesContext';
import Config from './config.js';

const GOOGLE_MAPS_API_KEY = `${Config.GOOGLE_MAPS_API_KEY}`;

const MapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const context = useContext(CoordinatesContext);
  if (!context) {
    throw new Error('CoordinatesContext must be used within a CoordinatesProvider');
  }
  const { coordinates, addCoordinate, setCoordinates } = context;

  const [searchText, setSearchText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState(Math.random().toString());
  const [tripLength, setTripLength] = useState(0);

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const address = await reverseGeocodeCoordinates(location.coords.latitude, location.coords.longitude);

      const initialCoordinate = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: address || `${location.coords.latitude}, ${location.coords.longitude}`,
      };

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      addCoordinate(initialCoordinate);
    };

    requestLocationPermission();
  }, []);

  const geocodeAddress = async (address: string) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: address,
          key: GOOGLE_MAPS_API_KEY,
        },
      });

      const results = response.data.results;
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        return { latitude: lat, longitude: lng, address: address };
      } else {
        throw new Error('Address not found');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to geocode address');
      console.error(error);
    }
  };


  const reverseGeocodeCoordinates = async (latitude: number, longitude: number): Promise<string | undefined> => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          latlng: `${latitude},${longitude}`,
          key: GOOGLE_MAPS_API_KEY,
        },
      });
  
      const results = response.data.results;
      if (results.length > 0) {
        const address = results[0].formatted_address;
        return address;
      } else {
        throw new Error('No address found');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to reverse geocode coordinates');
      console.error(error);
    }
  };
  


  const getOptimizedRoute = async (coordinates: Coordinate[]) => {
    if (coordinates.length < 2) return null;
  
    console.log('getOptimizedRoute - Initial Coordinates:', coordinates);
  
    const origin = `${coordinates[0].latitude},${coordinates[0].longitude}`;
    const possibleDestinations = coordinates.slice(1).map((coord, index) => ({
      index: index + 1,
      location: `${coord.latitude},${coord.longitude}`,
    }));
  
    console.log('getOptimizedRoute - Origin:', origin);
    console.log('getOptimizedRoute - Possible Destinations:', possibleDestinations);
  
    let bestRoute = null;
    let bestRouteDuration = Infinity;
  
    for (const destination of possibleDestinations) {
      const waypoints = possibleDestinations
        .filter((d) => d.index !== destination.index)
        .map((d) => d.location)
        .join('|');
      const waypoints2 = possibleDestinations
      .filter((d) => d.index !== destination.index)
      .map((d) => d)
  
      console.log(`getOptimizedRoute - Trying destination: ${destination.location}`);
      console.log('getOptimizedRoute - Waypoints:', waypoints);
  
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
          params: {
            origin,
            destination: destination.location,
            waypoints: `optimize:true|${waypoints}`,
            key: GOOGLE_MAPS_API_KEY,
          },
        });
  
        const { routes } = response.data;
        console.log('getOptimizedRoute - API Response Routes:', routes);
  
        if (routes.length > 0) {
          const route = routes[0];
          const totalDuration = route.legs.reduce(
            (sum: number, leg: { duration: { value: number } }) => sum + leg.duration.value,
            0
          );
  
          console.log(`getOptimizedRoute - Route Total Duration for destination ${destination.location}: ${totalDuration}`);
  
          if (totalDuration < bestRouteDuration) {
            bestRoute = {
              destinationIndex: destination.index,
              optimizedOrder: route.waypoint_order,
              waypointslist: waypoints2,
              totalDuration,
            };
            bestRouteDuration = totalDuration;
          }
        }
      } catch (error) {
        console.error('Failed to fetch route', error);
      }
    }
  
    if (bestRoute) {
      console.log('getOptimizedRoute - Best Route:', bestRoute);
  
      const optimizedCoordinates = [
        coordinates[0],
        ...bestRoute.optimizedOrder.map((index: number) => coordinates[bestRoute.waypointslist[index].index]),
        coordinates[bestRoute.destinationIndex],
      ];
  
      console.log('getOptimizedRoute - Optimized Coordinates:', optimizedCoordinates);
  
      return {
        optimizedCoordinates,
        totalDuration: bestRoute.totalDuration,
      };
    }
  
    return null;
  };
  
  

  const handleAddAddress = async () => {
    const coords = await geocodeAddress(searchText);
    if (coords) {
      console.log('handleAddAddress - New Coordinates:', coords);

      const updatedCoordinates = [...coordinates, coords];
      console.log('handleAddAddress - Updated Coordinates:', updatedCoordinates);

      // Fetch optimized route
      const optimizedRoute = await getOptimizedRoute(updatedCoordinates);

      if (optimizedRoute) {
        console.log('handleAddAddress - Optimized Route:', optimizedRoute);
        setCoordinates(optimizedRoute.optimizedCoordinates);
        const durationInMinutes = optimizedRoute.totalDuration / 60;
        setTripLength(durationInMinutes);
      } else {
        addCoordinate(coords); // Fallback in case optimization fails
      }

      setSearchText('');
      setInputKey(Math.random().toString()); // Reset the input field by changing the key
    }
  };

  const handlePlaceSelect = (data: any, details: any) => {
    const address = data.description;
    setSearchText(address);
  };

  const handleClearSearch = () => {
    setSearchText('');
    setInputKey(Math.random().toString());
  };

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.duration}>Estimated Optimized Route Duration: {tripLength.toFixed(2)} Minutes</Text>
      <GooglePlacesAutocomplete
        key={inputKey} // Change the key to reset the input field
        placeholder="Enter address"
        onPress={handlePlaceSelect}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'en',
        }}
        textInputProps={{
          value: searchText,
          onChangeText: text => setSearchText(text),
        }}
        renderRightButton={() => (
          searchText ? (
            <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>X</Text>
            </TouchableOpacity>
          ) : <View></View>
        )}
        styles={{
          container: {
            flex: 0,
            position: 'absolute',
            top: 50,
            left: 10,
            right: 10,
            zIndex: 1,
          },
          listView: {
            backgroundColor: 'white',
          },
          textInputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
          },
          textInput: {
            flex: 1,
          },
        }}
      />
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        mapType="satellite"
      >
        {coordinates.map((coordinate, index) => (
          <Marker key={index} coordinate={coordinate} />
        ))}
        {coordinates.length > 1 && (
          <MapViewDirections
            origin={coordinates[0]}
            destination={coordinates[coordinates.length - 1]}
            waypoints={coordinates.slice(1, -1)}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={3}
            strokeColor="red"
            mode="DRIVING"
          />
        )}
      </MapView>
      <Button title="Add Address" onPress={handleAddAddress} color="#007BFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  clearButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  clearButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
  duration: {
  backgroundColor: 'transparent',
  
  }
});

export default MapScreen;