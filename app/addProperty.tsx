// import React, { useState } from 'react';
// import axios from 'axios';
// import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import Config from './config';
// import { useRouter } from 'expo-router';
// import { launchImageLibrary } from 'react-native-image-picker';

// const GOOGLE_MAPS_API_KEY = 'AIzaSyCmC1n7bbnW-oS5DDnK2p22HtVGFwvnzVM';
// const api_base_url = Config.API_BASE_URL;

// function AddProperty() {
//   const [address, setAddress] = useState('');
//   const [streetAddress, setStreetAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [province, setProvince] = useState('');
//   const [price, setPrice] = useState('');
//   const [bedrooms, setBedrooms] = useState('');
//   const [bathrooms, setBathrooms] = useState('');
//   const [squareFeet, setSquareFeet] = useState('');
//   const [lotSize, setLotSize] = useState('');
//   const [description, setDescription] = useState('');
//   const [images, setImages] = useState<string[]>([]);
//   const [inputKey, setInputKey] = useState(Math.random().toString());
//   const [searchText, setSearchText] = useState('');
//   const [postalCode, setPostalCode] = useState('');
//   const router = useRouter();


//   const selectImages = () => {
//     launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, (response) => {
//         if (response.assets) {
//             // Map the assets to their URIs, filtering out any undefined values
//             const selectedImages = response.assets
//                 .map(asset => asset.uri)
//                 .filter(uri => uri !== undefined) as string[];
            
//             setImages([...images, ...selectedImages]);
//         }
//     });
// };

//   const handlePlaceSelect = (data: any, details: any) => {
//     const addressComponents = details.address_components;

//     const getComponent = (types: string[]) => {
//         const component = addressComponents.find((c: any) =>
//             types.every(type => c.types.includes(type))
//         );
//         return component ? component.long_name : '';
//     };

//     setStreetAddress(getComponent(['street_number']) + ' ' + getComponent(['route']));
//     setCity(getComponent(['locality', 'political']));
//     setProvince(getComponent(['administrative_area_level_1', 'political']));
//     setPostalCode(getComponent(['postal_code'])); // Make sure you add this to your state
//     setAddress(data.description);
//     setSearchText(data.description);
// };


//   const handleClearSearch = () => {
//     setSearchText('');
//     setAddress('');
//     setInputKey(Math.random().toString()); // Reset the input field by changing the key
//   };

//   const handleSubmit = async () => {
//     if (!streetAddress || !city || !province || !postalCode || !price || !bedrooms || !bathrooms || !squareFeet || !lotSize) {
//         console.log('Please fill out all fields');
//         return;
//     }

//     const property = {
//         address: {
//             street: streetAddress.trim(),
//             city: city.trim(),
//             Province: province.trim(),
//             postalCode: postalCode.trim(),
//         },
//         price: price,
//         bedrooms: bedrooms,
//         bathrooms: bathrooms,
//         squareFeet: squareFeet,
//         lotSize: lotSize,
//         images: images,
//     };

//     try {
//         const response = await axios.post(`${api_base_url}/api/properties`, property);
//         console.log(response);
//         router.push('/home');
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error('Error response:', error.response?.data);
//             console.error('Error status:', error.response?.status);
//             console.error('Error headers:', error.response?.headers);
//         } else {
//             console.error('Unexpected error:', error);
//         }
//     }
//   };







//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <GooglePlacesAutocomplete
//     key={inputKey} 
//     placeholder="Enter address"
//     onPress={handlePlaceSelect}
//     query={{
//         key: GOOGLE_MAPS_API_KEY,
//         language: 'en',
//     }}
//     textInputProps={{
//         value: searchText,
//         placeholderTextColor: 'grey',
//         onChangeText: text => setSearchText(text),
//     }}
//     fetchDetails={true}  // Make sure this is set to true
//     styles={{
//         container: {
//             flex: 0,
//             marginBottom: 20,
//         },
//         listView: {
//             backgroundColor: 'white',
//         },
//         textInputContainer: {
//             flexDirection: 'row',
//             alignItems: 'center',
//         },
//         textInput: {
//             flex: 1,
//         },
//     }}
//   />


//       <ScrollView>

//         <View>
//             <Button title="Select Images" onPress={selectImages} />
//             {images.map((imageUri, index) => (
//                 <Image key={index} source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
//             ))}
//         </View>

//         <View style={styles.subcontainer2}>
//           <Text>Price</Text>
//           <TextInput
//             style={styles.input}
//             onChangeText={setPrice}
//             value={price}
//           />
//           <Text>Number of Bedrooms</Text>
//           <TextInput
//             style={styles.input}
//             onChangeText={setBedrooms}
//             value={bedrooms}
//           />
//           <Text>Number of Bathrooms</Text>
//           <TextInput
//             style={styles.input}
//             onChangeText={setBathrooms}
//             value={bathrooms}
//           />
//           <Text>Square Feet</Text>
//           <TextInput
//             style={styles.input}
//             onChangeText={setSquareFeet}
//             value={squareFeet}
//           />
//           <Text>Lot Size (square feet)</Text>
//           <TextInput
//             style={styles.input}
//             onChangeText={setLotSize}
//             value={lotSize}
//           />
//           <Text>Description</Text>
//           <TextInput
//             style={styles.descriptionInput}
//             onChangeText={setDescription}
//             value={description}
//             placeholder="Enter property description"
//             multiline={true}
//           />
//         </View>

