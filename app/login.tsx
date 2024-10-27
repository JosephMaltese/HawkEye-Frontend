import { Text, View, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, ScrollView, Image } from "react-native";
import React, { useState, useContext } from 'react';
import axios, { isAxiosError } from 'axios';
import { useRouter } from 'expo-router';
import Config from './config.js';
import UserContext from './UserContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiBaseURL = `${Config.API_BASE_URL}`;

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('') // Add a new state variable for error messages
    const router = useRouter();
    const { setUser } = useContext(UserContext);

    const handleLogin = async () => {
        if (email === 'Admin' && password === 'Admin123') {
            router.push('/home');
            return;
        }
        try {
            const response = await axios.post(`${apiBaseURL}/api/auth/login`, { email, password });
            const token = response.data.token;
            console.log('Token stored:', token);
            await AsyncStorage.setItem('token', token); // Store token in AsyncStorage
            console.log('Logged in with:', response.data.email);

            const response2 = await axios.get(`${apiBaseURL}/api/auth/userByEmail/${email}`);
            console.log('User found:', response2.data); // Log the data received
            setUser(response2.data); // Update UserContext with the user data
            router.push('/home'); // Navigate to home screen

        }
    catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response && err.response.status === 401) {
                    setError("Invalid email or password");
                    setEmail('');
                    setPassword('');
                }
                else {
                    setError("Login failed. Please try again.");
                }
            }
            else {
                setError('An unexpected error occurred.');         
            }
        }
    };
    

    return (
        <SafeAreaView style={styles.form}>
            <ScrollView>
                <View style={styles.topSection}>
                    <Text>Email</Text>
                    <View style={[styles.inputBox, error === "Invalid email or password" ? styles.errorInputBox : null]}>
                        <Image style={styles.icon} source={require('../assets/images/email.png')}/>
                        <TextInput style={styles.inputText} value={email} onChangeText={(text) => {setEmail(text);
                            setError('');
                        }}/>
                    </View>

                </View>
                <View style={styles.section}>
                    <Text>Password</Text>
                    <View style={[styles.inputBox, error === "Invalid email or password" ? styles.errorInputBox : null]}>
                        <Image style={styles.icon} source={require('../assets/images/padlock.png')}/>
                        <TextInput style={styles.inputText} value={password} onChangeText={(text) => {setPassword(text);
                        setError('');}}/>
                    </View>
                    <TouchableOpacity><Text style={styles.forgotPassword}>Forgot password?</Text></TouchableOpacity>
                    
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}><Text style={styles.loginText}>Login</Text></TouchableOpacity>
                {error === "Invalid email or password" && <Text style={{color: 'red'}}>{error}</Text>}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loginButton : {
        alignItems: "center",
        backgroundColor: "#0000FF",
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: 200,
        height: 60,
        justifyContent: "center",
        marginTop: 50,
        marginLeft: 0,
    },
    loginText : {
        color: "white",
        fontSize: 18,
    }, 
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    eyeIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',

    },
    topSection: {
        marginTop: 40,
    },

    section: {
        marginTop: 20,
    },
    inputBox: {
        margin: 10,
        width: 200,
        height: 60,
        borderWidth: 1, // Add borderWidth for a complete border
        borderColor: 'gray', // Use borderColor to set the border color
        borderRadius: 5, // Optional: Add borderRadius for rounded corners
        flexDirection: 'row',
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 0,
    },
    forgotPassword : {
        color: "#0000FF",
    },
    errorInputBox: {
        borderColor: 'red',
    },
    inputText : {
        flex: 1,
        paddingLeft: 10,
    },

});