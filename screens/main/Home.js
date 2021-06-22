import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, Modal, Button } from 'react-native'
import auth from '@react-native-firebase/auth';


export default function Home({ navigation }) {

   logoff = () => {
      auth ()
      .signOut()
      .then(() => console.log('User Signed out!'));
   }
   return (
      <View>
        <Button title="LogOff" onPress={this.logoff} />
      </View>
   )
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
const styles = StyleSheet.create({
   header: {
      marginHorizontal: 10,
      marginVertical: 10
   },
   addIcon: {
      position: 'absolute',
      bottom: 20,
      left: '45%',
      zIndex:1,
      elevation: 20,
   }
})