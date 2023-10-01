// authentication.js
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './authContext';

const Authentication = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [userMessage, setUserMessage] = useState(null);
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [user_id, setUserId] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    const register = async (fullname,email, password) => {
        // Your registration logic here...
        const response = await fetch('http://192.168.1.143:8000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullname: fullname,
                email: email,
                password: password
            })
        });
        const data = await response.json();
        setUserMessage('Your account has been created, you can now log in!');
        setIsLoggedIn(false);

    };

    const login = async (email, password) => {
        const response = await fetch('http://192.168.1.143:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();
        console.log(data)
        if (data.access_token) {
            await AsyncStorage.setItem('userToken', data.access_token);
            await AsyncStorage.setItem('refreshToken', data.refresh_token);
            await AsyncStorage.setItem('user_id', String(data.user_id));
            await AsyncStorage.setItem('name', data.name);
            await AsyncStorage.setItem('email', data.email);
            setToken(data.access_token);
            setEmail(data.email);
            setName(data.name);
            setUserId(data.user_id);
            setRefreshToken(data.refresh_token);
            setErrorMessage('')
            setUserMessage('')
            setIsLoggedIn(true);

        }else{
            setErrorMessage('Invalid email or password entered');
            setUserMessage('')
            setIsLoggedIn(false);

        }


        if (isLoggedIn){
            console.log('yeah')
        }
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('refreshToken');
            await AsyncStorage.removeItem('user_id');
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('name');
            setToken(null);
            setEmail('');
            setName('');
            setUserId('');
            setIsLoggedIn(false);

        } catch (error) {
            console.error("Error logging out: ", error);
        }
    }

    const getrefreshToken = async () => {
        const refresh_token = await AsyncStorage.getItem('refresh_token');
        
        // Make a request to your backend with the refresh token
        const response = await fetch('http://192.168.1.143:8000/token/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refresh_token: refresh_token
          })
        });
    
        const data = await response.json();
    
        if (data.access_token) {
          await AsyncStorage.setItem('userToken', data.access_token);
          setToken(data.access_token);
          return data.access_token;
        } else {
          logout();
          console.log('Could not refresh token');
        }
    };
    
    
    useEffect(() => {
        console.log("isLoggedIn state has changed to: ", isLoggedIn);
    }, [isLoggedIn]);
    
    
    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem('userToken');
            const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
            const storedEmail = await AsyncStorage.getItem('email');
            const storedName = await AsyncStorage.getItem('name');
            const storedUserId = await AsyncStorage.getItem('user_id');

            if (storedRefreshToken) {
                setRefreshToken(storedRefreshToken);
            }
            if (storedEmail) {
                setEmail(storedEmail);
            }
            if (storedName) {
                setName(storedName);
            }
            if (storedUserId) {
                setUserId(storedUserId);
            }
            if (storedToken) {
                setToken(storedToken);
                setIsLoggedIn(true);

            }


        };
    
      fetchToken();
      }, []);

      
    return (
        
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn,getrefreshToken, refreshToken, token, email, name, user_id, login, logout, register, errorMessage, setErrorMessage, userMessage, setUserMessage}}>
        {children}
        </AuthContext.Provider>
    );

    
};

export default Authentication;
