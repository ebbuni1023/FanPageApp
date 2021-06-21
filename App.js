import React, { useState, useEffect, Component } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId: '177920797564-hadbcbgssgf848mod9bp85e77av7gbj8.apps.googleusercontent.com',
});
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Button
} from 'react-native';

import firebase from 'firebase'
// import { firebaseConfig } from './firestore';
// firebase.initializeApp(firebaseConfig);
import auth from '@react-native-firebase/auth';
GoogleSignin.configure({
  webClientId: '177920797564-hadbcbgssgf848mod9bp85e77av7gbj8.apps.googleusercontent.com',
});
function LoginApp() {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}

const App = () => {
  // function componentWillMount (){
  //   GoogleSignin.configure({
  //     webClientId: '177920797564-hadbcbgssgf848mod9bp85e77av7gbj8.apps.googleusercontent.com',
  //   });
  // }
  // Email and password
  createUser = () => {
    auth()
  .createUserWithEmailAndPassword('rr.doe@example.com', 'SuperSecretPassword!')
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
  }

  // GOOGLE LOGIN
  onGoogleButtonPress = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  // LOG OFF
  logoff = () => {
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
    }

  return (
    <View style = {styles.container}>
      <LoginApp/>
      <Button title="create User" onPress={this.createUser} />
      <Button title="LogOff" onPress={this.logoff} />
      <Button
      title="Google Sign-In"
      onPress={() => this.onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
  }
})
export default App;
