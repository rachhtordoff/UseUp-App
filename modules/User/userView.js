// LoginPage.js

import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text,Image, StyleSheet,TouchableOpacity} from 'react-native';
import AuthContext from '../Authentication/authContext'; // adjust the path
import Authentication from '../Authentication/Authentication.js'; // adjust the path
import { colors, fonts } from '../../styles';

const useupicon = require('../../assets/images/useupbanner.png');
const HEIGHT = 40;
const styles = StyleSheet.create({
  default: {
    height: HEIGHT,
    alignItems: 'center',
    color: colors.darkGray,
    fontFamily: fonts.primaryRegular,
    ...Platform.select({
      android: {
        paddingLeft: 5,
        opacity: 0.9,
      },
    }),
  },
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
      Buttoncontainer: {
        marginLeft: 100,
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
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
  },
    container: {
        paddingTop:10,
        backgroundColor: '#ffffff',
        fontFamily: fonts.primaryRegular,
        height: '100%'
      },
  });
  const finalStyle = [
    styles.default,
    styles.bordered,
    styles.dark
  ];
  

const UserPage = () => {
    const { logout} = useContext(AuthContext);

    // Use the logout function when needed
    const handlelogout = () => {
        logout();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.Buttoncontainer} onPress={handlelogout}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
       </View>
         
    );
}

export default UserPage;
