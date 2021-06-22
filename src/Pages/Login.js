import React, { useState, useEffect, Component } from 'react';
GoogleSignin.configure({
  webClientId: '177920797564-hadbcbgssgf848mod9bp85e77av7gbj8.apps.googleusercontent.com',
});
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inputs from '../Components/input';
import SignUp from '../Pages/SignUp';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import * as firebase from 'firebase';

import { Container, Content, Header, Form, Input, Button, Item, Label } from 'native-base';
firebase.initializeApp(firebaseConfig);
// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCauA0jI6KiBb5ge48jPYh0QaRQlQmMfi8",
  authDomain: "summerfan-4905d.firebaseapp.com",
  databaseURL: "https://summerfan-4905d-default-rtdb.firebaseio.com",
  projectId: "summerfan-4905d",
  storageBucket: "summerfan-4905d.appspot.com",
  messagingSenderId: "177920797564",
  appId: "1:177920797564:web:525af7a9136bb7c5c712f9",
  measurementId: "G-YC35JKRE9B"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}



GoogleSignin.configure({
  webClientId: '177920797564-hadbcbgssgf848mod9bp85e77av7gbj8.apps.googleusercontent.com',
});


function LoginApp({}) {

    // IT GIVES AN ERROR
    
  // constructor(props){
  //   super(props);

  //   this.state=({
  //     email: '',
  //     password:''
  //   })
  // }
  signUp = (email, password) => {

  }

  login = (email, password) => {
    
  }


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
        <Container style={styles.Container}>
        <View style ={styles.textContainer}>
        <Text style= {{ fontSize:24}}>Hello! Welcome to my Application!</Text>
        <Text>Please Sign to see and write your feed for Jiyoung</Text>
        </View>
        {/* <Inputs /> */}
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
            autoCorrecr={false}
            autoCapitalize="none"
            onChange={(email)=> this.setState({email})}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
            secureTextEntry={true}
            autoCorrecr={false}
            autoCapitalize="none"
            onChange={(password)=> this.setState({password})}

            />
          </Item>

          <Button 
          style={{margintop:10}}
          full
          rounded
          success
          onPress={() => this.login(this.state.email, this.state.password)}>
            <Text>Login</Text>
          </Button>
          <View style = {styles.signup}>
            <Text>Don't have an account?</Text>
        </View>
          <Button 
          style={{margintop:10}}
          full
          rounded
          primary
          onPress={() => this.login(this.state.email, this.state.password)}>
            <Text>SignUp</Text>
          </Button>

        </Form>
        <GoogleSigninButton
            style={{ width: 300, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => this.onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
  />
        <View style = {styles.signup}>
            <Text>Don't have an account?</Text>
            <Button style ={styles.button } title="SignUp" onPress={() => navigation.navigate('SignUp')} />

        </View>
        </Container>
      );
    }
  
    return (
        
      <View>
        <Text>Welcome {user.email}</Text>
        <Button title="LogOff" onPress={this.logoff} />
      </View>
    );
  }

function HomeScreen({ navigation }) {
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
    <LoginApp/>

);
}

const styles = StyleSheet.create({

    button: {
        height: 10
    },

    container: {
      flex:1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding: 10

    }
})


export default HomeScreen;