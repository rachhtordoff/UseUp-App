import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AuthContext from '../Authentication/authContext';  // adjust the path
import { colors, fonts } from '../../styles';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import DatePicker from 'react-native-neat-date-picker';

const ProductDetails = ({ route }) => {
    const { product } =  route.params || {};
    const [productName, setProductName] = useState(product ? product.name : '');
    const [productBrand, setProductBrand] = useState(product ? product.brand : '');
    const [productCategories, setProductCategories] = useState(product ? product.categories : '');
    const [productexpiry_date, setProductExpiryDate] = useState(product && product.expiry_date ? new Date(product.expiry_date) : null);
    const [productImageUrl, setProductImageUrl] = useState(product ? product.image_front_small_url : '');
    const [productPrice, setProductPrice] = useState(product ? product.price : '');
    const categoriesData = [
        { label: "Select a Category...", value: "" },
        { label: "Bakery", value: "Bakery" },
        { label: "Cupboard", value: "Cupboard" },
        { label: "Dairy & Eggs", value: "Dairy & Eggs" },
        { label: "Fish", value: "Fish" },
        { label: "Frozen", value: "Frozen" },
        { label: "Fruit & Veg", value: "Fruit & Veg" },
        { label: "Meat", value: "Meat" },
        { label: "Other", value: "Other" },
    ];

    const [show, setShow] = useState(false);
    const navigation = useNavigation();
    const { token, user_id, getrefreshToken} = useContext(AuthContext);

    const [showDatePicker, setShowDatePicker] = useState(false);

    const openDatePicker = () => {
        setShowDatePicker(true);
    }

    const onCancel = () => {
        setShowDatePicker(false);
    }

    const onConfirm = (date) => {
        setShowDatePicker(false);
        if (date && date.dateString) {
            setProductExpiryDate(new Date(date.dateString));
        } else {
            console.error("Invalid date object received in onConfirm:", date);
        }
    };

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios'); // For iOS, we'll use the `show` state to hide/show the datepicker, hence we don't hide it when the date is changed
        if (selectedDate) { // When the user cancels the picker, `selectedDate` is undefined. So, we only update the state when there's a selected date
            setProductExpiryDate(selectedDate);
        }
    };

    const formatDate = (date) => {
        
        if (date instanceof Date) {
            const day = ("0" + date.getDate()).slice(-2);
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;  // Corrected variable names
        } else {
            console.error("Provided date is not a Date object:", date);
            return "";
        }
    };

      const getDisplayDate = () => {
        if (productexpiry_date instanceof Date) {
            return formatDate(productexpiry_date);
        }
        return new Date().toDateString();
    };

    const saveChanges = async () => {
        const response = await fetch(`http://192.168.1.143:8010/products`, {
            method: 'POST',
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
                status: "pantry/fridge"
            }),
        });
        if (response.status === 401) {
          access_token = await getrefreshToken();  // Refresh the token
          // Retry the fetch with the new token
          response = await fetch(`http://192.168.1.143:8010/products`, {
            method: 'POST',
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
                status: "pantry/fridge"
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
                {
                    productImageUrl && 
                    <Image source={{ uri: productImageUrl }} style={styles.productImage} />
                    }
                <TextInput 
                    value={productName} 
                    placeholderTextColor='black'
                    onChangeText={setProductName} 
                    style={styles.input} 
                    placeholder='Name'
                />
                <TextInput 
                    value={String(productPrice)} 
                    onChangeText={(text) => {
                    // Check if the input text is empty, a number, or a float before updating
                    if (text === '' || !isNaN(text)) {
                        setProductPrice(text);
                    }
                    }}
                    placeholderTextColor='black'
                    keyboardType="decimal-pad"
                    style={styles.input} 
                    placeholder='Price'
                />
               
               <Dropdown
                style={styles.dropdown}
                containerStyle={styles.shadow}
                data={categoriesData}
                labelField="label"
                valueField="value"
                label="Category"
                placeholder="Select a Category..."
                value={productCategories}
                onChange={item => {
                    setProductCategories(item.value);
                }}
              />
                <Text>Expiry Date</Text>
                <TouchableOpacity style={styles.Buttoncontainer} onPress={openDatePicker}>
                    <Text style={styles.buttonText}>{getDisplayDate()}</Text>
                </TouchableOpacity>

                {/* DatePicker */}
                <DatePicker
                    isVisible={showDatePicker}
                    mode={'single'}
                    onCancel={onCancel}
                    onConfirm={onConfirm}
                />
            
                <TouchableOpacity style={styles.Buttoncontainer2} onPress={saveChanges}>
                    <Text style={styles.buttonText2}>Create Product</Text>
                </TouchableOpacity>
            </View>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        color: '#000000',
        fontSize: 16,
    },
    buttonText2: {
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
        borderRadius: 5,
        backgroundColor: '#ffffff',

    },
    dropdown: {
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#ffffff',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    input2: {
        height: 400,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#ffffff',

    },
    input3: {
        height: 10,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#ffffff',

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
        borderColor: 'gray',
        borderWidth: 1,
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

export default ProductDetails;
