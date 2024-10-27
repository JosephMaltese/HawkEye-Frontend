import React, {useContext} from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import UserContext from './UserContext.js';

export default function ProfileScreen() {
    const router = useRouter(); 
    const { logout } = useContext(UserContext);
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity onPress={() => logout()} style={styles.logOutButton}><Text style={styles.logOutText}>Log Out</Text></TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    logOutButton : {
        alignItems: "center",
        backgroundColor: "red",
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: 150,
        height: 50,
        justifyContent: "center",
        marginTop: 50,
        marginLeft: 0,
    },
    logOutText: {
        color: "white",
        fontSize: 18,
    }
});