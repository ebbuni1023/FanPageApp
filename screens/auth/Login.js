import React, { useState, useEffect } from 'react'
import { View, TextInput, Text, StyleSheet, Button, } from 'react-native'
import auth from '@react-native-firebase/auth'

import { globalStyles } from '../../utils/globalStyles'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId: '177920797564-hadbcbgssgf848mod9bp85e77av7gbj8.apps.googleusercontent.com',
});

import Home from '../main/Home';
export default function Register() {
   const [loggedIn, setloggedIn] = useState(false);
   const [userInfo, setuserInfo] = useState([]);

   const [email, setEmail] = useState()
   const [password, setPassword] = useState()
   const [name, setName] = useState()

   function onLogin() {
      auth().signInWithEmailAndPassword(email, password)
   }

   signOut = async () => {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        setloggedIn(false);
        setuserInfo([]);
      } catch (error) {
        console.error(error);
      }
    };
   // GOOGLE LOGIN
   _signIn = async () => {
   try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      setloggedIn(true);
   } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
         // user cancelled the login flow
         alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
         alert('Signin in progress');
         // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
         alert('PLAY_SERVICES_NOT_AVAILABLE');
         // play services not available or outdated
      } else {
         // some other error happened
      }
   }
   };

   useEffect(() => {
      GoogleSignin.configure({
        scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: '177920797564-hadbcbgssgf848mod9bp85e77av7gbj8.apps.googleusercontent.com',
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      });
    }, []);


   return (
      <View style={styles.container}>

         <TextInput 
            value={email}
            placeholder='Email'
            style={globalStyles.primaryInput}
            onChangeText={(text) => setEmail(text)}
         />

         <TextInput 
            value={password}
            placeholder='Password'
            style={globalStyles.primaryInput}
            onChangeText={(text) => setPassword(text)}
         />

         <Button
            title='Login'
            onPress={onLogin}
            
         />
         
         <View style={styles.sectionContainer}>
              <GoogleSigninButton
                style={{width: 192, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this._signIn}
              />
         </View>
         <View style={styles.buttonContainer}>
              {!loggedIn && <Text>You are currently logged out</Text>}
              {loggedIn && (
                <Button
                  onPress={this.signOut}
                  title="LogOut"
                  color="red"></Button>
                  
              )}
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      flex: 1
   },
   touchableContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '50%'
   },
   displayPicture: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'gray'
   }
})