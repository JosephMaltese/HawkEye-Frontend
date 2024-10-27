

import React, { useContext } from 'react';
import { View, SafeAreaView, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { CoordinatesContext, Coordinate } from './maps/CoordinatesContext';

const AddressListScreen = () => {
  const context = useContext(CoordinatesContext);
  if (!context) {
    throw new Error('CoordinatesContext must be used within a CoordinatesProvider');
  }
  const { coordinates, deleteCoordinate } = context;

  const renderItem = ({ item, index }: { item: Coordinate, index: number }) => (
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        <Text style={styles.text}>{item.address || `${item.latitude}, ${item.longitude}`}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteCoordinate(index)}>
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={coordinates}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  item: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddressListScreen;









