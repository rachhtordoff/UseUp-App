import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import { ListItem, Avatar, Card, withTheme } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../Authentication/authContext';  // adjust the path
import { useFocusEffect } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import CategoryImage from '../utilities/ImageGetter';
import { colors, fonts } from '../../styles';

const ExpiredProducts = () => {
  const [expiredproducts, setExpiredProducts] = useState([]);  // Use state for products
  const { token, user_id, getrefreshToken} = useContext(AuthContext);

  const fetchProducts = async () => {
    const response = await fetch(`http://192.168.1.143:8010/expired-products/${user_id}`, {
      method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      if (response.status === 401) {
        access_token = await getrefreshToken();  // Refresh the token
  
        // Retry the fetch with the new token
        response = await fetch(`http://192.168.1.143:8010/products/${user_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });
      }


      const fetchedProducts = await response.json();
      console.log(fetchedProducts)
      if (Array.isArray(fetchedProducts)) {
        setExpiredProducts(fetchedProducts); // Update the products state with the fetched products
      } else {
        console.error("API did not return an array");
    }
  };

  const handleRemoveAction = (productId) => {
    setCurrentProductId(productId); // Set the current product id
    setModalVisible(true); // Show the modal
  };



  const copyProduct = async (productId) => {
    try {
      let url = `http://192.168.1.143:8010/copy_product-shopping/${productId}`;
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });


      if (response.status === 401) {
        access_token = await getrefreshToken();  // Refresh the token
  
        // Retry the fetch with the new token
        response = await fetch(`http://192.168.1.143:8010/copy_product-shopping/${productId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });
      }


      const jsonResponse = await response.json();
      console.log(jsonResponse)
      if (response.status == 200) {
        fetchProducts();
      } else {
        console.error('Error copying product:', jsonResponse.message);
      }
    
    } catch (error) {
        console.error('Error copying product:', error);
    }
    }   

  useFocusEffect(
    React.useCallback(() => {
        fetchProducts();

        return () => {
            // You can perform cleanup tasks here if needed when the screen is unfocused.
            // This is equivalent to the componentWillUnmount lifecycle method.
        };
    }, [])
);
  const styles = StyleSheet.create({
    productImage: {
        width: '20%',
        height: 50,
        resizeMode: 'contain',
        marginBottom: 20
    },
    rightAction: {
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginTop:15,
      maxHeight:'95%',
      maxWidth:'92%',
      marginRight:'3.5%',
      color: colors.white
  
    },
    liststyle:{
        paddingTop:0,
        marginTop:0
    },
    cardStyle: {
      height:90,
      width: '90%', // Adjust width as per your requirement
      alignSelf: 'center', // This will center the card horizontally
    },
    rightActionText: {
      marginLeft:'60%',
      fontSize:18,
      fontWeight:'800',
      color: colors.white
    },
    leftAction: {
      backgroundColor: colors.primaryDark,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginTop:15,
      maxHeight:'95%',
      maxWidth:'93%',
      marginLeft:'3.5%',
      color: colors.white
  
    },
    leftActionText: {
      marginRight:'65%',
      fontSize:18,
      fontWeight:'800',
      color: colors.white
  
    }
});

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{height:540}}>
{Array.isArray(expiredproducts) && expiredproducts.map(item => (
              <Swipeable
              key={item.id}
              onSwipeableLeftOpen={() => copyProduct(item.id)}  // <-- Add this line
              onSwipeableRightOpen={() => handleRemoveAction(item.id)}  // <-- Add this line
              renderRightActions={() => (
                <View style={styles.rightAction}>
                  <TouchableOpacity onPress={() => {
                    // Logic to add item to inventory
                  }}>
                    <Text style={styles.rightActionText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
              renderLeftActions={() => (
                <View style={styles.leftAction}>
                  <TouchableOpacity onPress={() => {
                    // Logic to add item to inventory
                  }}>
                    <Text style={styles.leftActionText}>Shopping</Text>
                  </TouchableOpacity>
                </View>
              )}
            >
        <Card key={item.id} containerStyle={styles.cardStyle} style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ListItem containerStyle={styles.liststyle}>
          <CategoryImage category={item.categories} />
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>Expires: {item.expiry_date}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </Card>
        </Swipeable>
      ))}
    </ScrollView>
  );
};

export default ExpiredProducts;
