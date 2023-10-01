import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../Authentication/authContext';  // adjust the path

const WasteScreen = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const { token, user_id, getrefreshToken } = useContext(AuthContext);


  const updateProduct = async (id, waste_level ) => {

    // http://192.168.1.143:8010/ for ios
    // http://10.0.2.2:8010/ for android emulator
    // ip address aka http://192.168.1.143:8010/ for actual android app
      const response = await fetch(`http://192.168.1.143:8010/product/${id}`, {
          method: 'PUT',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
                'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            waste_level: waste_level,
            status: "waste"
        }),
      });


      if (response.status === 401) {
        access_token = await getrefreshToken();  // Refresh the token
  
        // Retry the fetch with the new token
        response = await fetch(`http://192.168.1.143:8010/product/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              waste_level: waste_level,
              status: "waste"
            }),
        });
      }


      const fetchedProducts = await response.json();
      if (response.status == 200) {
        navigation.navigate('Products');
      } else {
        console.error("Product not binned");
    }
  };


  const handleBinIt = (portion) => {
    // Assuming you have a product ID ready, replace "YOUR_PRODUCT_ID" with your product ID
    // You can also use the portion to determine the amount wasted and process accordingly
    updateProduct(id, portion)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>How much did you waste?</Text>

      <TouchableOpacity onPress={() => handleBinIt("1/4")} style={styles.optionButton}>
        <Text>1/4</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleBinIt("2/4")} style={styles.optionButton}>
        <Text>2/4</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleBinIt("3/4")} style={styles.optionButton}>
        <Text>3/4</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleBinIt("All")} style={styles.optionButton}>
        <Text>All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  optionButton: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center'
  }
});

export default WasteScreen;
