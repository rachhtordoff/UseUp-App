import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AuthContext from '../Authentication/authContext';  // adjust the path
import { colors, fonts } from '../../styles';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import CategoryImage from '../utilities/ImageGetter';

const EditProductDetails = ({ route }) => {
    const { product } = route.params;
    const [productID, setProductID] = useState(product ? product.id : '');
    const [productName, setProductName] = useState(product ? product.name : '');
    const [productBrand, setProductBrand] = useState(product ? product.brand : '');
    const [productCategories, setProductCategories] = useState(product ? product.categories : '');
    const [productexpiry_date, setProductExpiryDate] =  useState(product ? product.expiry_date : '');
    const [productImageUrl, setProductImageUrl] = useState(product ? product.image_front_small_url : '');
    const [show, setShow] = useState(false);
    const navigation = useNavigation();
    const { token, user_id, getrefreshToken} = useContext(AuthContext);

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios'); // For iOS, we'll use the `show` state to hide/show the datepicker, hence we don't hide it when the date is changed
        if (selectedDate) { // When the user cancels the picker, `selectedDate` is undefined. So, we only update the state when there's a selected date
            setProductExpiryDate(selectedDate);
        }
    };
    const formatDate = (date) => {
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const getDateValue = () => {
        return productexpiry_date || new Date();
      };

    const getDisplayDate = () => {
        // if (productexpiry_date) {
        //   return productexpiry_date;
        // }
        return new Date().toDateString();
      };

      

    const saveChanges = async () => {
        const response = await fetch(`http://192.168.1.143:8010/product/${productID}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: productName,
                categories: productCategories,
                expiry_date: formatDate(productexpiry_date),
                image_url: productImageUrl,
                user_id: user_id,
            }),



        });
  
        if (response.status === 401) {
          access_token = await getrefreshToken();  // Refresh the token
    
          // Retry the fetch with the new token
          response = await fetch(`http://192.168.1.143:8010//${productID}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: productName,
                categories: productCategories,
                expiry_date:formatDate(productexpiry_date),
                image_url: productImageUrl,
                user_id: user_id,
            }),
          });
        }
  
  
        const fetchedProducts = await response.json();
        if (response.status !== 200) {
            console.log(data.message);
            
        } else {
          navigation.navigate('Products');
      }
    };

    return (
        <View style={styles.container}>
            <CategoryImage category={productCategories} />

            <Text>Name:</Text>
            <TextInput 
                value={productName} 
                onChangeText={setProductName} 
                style={styles.input} 
            />
                

                <Text>Category:</Text>
                <Picker
                    selectedValue={productCategories}
                    onValueChange={(itemValue) => setProductCategories(itemValue)}
                    style={styles.input}
                >
                    <Picker.Item label="Select a Category..." value="" />
                    <Picker.Item label="Bakery" value="Bakery" />
                    <Picker.Item label="Cupboard" value="Cupboard" />
                    <Picker.Item label="Dairy & Eggs" value="Dairy & Eggs" />
                    <Picker.Item label="Fish" value="Fish" />
                    <Picker.Item label="Frozen" value="Frozen" />
                    <Picker.Item label="Fruit & Veg" value="Fruit & Veg" />
                    <Picker.Item label="Meat" value="Meat" />
                    <Picker.Item label="Other" value="Other" />
                </Picker>


            <Text>Expiry Date</Text>



                <TouchableOpacity style={styles.Buttoncontainer} onPress={() => setShow(true)}>
                    <Text style={styles.buttonText}>{getDisplayDate()}</Text>
                </TouchableOpacity>

                {/* DateTimePicker */}
                {show && (
                <DateTimePicker
                    value={getDateValue()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChange}
                />
                )}
                {Platform.OS === 'ios' && <Button title="Done" onPress={() => setShow(false)} />}


                <TouchableOpacity style={styles.Buttoncontainer2} onPress={saveChanges}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    productImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5
    },
    textcontainer: {
        backgroundColor: '#ffffff',
        marginLeft: 50,
        marginBottom:10,
        fontFamily: fonts.primaryRegular,
        marginRight: 50,
      },
      Buttoncontainer: {
        marginLeft: 0,
        marginTop:10,
        fontFamily: fonts.primaryRegular,
        marginRight: 50,
        width: '50%',
        backgroundColor: colors.white,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10, // To give some space around the text, adjust as needed
    },
    Buttoncontainer2: {
        marginLeft: 100,
        fontFamily: fonts.primaryRegular,
        marginRight: 50,
        width: '50%',
        backgroundColor: colors.blue,
        borderRadius: 25,
        marginTop:20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10, // To give some space around the text, adjust as needed
    }

});

export default EditProductDetails;
