import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import auth from '@react-native-firebase/auth'
import Login from './screens/auth/Login'
import Register from './screens/auth/Register'
import Home from './screens/main/Home'
import firestore from '@react-native-firebase/firestore';
import SplashScreen from 'react-native-splash-screen';
import {LogBox } from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);

const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator()

export default function App() {

  const [loggedIn, setLoggedIn]  = useState(false)
  const [loading, setLoading] = useState(true)

  const [role, setRole] = useState('');
  const [userId, setuserId] = useState('');
  async function onAuthStateChanged(user) {
    if(user) {
      // console.log('user', user.uid);
      setLoggedIn(true);
      firestore().collection('users')
        .doc(user.uid)
        .get()
        .then((doc) => {
          let childData = doc.data();
          // console.log('childData', childData);
          // let role = childData.role;
          // console.log('role', role);
          setRole(childData.role);
          setuserId(childData.userId);

        })
    }
    else {
      setLoggedIn(false)
    }
    if(loading) setLoading(false)
  }

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(onAuthStateChanged)
    return subscribe
  }, [])


  /* SPLASH SCREEN */
  // useEffect(() => {
  //   setTimeout(() => {
  //       SplashScreen.hide();
  //   }, 1000);
  // }, [])
  /* SPLASH SCREEN */

  const onNavigationReady = () => {
    SplashScreen.hide(); // just hide the splash screen after navigation ready
}

  // if(loading) {
  //   return (
  //     <ActivityIndicator
  //       size={32}
  //       color='gray'
  //     />
  //   )
  // }

  if(!loggedIn) {
    return (
      <NavigationContainer onReady={onNavigationReady}>
        <Tab.Navigator initialRouteName='Login'>
          <Tab.Screen name='Login' component={Login} />
          <Tab.Screen name='Register' component={Register} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }

  // console.log('role', role)
  // console.log('userId', userId)



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='Home' >
          {props => <Home {...props} role={role} userId={userId}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}