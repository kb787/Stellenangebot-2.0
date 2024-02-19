import React from "react"
import {useState,useEffect} from'react' 
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity,Alert} from 'react-native' 
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome" 
import {faUserTie} from "@fortawesome/free-solid-svg-icons"
import { library } from '@fortawesome/fontawesome-svg-core';
import Navbar from "../MainContent/Navbar";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import jwt_decode from 'jwt-decode';

library.add(faUserTie) ; 

const PrevUserProfile = () => {
    const [data,setData] = useState([]) ;
    
    const handleGetUserId = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token') ;
            if(!storedToken){
               Alert.alert('Token not found ! Create your profile first') ;
               return null ;
            }
            else {
             //   const decodedToken = jwt_decode(storedToken) ;
             //   const userId = decodedToken._id ;
                const userId = storedToken._id ; 
                return userId ;
            }
        }
        catch(error){
              console.log(error) ;
        }
    }
    

    useEffect(() => {
         const handleFetchProfileDataById = async() => {
               try {
                   const myId = handleGetUserId() ;
                   if(myId === null){
                      Alert.alert("Cannot get your profile details")
                   }
                   let fetchResponse = await fetch(`http://192.168.43.148:3500/v9/api/getUserProfile/${myId}`) ;
                   if(!fetchResponse.ok){
                        Toast.show({
                           type:'error',
                           text1:'Unable to get data',
                   })
                   }
                   else {
                       console.log(fetchResponse) ;
                       let jsonDataConverted = await fetchResponse.json() ;
                       setData(jsonDataConverted) ;
                   }
                }
               catch(error) {
                   Toast.show(
                       {
                           type:'error',
                           text1:'Server side error occured'
                       }
                   )  
               }
         }
         handleFetchProfileDataById()},[])


         return  ( 
       <ScrollView>    
       <View style = {styles.mainPage}>     
       <Navbar/>   
       <View style = {styles.mainProfilePage}> 
         <View style = {styles.cardCollectionSet}>  
           { 
            (data?. map((item) =>
               <View  key = {item._id} style = {styles.individualCardStyling}>          
                   <View>
                        <Text style = {styles.textStylingHeading}>{item.networkProfileFullName}</Text>
                        <Text style = {styles.textStyling}>{item.networkProfileHeading}</Text>
                        <View style = {styles.iconWrapping}> 
                        <FontAwesomeIcon icon = {faUserTie} style={styles.cardIconStyling} size={32} />
                        </View> 
                        <TouchableOpacity style = {styles.buttonStyling}>
                             <Text style = {styles.buttonTextStyling}>Follow</Text>     
                        </TouchableOpacity>   
                        <TouchableOpacity style = {styles.buttonStyling}>
                             <Text style = {styles.buttonTextStyling}>View Profile</Text>     
                        </TouchableOpacity>      
                   </View>  
               </View> 

               )
           ) 
           }  
         </View>   
       </View>      
 </View>   
 </ScrollView> 
         )
}

export default PrevUserProfile;

const styles = StyleSheet.create(
   {

       mainPage : {
            width:'100%' ,
            backgroundColor:'rgba(64,64,64,1)' ,
            height:'fit-content',
            flex:1
       },
       mainProfilePage : {
            marginTop:'26%' ,
       }  , 

       textStylingHeading : {
           color:'yellow' ,
           fontSize:14,
           justifyContent:'center',
           textAlign:'center' ,
           paddingTop:5,
           paddingLeft:2,
           paddingRight:2 
       } ,

       textStyling : {
           color:'yellow' ,
           fontSize:12,
           justifyContent:'center',
           textAlign:'center' ,
           paddingTop:1,
           paddingLeft:2,
           paddingRight:2
       } ,
       cardCollectionSet : {
           display: 'flex',
           gap:6,
           flexDirection:'row',
           alignContent:'center' ,
           justifyContent:'flex-start',
           marginTop:'30%',
           paddingLeft:3,
           paddingRight:3,
           paddingBottom:5,
           flexWrap:'wrap'
       } ,
       individualCardStyling : {
          width:'47%' ,
          height:'13%' ,
          border:'solid',
          borderLeftColor:'darkgrey' ,
          borderRightColor:'darkgrey' ,
          borderTopColor:'darkgrey' ,
          borderBottomColor:'darkgrey' ,
          borderRadius:15 ,
          backgroundColor:'black'
       } ,
       cardIconStyling : {
           color:'yellow' ,
           display:'flex' ,
           justifyContent:'center',
           alignItems:'center',
           marginTop:'20%',
           border:'solid',
           borderLeftColor:'yellow',
           borderRightColor:'yellow',
           borderStartColor:'yellow',
           borderEndColor:'yellow',
           borderWidth:2 ,
           borderRadius:50
       } ,
       buttonStyling : {
           display:'flex' ,
           justifyContent:'center',
           alignContent:'center',
           width:'70%',
           height:'14%',
           borderRadius:5,
           backgroundColor:'blue',
           color:'white',
           marginTop:'13%',
           marginLeft:'18%',
           marginRight:'18%'
       },
       buttonTextStyling : {
           fontSize:12,
           textAlign:'center',
           color:'white'
       } ,
       iconWrapping : {
           borderColor:'yellow',
           borderWidth:2,
           borderRadius:6,
           marginLeft:'30%',
           marginRight:'30%',
           marginTop:'5%',
           paddingLeft:'9%',
           paddingRight:'9%',
           paddingBottom:'5%'
       }    
   }
)