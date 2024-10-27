import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import Config from '../config.js';

const apiBaseURL = `${Config.API_BASE_URL}`;

interface Property {
    id: string;
    address: {
        street: string;
        city: string;
        Province: string;
        postalCode: string;
    };
    price: number;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    lotSize: number;
    description: string;
    images: string[];
    realtorId: string;
}

export default function PropertyDetailsScreen() {
    const { _id } = useLocalSearchParams<{ _id: string }>();
console.log('_id: ', _id);
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                console.log(_id)
                const response = await axios.get<Property>(`${apiBaseURL}/api/properties/${_id}`);
                setProperty(response.data);
            } catch (error) {
                console.error('Failed to fetch property details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [_id]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!property) {
        return <Text>Error loading property details.</Text>;
    }

    const defaultImage = require('../images/defaultHouse.jpg');
    const propertyImages = property.images.length > 0 
        ? property.images 
        : [defaultImage.uri]; // Ensure you provide a URI for default image if needed

    // return (
    //     <View style={styles.container}>
    //         <FlatList
    //             data={propertyImages}
    //             keyExtractor={(item, index) => index.toString()} // Use index as key
    //             renderItem={({ item }) => (
    //                 <Image source={{ uri: item }} style={styles.image} />
    //             )}
    //         />
    //         <Text style={styles.title}>{property.address.street}</Text>
    //         <Text>{property.address.city}, {property.address.Province}</Text>
    //         <Text>Price: ${property.price}</Text>
    //         <Text>Bedrooms: {property.bedrooms}</Text>
    //         <Text>Bathrooms: {property.bathrooms}</Text>
    //         <Text>Square Feet: {property.squareFeet}</Text>
    //         <Text>Lot Size: {property.lotSize}</Text>
    //         <Text>Description: {property.description}</Text>
    //     </View>
    // );

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{property.address.street}</Text>
                <Text style={styles.subtitle}>{property.address.city}, {property.address.Province}</Text>
            </View>
            <View>
                <Image
                src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/v4jygrt7far-18%3A838?alt=media&token=a631489d-c327-4845-9c09-a79517e5953e"
                alt="Not Found"
                style={styles.frame83}
                />
            </View>






            <View style={styles.Frame810}>
                <View style={styles.Frame89}>
                    <View style={styles.Rectangle25} />
                        <View style={styles.Frame88}>
                            <View style={styles.Frame85}>
                            <Text style={styles.NaturalHouse1}>Natural House</Text>
                            <View style={styles.Frame84}>
                                <Image
                                style={styles.Frame49}
                                source={{
                                    uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/v4jygrt7far-18%3A25?alt=media&token=341788cb-2b99-4e49-bcab-1f4a810f2846",
                                }}
                                />
                                <Text style={styles.MalangIndonesia}>Malang, Indonesia</Text>
                            </View>
                            </View>
                            <View style={styles.Frame87}>
                            <Text style={styles._599000}>$599,000</Text>
                            <View style={styles.Frame86}>
                                <Image
                                style={styles.Star1}
                                source={{
                                    uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/v4jygrt7far-18%3A28?alt=media&token=0b508f55-fd09-4cf7-ac8a-35a1042631b6",
                                }}
                                />
                                <Text style={styles.hi}>5.0 (67)</Text>
                            </View>
                            </View>
                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'red',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        color: 'white',
        marginTop: 0,
        marginBottom: 0,
    },
    subtitle: {
        fontSize: 16,
        marginVertical: 10,
        textAlign: 'center',
        color: 'white',
        marginTop: 0,
    },
    frame83: {
        width: "100%",
        height: 38,
        marginTop: 200,
    },
    Frame810: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: 250,
        width: 335,
        height: 112,
        padding: 14,
        borderRadius: 25,
        boxSizing: "border-box",
        backgroundColor: "rgba(255,255,255,1)",
      },
      NaturalHouse1: {
        marginTop: 0,
        top: -120,
        marginRight: 3,
        color: "rgba(0,0,0,1)",
        fontSize: "16px",
        lineHeight: "250%",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        fontWeight: "700",
      },
});






