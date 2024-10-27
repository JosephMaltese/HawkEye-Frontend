// import React, { useState, useEffect, useContext } from 'react';
// import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator, TextInput } from "react-native";
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter } from 'expo-router';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import Config from './config.js';
// import UserContext from './UserContext.js';

// const apiBaseURL = `${Config.API_BASE_URL}`;

// interface Property {
//     _id: string; // Unique identifier for each property
//     address: {
//       street: string,
//       city: string,
//       Province: string,
//       postalCode: string,
//     },
//     price: number,
//     bedrooms: number,
//     bathrooms: number,
//     squareFeet: number,
//     lotSize: number,
//     description: string,
//     images: string[], // Array of image URLs
//     realtorId: string, // Reference to a User (Realtor)
//   };

// export default function HomeScreen() {
//     const router = useRouter();
//     const [properties, setProperties] = useState<Property[]>([]);
//     const [firstNProperties, setFirstNProperties] = useState<Property[]>([]);
//     const { user, loading } = useContext(UserContext);  // Get loading state

//     const getProperties = async () => {
//         try {
//             const response = await axios.get(`${apiBaseURL}/api/properties`);
//             setProperties(response.data);
//             setFirstNProperties(response.data.slice(0, 5)); 
//         } catch (error) {
//             console.error('Failed to fetch properties:', error);
//         }
//     }

//     useEffect(() => {
//         if (user) {
//             getProperties();
//         }
//     }, [user]);

//     if (loading) {
//         return (
//             <SafeAreaView>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </SafeAreaView>
//         );
//     }

//     if (!user) {
//         return (
//             <SafeAreaView>
//                 <Text>Error loading user data. Please try logging in again.</Text>
//             </SafeAreaView>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.container}>
//                 <View style={styles.header}>
//                     <View style= {{ display: 'flex', flexDirection:'row', alignItems:'center'}}>
//                         <TouchableOpacity onPress={() => router.push('/ProfileScreen')} style={{marginRight: 10}}>
//                             <Ionicons name="person-circle-outline" size={45} />
//                         </TouchableOpacity>

//                         <View>
//                             <Text style={{fontSize: 18, fontWeight: 'bold'}}>Hello, {user.firstName}</Text>
//                             <Text style={{fontSize: 12}}>Let's get to work!</Text>
//                         </View>
//                     </View>

//                     <View style={{ backgroundColor:'lightgrey', marginRight: 15, width: 30, height: 30, display:'flex', alignItems:'center', justifyContent:'center', borderRadius: '50%' }}>
//                         <TouchableOpacity onPress={() => router.push('/NotificationsScreen')}>
//                             <Ionicons name="notifications-outline" size={20}  />
//                         </TouchableOpacity>

//                     </View>
//                 </View>

//                 <View style={styles.searchbar}>
//                     <Ionicons name="search-outline" size={30} style={styles.searchIcon}/>
//                     <TextInput placeholder="Search" style={styles.searchInput} placeholderTextColor= "white" />

//                 </View>


//                 <View style={styles.navbar}>
//                     <TouchableOpacity style={styles.navCard} onPress={() => {}}><Text>Tasks</Text></TouchableOpacity>
//                     <TouchableOpacity style={styles.navCard}><Text>Maps</Text></TouchableOpacity>
//                     <TouchableOpacity style={styles.navCard}><Text>Calendar</Text></TouchableOpacity>
//                     <TouchableOpacity style={styles.navCard}><Text>Chatbot</Text></TouchableOpacity>

//                 </View>


//                 {/* <TouchableOpacity onPress={() => router.push('/surveys')}><Text>Surveys</Text></TouchableOpacity> */}

//                 <View style={styles2.propertySection}>
//                     <View style={styles2.header}>
//                         <Text style={styles.title}>Properties</Text>
//                         <View style={styles2.plusandview}>
//                             <TouchableOpacity onPress={() => router.push('/addProperty')}><Ionicons style={styles2.add} name="add-outline"></Ionicons></TouchableOpacity>
//                             <TouchableOpacity onPress={() => router.push('/PropertiesScreen')}><Text style={styles2.smallText}>View All</Text></TouchableOpacity>
//                         </View>
//                     </View>
                    
