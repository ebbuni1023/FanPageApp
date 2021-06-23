import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Button, Text, TouchableOpacity, Image } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

import { globalStyles } from '../../utils/globalStyles'
import moment from "moment";

export default function Register() {

   const [userId, setuserId] = useState()
   const [firstName, setfirstName] = useState()
   const [lastName, setLastName] = useState()
   const [email, setEmail] = useState()
   const [password, setPassword] = useState()

   async function onRegister() {
      if(!email && !password) {
         return
      }
      try {
        const today = moment();
        const registerDatetime = moment().format('YYYY-MM-DD HH:mm:ss');
         const role = "customer";
         const { user: { uid } } = await auth().createUserWithEmailAndPassword(email, password, firstName, lastName, registerDatetime, role)

         firestore().collection('users')
         .doc(uid)
         .set({
            email,
            firstName,
            lastName,
            userId,
            registerDatetime,
            role
         })
         .then(() => console.log('Done'))
      } catch(error) {
         console.log(error)
      }
   }

   return (
      <View style={styles.container}>
         <TextInput
            value={userId}
            placeholder='userId'
            style={globalStyles.primaryInput}
            onChangeText={(text) => setuserId(text)}
         />
         <TextInput
            value={firstName}
            placeholder='First Name'
            style={globalStyles.primaryInput}
            onChangeText={(text) => setfirstName(text)}
         />

         <TextInput
            value={lastName}
            placeholder='Last Name'
            style={globalStyles.primaryInput}
            onChangeText={(text) => setLastName(text)}
         />

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
            title='Register'
            onPress={onRegister}
         />

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