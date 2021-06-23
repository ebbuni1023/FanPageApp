import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, Modal, Button, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { TextInput } from 'react-native-gesture-handler';
import Login from '../auth/Login';
import Register from '../auth/Register';

import moment from "moment";

const ModalPop = ({visible, children})=> {
   const [showModal, setShowModal] = React.useState(visible);
   React.useEffect(() => {
      toggleModal();
   }, [visible]);
   const toggleModal = () => {
      if (visible){
         setShowModal(true);
      } else {
         setShowModal(false);
      }
   }
   return < Modal transparent visible = {showModal}>
      <View style = {styles.modalBackground}>
         <View style = {styles.modalContainer}>
            {children}
         </View>
      </View>
   </Modal>
};

export default function Home({ navigation, role }) {

   logoff = () => {
      auth ()
      .signOut()
      .then(() => console.log('User Signed out!'));
   }

   // MODAL
   const [visible, setVisible] = React.useState(false);

   // POST
   const ref = firestore().collection('Post');
   const [post, setPost] = useState('');
   const today = moment();
   const DateTime = moment().format('YYYY-MM-DD HH:mm:ss');
   async function addPost(){
      await ref.add({
         Message: post,
         DateTime:moment().format('YYYY-MM-DD HH:mm:ss'),
         UserId: {},
 
      });
      setPost('');
   }
   return (
      <View style = {styles.logoffConatiner}>
        <Button title="LogOff" onPress={this.logoff} />
         <ModalPop visible = {visible}>
            <View style = {{alignItems: 'center'}}>
               <View style = { styles.header}>
                  <TouchableOpacity onPress = {() => setVisible(false)}>
                  <Button title = "X" onPress={() => setVisible(false)}></Button>
                  </TouchableOpacity>
               </View>
            </View>
            <Text> POST YOUR WORDS </Text>

            <TextInput label={'write post'} value={post} onChangeText={setPost} />
            <Button title ="POST" onPress={() => addPost()}> Add POST </Button>

         </ModalPop>
        <View style = {styles.addContainer}>
           <Text>To upload the message please click below + sign </Text>
           <View style = {styles.pluscontainer}>
              {role === "customer" ?  <Text>Customer</Text> : <Button title="+" onPress = {() => setVisible(true) }></Button>}
           </View>
        </View>
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
   logoffConatiner:{
      justifyContent:'center',
      alignItems: 'center',
      flex: 1,
   },
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
   },

   //MODAL
   modalBackground:{
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
   },

   modalContainer:{
      width: "80%",
      backgroundColor: 'white', paddingHorizontal: 20, 
      paddingVertical: 30,
      borderRadius: 20, 
      elevation: 20,
   },

   header: {
      width: '100%',
      height: 50,
      flexDirection: 'column',
      alignItems: "flex-end",
      justifyContent: 'flex-start'
   }
})