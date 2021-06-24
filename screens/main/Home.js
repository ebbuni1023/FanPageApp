import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, FlatList, StyleSheet, Modal, Button, TouchableOpacity, Alert } from 'react-native'
import auth from '@react-native-firebase/auth';
import firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { TextInput } from 'react-native-gesture-handler';
import Login from '../auth/Login';
import Register from '../auth/Register';

import moment from "moment";

// const message = [];
const items= [];


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

export default function Home({ navigation, role, userId }) {
   const [modalVisible, setModalVisible] = useState(false);

   logoff = () => {
      auth ()
      .signOut()
      .then(() => console.log('User Signed out!'));
      return (
         Alert.alert('you signed out')
      )
   }

   // MODAL
   const [visible, setVisible] = React.useState(false);

   /* POST  */
   const ref = firestore().collection('Post');
   const [post, setPost] = useState('');
   const today = moment();
   const DateTime = moment().format('YYYY-MM-DD HH:mm:ss');
   
   async function addPost(){
      await ref.doc().set({
         Message: post,
         DateTime:moment().format('YYYY-MM-DD HH:mm:ss'),
         UniqueID: userId,
         Date: firestore.Timestamp.fromDate(new Date),
      });
      // setPost('');
   }
  
   const [data, setData] = useState([]);
   useEffect(() => {
      firestore().collection('Post').get()
        .then(snapshot => {
          let arrayData = snapshot.docs.map((item)=>{
            return item.data();
          })
          setData(arrayData);
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
  });

      for(let i=0; i < data.length ; i++) {
         items.push(<Text>{data[i].Message}</Text>)
      }

      function test(){
         for(let i = 0; i < data.length ; i++) {
            if (data[i].DateTime > data[i+1]) {
               items.push(<Text>{data[i].DateTime}</Text>)
            } else {
               items.push(<Text>{Data[i+1].DateTime}</Text>)
            }
         }
      }


   /* POST  */
   // JSON.stringify(sortMyObj, Object.keys(sortMyObj).sort());
//   console.log (JSON.stringify(data));
   return (
      <View style = {styles.Container}>
        {/* POST BUTTON  */}
        <View style = {styles.addContainer}>
           <View style = {styles.headerContainer}>
            <Text style ={ styles.welcomeText }>Welcome To Jiyoung's FanPage</Text>
           </View>
           <View style = {styles.pluscontainer}>
              {role === "admin" ?  <Button title="+" onPress = {() => setVisible(true) }></Button> : <Text style = {styles.textStyle}> This is what Jiyoung said to you ! </Text>}
           </View>
           <View style = {styles.listCon}>
              {data.map((value, index) => {
               return <Text key={index}>{value.Message}</Text>
               })} 

               {data.map((value, index) => {
               return <Text key={index}>{value.DateTime}</Text>
               })} 
              </View>
        </View>
        {/* POST BUTTON  */}
         {/* MODAL */}
         <ModalPop visible = {visible}>
            <View style = {{alignItems: 'center'}}>
               <View style = { styles.header}>
                  <TouchableOpacity onPress = {() => setVisible(false)}>
                     <Button title = "X" onPress={() => setVisible(false)}></Button>
                  </TouchableOpacity>
               </View>
            </View>
            <Text> POST YOUR WORDS  </Text>
            <TextInput label={'write post'} value={post} onChangeText={setPost} />
            <Button title ="POST" onPress={() => addPost() & setVisible(false)}> Add POST </Button>
         </ModalPop>
         {/* MODAL */}
         
         {/* ASK TO LOG OUT MODAL BUTTON  */}
            <View style={styles.centeredView}>
               <Modal
               animationType="slide"
               transparent={true}
               visible={modalVisible}
               onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
               }}
               >
               <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                     <Text style={styles.modalText}>Do you want to Sign Out?</Text>
                     <Pressable
                     style={[styles.button, styles.buttonClose]}
                     onPress={() => setModalVisible(!modalVisible)}
                     >
                     <Text style={styles.textStyle}>No</Text>
                     </Pressable>
                     <Button style={styles.textStyle} title="Yes" onPress={this.logoff} />
                  </View>
               </View>
               </Modal>
            </View>
               <View style = {styles.logoutContainer}>
                  <Pressable
                     style={[styles.button, styles.buttonOpen]}
                     onPress={() => setModalVisible(true)}
                     >
                  <Text style={styles.textStyle}>Log Out</Text>
                  </Pressable>
               </View>

            {/* ASK TO LOG OUT MODAL BUTTON  */}
      </View>
   );
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
   Container : {
      flex: 1,
      marginTop: 50,
      justifyContent: 'center',
   },
   welcomeText: {
      fontSize: 20,
   },

   logoffConatiner:{
      justifyContent:'center',
      alignItems: 'center',
      flex: 1,
      
   },
   header: {
      marginHorizontal: 10,
      marginVertical: 10,
      
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
      justifyContent: 'flex-start',

   },


   centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      // backgroundColor: 'yellow',

    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,

    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,

    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    headerContainer:{
       justifyContent: 'center',
       alignItems:'center',
       backgroundColor: '#F194FF',
       height: 60,
    },

    logoutContainer: {
      height: 100,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      // backgroundColor: 'pink',
    },

    addContainer: {
       height: '50%',
       justifyContent: 'center',
      //  backgroundColor: 'pink',
    },

    listCon : {
       height: '80%',
       flexDirection: 'column',
      //  backgroundColor: 'yellow',
      //  justifyContent: 'center',
       textAlign:'center',
       alignItems:'center',
    }
})