//                     <ScrollView horizontal={true} style={styles2.scrollView}>
//                         {firstNProperties.map((property: Property, index) => (
//                             <TouchableOpacity key={index} style={styles2.propertyCard} onPress={() => {
//                                 console.log('property._id: ', property._id);
//                                 router.push(`/PropertyDetailsScreen/${property._id}`);
//                             }}>
//                                 <Image source={require('./images/defaultHouse.jpg')} style={styles2.image} />
//                                 <Text style={styles2.text}>{property.address.street}</Text>
//                                 <Text style={styles2.text}>{property.address.city}, {property.address.Province}</Text>
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>
//                 </View>
//                 <Text>Hi</Text>


//                 <View style={styles.selector}>
//                     <Text>Selector</Text>

//                 </View>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginLeft: 25,
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '90%',
//         marginTop: 0,
//         height: 70,
//         alignItems: 'center',
//     },
//     searchbar: {
//         position: 'relative',
//         width: 350,
//         height: 45,
//         marginTop: 5,
//         marginBottom: 20,
//     },
//     searchIcon: {
//         position: 'absolute',
//         left: 10,
//         top: 7,
//         zIndex: 1,
//         color: 'white',
//       },
    
//       searchInput: {
//         height: '100%',
//         borderWidth: 1,
//         borderRadius: 10,
//         paddingLeft: 50, // Adjust padding to accommodate the icon
//         fontSize: 16,
//         backgroundColor: 'red',
//         borderColor: 'transparent',
//         color: 'white',
//       },
//       navbar: {
//         display: 'flex',
//         flexDirection: 'row',
//         width: 350,
//         justifyContent: 'space-between',
//         marginBottom: 20,
//       },
//       navCard: {
//         width: 80,
//         height: 35,
//         backgroundColor: 'lightgrey',
//         margin: 'auto',
//         borderRadius: 10,
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
    
//     selector: {
//         width: 350,
//         height: 150,
//         marginBottom: 20,
//         backgroundColor: 'red',
//     },
// });

// const styles2 = StyleSheet.create({
//     scrollView: {
//       padding: 10,
//     },
//     propertySection: {
//         backgroundColor: '#F5F5F5',
//         paddingTop: 10,
//         paddingBottom: 10,
//         marginBottom: 0,
//     },
//     propertyCard: {
//       width: 200,
//       height: 220,
//       marginRight: 10,
//       backgroundColor: '#f8f8f8',
//       borderRadius: 8,
//       padding: 10,
//       alignItems: 'center',
//     },
//     image: {
//       width: 150,
//       height: 150,
//       borderRadius: 8,
//     },
//     text: {
//       marginTop: 10,
//       fontSize: 12,
//       fontWeight: 'bold',
//     },
//     header: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     smallText: {
//         fontSize: 14,
//         color: 'blue',
//         marginRight: 10,
//         marginTop: 7,
//     },
//     plusandview: {
//         display: 'flex',
//         flexDirection: 'row',
//         width: 100,
//         justifyContent: 'space-between',
//     },
//     add: {
//         fontSize: 18,
//         color: 'blue',
//         marginRight: 20,
//         marginTop: 7,
//     }
//   });







import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator, TextInput } from "react-native";
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

