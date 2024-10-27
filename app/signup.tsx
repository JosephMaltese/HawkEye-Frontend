import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Image } from "react-native";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'expo-router';
import Config from './config.js';

const apiBaseURL = `${Config.API_BASE_URL}`;

export default function Signup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('') // Add a new state variable for error messages
    const [hidePassword, setHidePassword] = useState(true) // Add a new state variable for hiding the password

    const router = useRouter();

    const handleSignup = async () => {
        try {
            const response = await axios.post(`${apiBaseURL}/api/auth/register`, { email, password, firstName, lastName });
            console.log('Signed up with:', response.data.email);
            // Navigate to the verification screen
            router.push({pathname: '/verification', params: { email: email}});
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response && err.response.status === 400) {
                    setError("An account with this email already exists");

                }
                else {
                    setError("Login failed. Please try again.");
                }
            }
            else {
                setError('An unexpected error occurred.');
            }
            
        }
    }

    const handleEyePress = () => {
        setHidePassword(!hidePassword);
    }

    return (
        <SafeAreaView style={styles.form}>
            <ScrollView>
                <View style={styles.topSection}>
                    <Text>First Name</Text>
                    <View style={styles.inputBox}>
                        <Image style={styles.icon} source={require('../assets/images/user.png')}/> 
                        <TextInput style={styles.inputText} value={firstName} onChangeText={setFirstName}/>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text>Last Name</Text>
                    <View style={styles.inputBox}>
                        <Image style={styles.icon} source={require('../assets/images/user.png')}/> 
                        <TextInput style={styles.inputText} value={lastName} onChangeText={setLastName}/>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text>Email</Text>
                    <View style={[styles.inputBox, error === "An account with this email already exists" ? styles.errorInputBox : null]}>
                        <Image style={styles.icon} source={require('../assets/images/email.png')}/>
                        <TextInput style={styles.inputText} value={email} onChangeText={(text) => {setEmail(text);
                        setError(''); // Clear the error message when the email changes
                        }}/>
                    </View>
                </View>
                {error === "An account with this email already exists" && <Text style={{color: 'red'}}>{error}</Text>}

                <View style={styles.section}>
                    <Text>Password</Text>
                    <View style={styles.inputBox}>
                        <Image style={styles.icon} source={require('../assets/images/padlock.png')}/>
                        <TextInput secureTextEntry={hidePassword ? true : false} style={styles.inputText} value={password} onChangeText={setPassword}/>
                        <TouchableOpacity onPress={handleEyePress}><Image style={styles.eyeIcon} source={hidePassword ? require('../assets/images/hidden.png') : require('../assets/images/eye.png')}/></TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.signInButton} onPress={handleSignup}><Text style={styles.signInText}>Sign Up</Text></TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputBox: {
        margin: 10,
        width: 200,
        height: 60,
        borderWidth: 1, // Add borderWidth for a complete border
        borderColor: 'gray', // Use borderColor to set the border color
        borderRadius: 5, // Optional: Add borderRadius for rounded corners
        flexDirection: 'row',
        flex: 1,
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 0,
    },
    errorInputBox: {
        borderColor: 'red', // Change the border color to red when there is an error

    },
    signInButton : {
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
    signInText : {
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

    inputText: {
        flex: 1,
        paddingLeft: 10,
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
    });