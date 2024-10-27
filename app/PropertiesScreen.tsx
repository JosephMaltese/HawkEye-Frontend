import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Config from './config.js';
import UserContext from './UserContext.js';

const apiBaseURL = `${Config.API_BASE_URL}`;

interface Property {
    _id: string; // Unique identifier for each property
    address: {
      street: string,
      city: string,
      Province: string,
      postalCode: string,
    },
    price: number,
    bedrooms: number,
    bathrooms: number,
    squareFeet: number,
    lotSize: number,
    description: string,
    images: string[], // Array of image URLs
    realtorId: string, // Reference to a User (Realtor)
  };

export default function PropertiesScreen() {
    const router = useRouter();
    const [properties, setProperties] = useState<Property[]>([]);
    const { user, loading } = useContext(UserContext);  // Get loading state

    const getProperties = async () => {
        try {
            const response = await axios.get(`${apiBaseURL}/api/properties`);
            setProperties(response.data);
        } catch (error) {
            console.error('Failed to fetch properties:', error);
        }
    }

    useEffect(() => {
        if (user) {
            getProperties();
        }
    }, [user]);

    if (loading) {
        return (
            <SafeAreaView>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (!user) {
        return (
            <SafeAreaView>
                <Text>Error loading user data. Please try logging in again.</Text>
            </SafeAreaView>
        );
    }

    const renderPropertyCard = ({ item }: { item: Property }) => {
        const defaultImage = require('./images/defaultHouse.jpg');
        const propertyImage = item.images.length > 0 ? { uri: item.images[0] } : defaultImage;

        return (
            <TouchableOpacity 
                style={styles2.propertyCard} 
                onPress={() => router.push(`/PropertyDetailsScreen/${item._id}`)} // Navigate to property details page
            >
                <Image source={propertyImage} style={styles2.image} />
                <Text style={styles2.text}>{item.address.street}</Text>
                <Text style={styles2.text}>{item.address.city}, {item.address.Province}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/home')}>
                    <Ionicons name="arrow-back" size={30} style={{ marginLeft: 20, marginTop: 50 }} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={properties}
                renderItem={renderPropertyCard}
                keyExtractor={(item) => item._id} // Use street address as key
                contentContainerStyle={styles2.flatListContent}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: 0,
        backgroundColor: 'red',
        height: 110,
        top : -50,
        marginBottom: 0,
    },
});

const styles2 = StyleSheet.create({
    flatListContent: {
        padding: 10,
    },
    propertyCard: {
        width: '100%',
        height: 220,
        marginBottom: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 8,
    },
    text: {
        marginTop: 10,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
