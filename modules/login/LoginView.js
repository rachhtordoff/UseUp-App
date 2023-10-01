// LoginPage.js

import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text,Image, StyleSheet,TouchableOpacity} from 'react-native';
import AuthContext from '../Authentication/authContext'; // adjust the path
import Authentication from '../Authentication/Authentication.js'; // adjust the path
import { colors, fonts } from '../../styles';

const useupicon = require('../../assets/images/backgroundimage2.png');
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
    borderRadius:30,
    marginBottom:40,
    color: '#ffffff'
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
        backgroundColor: colors.blue,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10, // To give some space around the text, adjust as needed
    },
      linkText: {
          marginTop:10,
        marginLeft: 120,
        color: colors.blue, 
        textDecorationLine: 'underline',
    },
    linkText2: {
        marginTop:10,
      marginLeft: 90,
      color: colors.blue, 
      textDecorationLine: 'underline',
  },
    container: {
        paddingTop:0,
        backgroundColor: '#ffffff',
        fontFamily: fonts.primaryRegular,
        height: '100%'
      },
      innerButton: {
        backgroundColor: '#3498db',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    }
  });
  const finalStyle = [
    styles.default,
    styles.bordered,
    styles.dark
  ];
  


const LoginPage = () => {
    const { login, register, errorMessage, userMessage} = useContext(AuthContext);

    const [isLoginView, setIsLoginView] = useState(true); // Toggle between login and signup views
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullName] = useState('');
    const [newemail, setnewEmail] = useState('');
    const [newpassword, setnewPassword] = useState('');
    const [newfullname, setnewFullName] = useState('');

    // Use the register function when needed
    const handleSignUp = async () => {
        await register(newfullname, newemail.toLowerCase(), newpassword);
        setIsLoginView(true);

    };
    // Use the login function when needed
    const handlelogin = () => {
        login(email.toLowerCase(), password);
        
    };

    return (

 
        <View style={styles.container}>

        <View style={styles.imageContainer}>
            <Image source={useupicon} style={styles.image} />
            <View style={styles.whiteOverlay}>

            {isLoginView ? (
                // This is the Login View
                <>
                
                <View style={styles.headercontainer}>

                <View style={styles.headertextcontainer}>
                <Text style={styles.title}>
                    Login
                </Text>
                </View>
                <View style={styles.headertextcontainer}>

                <Text style={styles.subheadin}>
                Please sign in to continue
                </Text>
                </View>
                </View>
            <View style={styles.logincontainer}>
            {errorMessage && <Text style={{ marginBottom:10, marginLeft:55, color: 'red' }}>{errorMessage}</Text>}


                <View style={styles.textcontainer}>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        placeholderTextColor={colors.darkGray}
                        underlineColorAndroid="white"
                        style={finalStyle}
                        onChangeText={setEmail}
                    />
                    </View>
                    <View style={styles.textcontainer}>

                    <TextInput
                        placeholder="Password"
                        value={password}
                        secureTextEntry
                        placeholderTextColor={colors.darkGray}
                        underlineColorAndroid="white"
                        style={finalStyle}
                        onChangeText={setPassword}
                    />

                </View>
                <TouchableOpacity style={styles.Buttoncontainer} onPress={handlelogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIsLoginView(false)}>
                        <Text style={styles.linkText}>Don't have an account?</Text>
                    </TouchableOpacity>
                    </View>
                </>
            ) : (
                // This is the Create Account View
                <>
                    <View style={styles.headercontainer}>

                        <View style={styles.headertextcontainer}>
                        <Text style={styles.title}>
                            Create Account
                        </Text>
                        </View>
            
                        </View>
                        <View style={styles.logincontainer}>
                        <View style={styles.textcontainer}>

                        <TextInput
                            placeholder="Full Name"
                            value={newfullname}
                            placeholderTextColor={colors.darkGray}
                            underlineColorAndroid="white"
                            style={finalStyle}
                            onChangeText={setnewFullName}
                        />
                        </View>
                        <View style={styles.textcontainer}>

                    <TextInput
                        placeholder="Email"
                        value={newemail}
                        placeholderTextColor={colors.darkGray}
                        underlineColorAndroid="white"
                        style={finalStyle}
                        onChangeText={setnewEmail}
                    />
                    </View>
                    <View style={styles.textcontainer}>
                    <TextInput
                        placeholder="Password"
                        value={newpassword}
                        placeholderTextColor={colors.darkGray}
                        underlineColorAndroid="white"
                        style={finalStyle}
                        secureTextEntry
                        onChangeText={setnewPassword}
                    />
                    </View>
      
                    <TouchableOpacity style={styles.Buttoncontainer} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIsLoginView(true)}>
                        <Text style={styles.linkText2}>Already have an account? Login</Text>
                    </TouchableOpacity>

                    </View>

                </>
            )}
        </View>
        </View>
        </View>
    );
}

export default LoginPage;