export default function HomeScreen() {
    const router = useRouter();
    const [properties, setProperties] = useState<Property[]>([]);
    const [firstNProperties, setFirstNProperties] = useState<Property[]>([]);
    const { user, loading } = useContext(UserContext);  // Get loading state

    const getProperties = async () => {
        try {
            const response = await axios.get(`${apiBaseURL}/api/properties`);
            setProperties(response.data);
            setFirstNProperties(response.data.slice(0, 5)); 
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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <View style={styles.header}>
                    <View style={{ display: 'flex', flexDirection:'row', alignItems:'center' }}>
                        <TouchableOpacity onPress={() => router.push('/ProfileScreen')} style={{marginRight: 10}}>
                            <Ionicons name="person-circle-outline" size={45} />
                        </TouchableOpacity>

                        <View>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Hello, {user.firstName}</Text>
                            <Text style={{fontSize: 12}}>Let's get to work!</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor:'lightgrey', marginRight: 15, width: 30, height: 30, display:'flex', alignItems:'center', justifyContent:'center', borderRadius: '50%' }}>
                        <TouchableOpacity onPress={() => router.push('/NotificationsScreen')}>
                            <Ionicons name="notifications-outline" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.searchbar}>
                    <Ionicons name="search-outline" size={30} style={styles.searchIcon}/>
                    <TextInput placeholder="Search" style={styles.searchInput} placeholderTextColor="white" />
                </View>

                <View style={styles.navbar}>
                    <TouchableOpacity style={styles.navCard} onPress={() => {}}><Text>Tasks</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.navCard} onPress={() => {router.push('/maps')}}><Text>Maps</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.navCard}><Text>Calendar</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.navCard}><Text>Chatbot</Text></TouchableOpacity>
                </View>

                <View style={styles2.propertySection}>
                    <View style={styles2.header}>
                        <Text style={styles.title}>Properties</Text>
                        <View style={styles2.plusandview}>
                            <TouchableOpacity onPress={() => router.push('/addProperty')}><Ionicons style={styles2.add} name="add-outline" /></TouchableOpacity>
                            <TouchableOpacity onPress={() => router.push('/PropertiesScreen')}><Text style={styles2.smallText}>View All</Text></TouchableOpacity>
                        </View>
                    </View>
                    
                    <ScrollView horizontal={true} style={styles2.scrollView}>
                        {firstNProperties.map((property: Property, index) => (
                            <TouchableOpacity key={index} style={styles2.propertyCard} onPress={() => {
                                console.log('property._id: ', property._id);
                                router.push(`/PropertyDetailsScreen/${property._id}`);
                            }}>
                                <Image source={require('./images/defaultHouse.jpg')} style={styles2.image} />
                                <Text style={styles2.text}>{property.address.street}</Text>
                                <Text style={styles2.text}>{property.address.city}, {property.address.Province}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.selector}>
                    <TouchableOpacity style={styles.selectorCard}><Text style={styles.selectorCardText}>New Tasks</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.selectorCard}><Text style={styles.selectorCardText}>Appointments</Text></TouchableOpacity>
                </View>
                <View style={styles.selector}>
                    <TouchableOpacity style={styles.selectorCard}><Text style={styles.selectorCardText}>HOT Leads</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.selectorCard}><Text style={styles.selectorCardText}>Performance Tracking</Text></TouchableOpacity>
                </View>


                <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.homeButton}>
                        <Ionicons name="home-outline" size={20} />
                        <Text style={{color: 'white', marginLeft: 5}}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.searchButton}>
                        <Ionicons name="search-outline" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profileButton}>
                        <Ionicons name="person-circle-outline" size={30} />
                    </TouchableOpacity>


                </View>


            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 25,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 0,
        height: 70,
        alignItems: 'center',
        margin: 'auto',
        marginBottom: 0,
    },
    searchbar: {
        position: 'relative',
        width: 350,
        height: 45,
        margin: 'auto',
        marginTop: 5,
        marginBottom: 20,
    },
    searchIcon: {
        position: 'absolute',
        left: 10,
        top: 7,
        zIndex: 1,
        color: 'white',
    },
    searchInput: {
        height: '100%',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 50, // Adjust padding to accommodate the icon
        fontSize: 16,
        backgroundColor: 'red',
        borderColor: 'transparent',
        color: 'white',
    },
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        width: 350,
        justifyContent: 'space-between',
        margin: 'auto',
        marginBottom: 20,
        marginTop: 0,
    },
    navCard: {
        width: 80,
        height: 35,
        backgroundColor: 'lightgrey',
        margin: 'auto',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selector: {
        width: 350,
        height: 100,
        marginBottom: 0,
        margin: 'auto',
        marginTop: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selectorCard: {
        width: 165,
        height: 87,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectorCardText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    bottomNav: {
        width: 350,
        height: 50,
        margin: 'auto',
        marginTop: 20,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff', // Make sure the background color is set to see the shadow clearly
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 10 }, // Increased shadow offset to make it more visible
        shadowOpacity: 0.3, // Increased shadow opacity
        shadowRadius: 10, // Increased shadow blur radius
        elevation: 8, // Higher elevation for Android shadow
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    homeButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: 100,
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 15,
        height: 30,

    },
    searchButton: {

    },
    profileButton: {

    },
});

const styles2 = StyleSheet.create({
    scrollView: {
        padding: 10,
    },
    propertySection: {
        backgroundColor: '#F5F5F5',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 0,
    },
    propertyCard: {
        width: 200,
        height: 220,
        marginRight: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
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
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    smallText: {
        fontSize: 14,
        color: 'blue',
        marginRight: 10,
        marginTop: 7,
    },
    plusandview: {
        display: 'flex',
        flexDirection: 'row',
        width: 100,
        justifyContent: 'space-between',
        marginRight: 15,
    },
    add: {
        fontSize: 18,
        color: 'blue',
        marginRight: 20,
        marginTop: 7,
    },
});
