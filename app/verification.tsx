import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Config from './config.js';

const apiBaseURL = `${Config.API_BASE_URL}`;

export default function Verification() {
    const router = useRouter();
    const { email } = useLocalSearchParams();
    const [isVerified, setIsVerified] = useState(false);
    const [resent, setResent] = useState(false);
    const [cooldown, setCooldown] = useState(0);


    const handleResendLink = async () => {
        if (cooldown === 0) {
            try {
                await axios.post(`${apiBaseURL}/api/auth/send-verification-email`, { email });
                setResent(true);
                setCooldown(30);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCooldown(prev => prev > 0 ? prev - 1: 0);
        }, 1000);

        return () => clearInterval(timer);

    }, [cooldown]);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await axios.get(`${apiBaseURL}/api/auth/verify-status`, { params: { email } });
                if (response.data.isVerified) {
                    setIsVerified(true);
                    clearInterval(interval); // Stop the interval once verified
                }
            } catch (error) {
                console.error(error);
            }
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [email]);

    const handleCheckVerification = () => {
        if (isVerified) {
            router.push('/home');
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Image style={styles.icon} source={require('../assets/images/user2.png')}/>
                <Text style={styles.title}>User Account Verification</Text>
            </View>
            <Text style={styles.header}>Thanks for signing up!</Text>
            <Text style={styles.mainText}>{isVerified ? 'Your account has successfully been verified!': `An email has been sent to ${email}. Please verify your account by clicking the link sent to your email.`}</Text>
            <TouchableOpacity onPress={handleResendLink}><Text style={styles.link}>Didn't receive a code?</Text></TouchableOpacity>
            {resent && <Text style={styles.resentText}>The verification email has been re-sent!</Text>}
            
            <TouchableOpacity style={[styles.loginButton, isVerified ? styles.buttonVerified : styles.buttonUnverified]} onPress={handleCheckVerification} disabled={!isVerified}><Text style={styles.loginText}>Continue</Text></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    loginButton : {
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: 130,
        height: 50,
        justifyContent: "center",
    },
    buttonVerified: {
        backgroundColor: "#0000FF",

    },
    buttonUnverified: {
        backgroundColor: "rgb(220,220,220)",

    },
    loginText : {
        color: "white",
    }, 
    mainText: {
        margin: 10,
        fontSize: 14,
        marginBottom: 20,
        marginTop: 30,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
    },
    icon: {
        width: 50,
        height: 50,
        marginLeft: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'rgb(112,128,144)',
        width: '100%',
        height: 100,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginBottom: 20,
    },
    resentText: {
        marginBottom: 20,
    },

});