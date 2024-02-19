import React from "react"
import {useState,useEffect} from'react' 
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity,Alert} from 'react-native' 
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome" 
import {faUserTie} from "@fortawesome/free-solid-svg-icons"
import { library } from '@fortawesome/fontawesome-svg-core';
import Navbar from "../MainContent/Navbar";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

library.add(faUserTie) ;
const GeneralCard = () => {
     const [data,setData] = useState([]) ;
     const [following,setFollowing] = useState(false) ;
     const navigation = useNavigation() ;

     const handleNavigateById = (userId) => {
        navigation.navigate("IndividualCard",{userId}) ;
     }
     const handleFollowUser = async(myId,followId) => {
        try {
           const followResponse = await axios.put(`http://192.168.43.148:3500/v14/api/followNewAccount/${followId}`,{myId}) ;
           if(!followResponse){
                Toast.show(
                    {
                        text1:'Unable to follow the user'
                    }
                )
           }
           console.log(followResponse) ;
           setFollowing(true) ;
        }
        catch(error){
              console.log(error) ;
              Toast.show(
                { 
                    text1:'Server side error had occured'
                }
              )
        }
   }

   const handleUnfollowUser = async(myId,followId) => {
       try {
           const unfollowResponse = await axios.put(`http://192.168.43.148:3500/v15/api/unfollowAccount/${followId}`, {myId}) ;
           if(!unfollowResponse){
            Toast.show(
                {
                    text1:'Unable to follow the user'
                }
            )
       }
       console.log(unfollowResponse) ;
       setFollowing(false) ;
    }     
    catch(error)
        {
            console.log(error) ;
            Toast.show(
                {
                    message:'Server side error occured' 
                }
            ) 
       }
   } 
   
        const fetchCookieData = async() => {
            try {
                let cookieData = await CookieManager.get("http://192.168.43.148:3500") ;
                if(!cookieData){
                    Alert.alert('No cookie found complete the authentication steps first')
                }
                let userCookieDataParsed = JSON.parse(cookieData.loginCookie) ;
                let userId = userCookieDataParsed._id ;
                return userId ;
            }
            catch(error){
                 console.log(error) ;
            }  
        }
    
     useEffect(() => {
          const handleFetchGeneralNetworkData = async() => {
                try {
                    let fetchResponse = await fetch("http://192.168.43.148:3500/v12/api/getAllNetworkData") ;
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
          handleFetchGeneralNetworkData()},[])

          let personId
          personId = fetchDataToken() ;
  

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
                         <TouchableOpacity style = {styles.buttonStyling} onPress = {() => (following ? handleUnfollowUser(personId,item._id) : handleFollowUser(personId,item._id))}>
                              <Text style = {styles.buttonTextStyling}>{following ? "Unfollow" : "Follow" }</Text>     
                         </TouchableOpacity>   
                         <TouchableOpacity style = {styles.buttonStyling}>
                              <Text style = {styles.buttonTextStyling} onPress={() => handleNavigateById(item._id)}>View Profile</Text>     
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

export default GeneralCard;

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