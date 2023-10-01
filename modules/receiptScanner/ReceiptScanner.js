import React, { useRef, useState } from 'react';
import { View, Button, TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { colors, fonts } from '../../styles';
import { useNavigation } from '@react-navigation/native';

const ReceiptScanner = () => {
  const navigation = useNavigation();
  const camera = useRef(null);
  const [processing, setProcessing] = useState(false);

  const processRecognizedText = (data) => {
    // Assuming data contains the receipt information, process it accordingly
    const lineItems = data?.document?.inference?.pages?.[0]?.prediction?.line_items;
    const itemslist = [];
  
    for (let i = 0; i < lineItems.length - 1; i++) {
      const description = lineItems[i].description;
      const price = lineItems[i].unit_price; // This is just an assumption, adjust this accordingly.
  
      if (description && price) {
          itemslist.push({
              name: description,
              price: price
          });
      }
    }
    console.log(itemslist)
    setProcessing(false);
    navigation.navigate('Receipt Items', { items: itemslist });

  };

  const handleReceiptTaken = async (data) => {
    setProcessing(true);
    if (data.uri) {
      try {
        let formData = new FormData();
        formData.append('document', {
          uri: data.uri,
          type: 'image/jpeg',
          name: 'receipt.jpg',
        });

        const response = await fetch('https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Token daf8816dbfef5c3526ed84d140502469',
          },
          body: formData,
        });

        const jsonResponse = await response.json();
        console.log(jsonResponse);
        processRecognizedText(jsonResponse);

      } catch (error) {
        console.error('Error uploading receipt: ', error);
      }
    }
  };


  const styles = StyleSheet.create({
  
    subheadin:{
      fontSize:15,
      fontWeight: "600",
      color: colors.gray
    },
    title:{
      fontSize:25,
      color: colors.black,
      fontWeight: "800",
      paddingBottom:5
    },
    imageContainer: {
      width: "100%",
      height: "90%",
      alignItems: 'center',
      justifyContent: 'flex-end',
  },
  image: {
      width: "100%",
      height: "100%",
      opacity: 0.6,
      
  },
  whiteOverlay: {
      marginTop: 20,  // Adjust this value to your liking for the desired gap
      backgroundColor: '#ffffff',
      borderTopLeftRadius: 60,  // Adjust as needed
      borderTopRightRadius: 60, // Adjust as needed
      width: '100%',
      position: 'absolute',
      bottom: 0,
  },
    buttonlogin: {
      marginTop:40,
      marginBottom:40
    },
    bordered: {
      borderWidth: 0.5,
      borderColor: colors.lightGray,
      borderRadius: 20,
      paddingHorizontal: 20,
    },
  
      headerImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: 56, // set your desired height
      },
      textbox:{
          width:'80%',
  
      },
      headercontainer:{
          paddingTop:20
      },
      headertextcontainer:{
          marginLeft:55,
          marginRight:20
      },
      logincontainer:{
          paddingTop:10,
          paddingBottom:0
      },
      textcontainer: {
          backgroundColor: '#ffffff',
          marginLeft: 50,
          marginBottom:10,
          fontFamily: fonts.primaryRegular,
          marginRight: 50,
        },
        buttonText: {
          color: '#ffffff',
          fontSize: 16,
      },
        Buttoncontainer: {
          marginLeft: '20%',
          fontFamily: fonts.primaryRegular,
          marginRight: 50,
          width: '50%',
          color: '#ffffff',
          backgroundColor: colors.blue,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10, // To give some space around the text, adjust as needed
      },
        linkText: {
          marginLeft: 100,
          color: colors.blue, 
          textDecorationLine: 'underline',
      },
      container: {
          paddingTop:10,
          backgroundColor: '#ffffff',
          fontFamily: fonts.primaryRegular,
          height: '100%'
        },
    });
  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        ref={camera}
        style={{ flex: 1 }}
        captureAudio={false}
      >
      <View style={{ position: 'absolute', bottom: 20, width: '100%', alignItems: 'center' }}>
      {processing ? (
            <ActivityIndicator size="large" color="#0000ff" /> // Spinner for when processing
          ) : (
            <TouchableOpacity style={styles.Buttoncontainer} onPress={() => camera.current.takePictureAsync().then(handleReceiptTaken)}>
              <Text style={styles.buttonText}>Capture Receipt</Text>
            </TouchableOpacity>
          )}
      </View>
      </RNCamera>
    </View>
  );
}

export default ReceiptScanner;
