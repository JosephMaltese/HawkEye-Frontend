import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Touchable } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Surveys() {

    const router = useRouter();
    return(
        <View>
            <TouchableOpacity onPress={() => router.push('/home')}><Text>Home</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/createsurvey')}><Text>Create New Survey</Text></TouchableOpacity>

        </View>
    );
}

export default Surveys;