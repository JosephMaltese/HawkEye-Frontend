import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapScreen from './maps';
import AddressListScreen from './AddressListScreen';

const Tab = createBottomTabNavigator();

function MapTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Map" 
        component={MapScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Addresses" 
        component={AddressListScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MapTabs;