//         <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
//           <Text style={{ color: 'white', fontSize: 16 }}>Add Property</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// export default AddProperty;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   input: {
//     height: 40,
//     width: 200,
//     margin: 12,
//     borderWidth: 1,
//   },
//   clearButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   clearButtonText: {
//     color: 'red',
//     fontWeight: 'bold',
//   },
//   searchText: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   subcontainer: {
//     top: 80,
//     display: 'flex',
//     alignItems: 'center',
//     padding: 20,
//     borderWidth: 2, // Set the border width
//     borderColor: 'black', // Set the border color
//     borderRadius: 10, // Optionally, set the border radius for rounded corners
//     backgroundColor: '#f5f5f5', // Background color for the box
//     width: 300,
//     margin: 'auto',
//   },
//   addressText: {
//     fontSize: 18,
//     marginBottom: 9,
//   },
//   descriptionInput: {
//     height: 200,
//     width: 350,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10, // Adds padding inside the text box
//     textAlignVertical: 'top', // Aligns text at the top of the box
//   },
//   subcontainer2: {
//     top: 70,
//     display: 'flex',
//     alignItems: 'center',
//     padding: 20,
//     width: 300,
//     margin: 'auto',
//   },
//   submitButton: {
//     top: 100,
//     display: 'flex',
//     alignItems: 'center',
//     padding: 20,
//     width: 300,
//     margin: 'auto',
//     backgroundColor: 'blue',
//     borderRadius: 10,
//     marginBottom: 150,
//   },
// });








import React, { useState } from 'react';
import axios from 'axios';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Config from './config';
import { useRouter } from 'expo-router';
import { launchImageLibrary } from 'react-native-image-picker';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCmC1n7bbnW-oS5DDnK2p22HtVGFwvnzVM';
const api_base_url = Config.API_BASE_URL;

function AddProperty() {
  const [address, setAddress] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [squareFeet, setSquareFeet] = useState('');
  const [lotSize, setLotSize] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [inputKey, setInputKey] = useState(Math.random().toString());
  const [searchText, setSearchText] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const router = useRouter();

  const selectImages = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, (response) => {
        if (response.assets) {
            const selectedImages = response.assets
                .map(asset => asset.uri)
                .filter(uri => uri !== undefined) as string[];
            
            setImages([...images, ...selectedImages]);
        }
    });
};

  const handlePlaceSelect = (data: any, details: any) => {
    const addressComponents = details.address_components;

    const getComponent = (types: string[]) => {
        const component = addressComponents.find((c: any) =>
            types.every(type => c.types.includes(type))
        );
        return component ? component.long_name : '';
    };

    setStreetAddress(getComponent(['street_number']) + ' ' + getComponent(['route']));
    setCity(getComponent(['locality', 'political']));
    setProvince(getComponent(['administrative_area_level_1', 'political']));
    setPostalCode(getComponent(['postal_code']));
    setAddress(data.description);
    setSearchText(data.description);
};

  const handleClearSearch = () => {
    setSearchText('');
    setAddress('');
    setInputKey(Math.random().toString());
  };

  const handleSubmit = async () => {
    if (!streetAddress || !city || !province || !postalCode || !price || !bedrooms || !bathrooms || !squareFeet || !lotSize) {
        console.log('Please fill out all fields');
        return;
    }

    const property = {
        address: {
            street: streetAddress.trim(),
            city: city.trim(),
            Province: province.trim(),
            postalCode: postalCode.trim(),
        },
        price: price,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        squareFeet: squareFeet,
        lotSize: lotSize,
        description: description,
    };

    const formData = new FormData();

    // Append property details as JSON
    formData.append('property', JSON.stringify(property));

    // Append images to formData
    images.forEach((imageUri, index) => {
        const imageFileName = imageUri.split('/').pop(); // Extract the file name

        // Fetch the file to get the Blob
        const file = {
            uri: imageUri,
            name: imageFileName,
            type: 'image/jpeg', // This can be dynamic
        };

        formData.append('images', file as any);  // Use `as any` to bypass TypeScript restrictions
    });

    try {
        const response = await axios.post(`${api_base_url}/api/properties`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response);
        router.push('/home');
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);
            console.error('Error headers:', error.response?.headers);
        } else {
            console.error('Unexpected error:', error);
        }
    }
};


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <GooglePlacesAutocomplete
    key={inputKey} 
    placeholder="Enter address"
    onPress={handlePlaceSelect}
    query={{
        key: GOOGLE_MAPS_API_KEY,
        language: 'en',
    }}
    textInputProps={{
        value: searchText,
        placeholderTextColor: 'grey',
        onChangeText: text => setSearchText(text),
    }}
    fetchDetails={true}
    styles={{
        container: {
            flex: 0,
            marginBottom: 20,
        },
        listView: {
            backgroundColor: 'white',
        },
        textInputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        textInput: {
            flex: 1,
        },
    }}
  />

      <ScrollView>
        <View>
            <Button title="Select Images" onPress={selectImages} />
            {images.map((imageUri, index) => (
                <Image key={index} source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
            ))}
        </View>

        <View style={styles.subcontainer2}>
          <Text>Price</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPrice}
            value={price}
          />
          <Text>Number of Bedrooms</Text>
          <TextInput
            style={styles.input}
            onChangeText={setBedrooms}
            value={bedrooms}
          />
          <Text>Number of Bathrooms</Text>
          <TextInput
            style={styles.input}
            onChangeText={setBathrooms}
            value={bathrooms}
          />
          <Text>Square Feet</Text>
          <TextInput
            style={styles.input}
            onChangeText={setSquareFeet}
            value={squareFeet}
          />
          <Text>Lot Size (square feet)</Text>
          <TextInput
            style={styles.input}
            onChangeText={setLotSize}
            value={lotSize}
          />
          <Text>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            onChangeText={setDescription}
            value={description}
            placeholder="Enter property description"
            multiline={true}
          />
        </View>

        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  subcontainer2: {
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  descriptionInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
});

export default AddProperty;
