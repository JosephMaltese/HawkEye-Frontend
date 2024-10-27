/* To run code,
for running frontend on expo, use npx expo start
for running backend, use node server.js
for interactivity between frontend and backend, use ngrok http 5000
*/


import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={require('./logo.png')} style={styles.logo} />
      <Text style={styles.mainHeader}>Welcome!</Text>
      <View>
        
        <TouchableOpacity style={styles.button1} onPress={() => router.push('/login')}><Text style={styles.buttonText1}>Log In</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => router.push('/signup')}><Text style={styles.buttonText2}>Sign Up</Text></TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  button1: {
    alignItems: "center",
    backgroundColor: "#0000FF",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    color: "white",
    width: 130,
    height: 50,
    justifyContent: "center",
  },
  button2: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#0000FF",
    color: "#0000FF",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    height: 50,
    justifyContent: "center",
  },
  buttonText1 : {
    color: "white",
    fontSize: 18,
  },
  buttonText2 : {
    color: "#0000FF",
    fontSize: 18,

  },
  logo : {
    width:300,
    height: 90,

  },
  mainHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 110,
  },

})
