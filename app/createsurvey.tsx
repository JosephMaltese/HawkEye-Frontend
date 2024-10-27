import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Touchable } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

function CreateSurvey() {

    const router = useRouter();
    return(
        <View>
            <Text>Number of Questions</Text>

        </View>
    );
}

export default CreateSurvey;