import React from "react"
import {useState,useEffect} from'react' 
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity,Alert} from 'react-native' 
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome" 
import {faUserTie,faBuildingColumns,faFileLines,faCalendarDay,faLocationDot,faScrewdriverWrench,faToolbox,faCode,faClipboard,faBuilding,faMedal} from "@fortawesome/free-solid-svg-icons"
import {faSquareGithub,faReadme} from "@fortawesome/free-brands-svg-icons"
import { library} from '@fortawesome/fontawesome-svg-core';

import Navbar from "../MainContent/Navbar";
import { useNavigation,useRoute } from "@react-navigation/native";
library.add(faUserTie) ; 

const IndividualCard = () => {
    const [data,setData] = useState([]) ;
    const route = useRoute() ;
    const {userId} = route.params ;

    const jsonArrayConverter = (value) => {
         if(!Array.isArray(value)){
             return [value] ;
         }
         else {
             return value ;
         }
    }

        

  

    useEffect(() => {
         const handleFetchNetworkDataById = async() => {
               try {
              
                   let fetchResponse = await fetch(`http://192.168.43.148:3500/v13/api/getIndividualNetworkData/${userId}`) ;
                   if(!fetchResponse.ok){
                        Toast.show({
                           type:'error',
                           text1:'Unable to get data',
                   })
                   }
                   else {
                       console.log(fetchResponse) ;
                       let jsonDataConverted = await fetchResponse.json() ;
                       let arrayDataConverted = jsonArrayConverter(jsonDataConverted) ;
                       setData(arrayDataConverted) ;
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
         handleFetchNetworkDataById()},[])


         return  ( 
       <ScrollView>    
       <View style = {styles.mainPage}>     
       <Navbar/>   
       <View>   
           { 
            (data?.map((item) =>
               <View  key = {item._id} >
                        <View style = {styles.iconWrapper}> 
                        <FontAwesomeIcon icon = {faUserTie} size = {80} style = {styles.fontIconProfileStyling} />
                        </View>                                
                        <Text style = {styles.profileHeadingStyling}>{item.networkProfileFullName}</Text>
                        <Text style = {styles.profileTitleStyling}>{item.networkProfileHeading}</Text> 
                        <Text style = {styles.profileTitleStyling}>About :- {item.networkProfileDescription}</Text>
                        <View style = {styles.skillWrapping}>
                        <View style = {styles.contentGroup}>
                        <FontAwesomeIcon icon = {faScrewdriverWrench} size = {25} style = {styles.contentIcon} />    
                        <Text style = {styles.profileContentStyling}>Skills :- {item.networkProfileSkill}</Text>
                        </View>
                        </View>
                        <Text style = {styles.titleHeading}>
                            Education
                        </Text>
                        <View style = {styles.contentGroup}> 
                        <FontAwesomeIcon icon = {faBuildingColumns} size = {25} style = {styles.contentIcon}  /> 
                        <Text style = {styles.profileContentStyling}>University :- {item.networkProfileUniversityName}</Text>
                        </View>
                        <View style = {styles.contentGroup}>
                        <FontAwesomeIcon icon = {faMedal} size = {25} style = {styles.contentIcon}  />     
                        <Text style = {styles.profileContentStyling}>Degree :- {item.networkProfileDegreeName}</Text>
                        </View>
                        <View style = {styles.contentGroup}>
                        <FontAwesomeIcon icon = {faCalendarDay} size = {25} style = {styles.contentIcon}  />     
                        <Text style = {styles.profileContentStyling}>Time :- {item.networkProfileDegreeTime}</Text>
                        </View>
                        <View style = {styles.contentGroup}>
                        <FontAwesomeIcon icon = {faFileLines} size = {25} style = {styles.contentIcon}  />     
                        <Text style = {styles.profileContentStyling}>GPA :- {item.networkProfileDegreeGpa}</Text>
                        </View>
                        <Text style = {styles.titleHeading}>
                            Work Details
                        </Text>
                        <View style = {styles.contentGroup}>
                        <FontAwesomeIcon icon = {faLocationDot} size = {25} style = {styles.contentIcon}  />     
                        <Text style = {styles.profileContentStyling}>Preferred Location :- {item.networkProfilePreferredLocation}</Text>
                        </View>
                        <View style = {styles.contentGroup}>    
                        <FontAwesomeIcon icon = {faBuilding} size = {25} style = {styles.contentIcon}  />     
                        <Text style = {styles.profileContentStyling}>Company Name :- {item.networkProfileCompanyName}</Text>
                        </View>
                        <View style = {styles.contentGroup}>
                        <FontAwesomeIcon icon = {faClipboard} size = {25} style = {styles.contentIcon}  />     
                        <Text style = {styles.profileContentStyling}>Work Description :- {item.networkProfileWorkDescription}</Text>
                        </View>
                        <View style = {styles.contentGroup}>
                        <FontAwesomeIcon icon = {faToolbox} size = {25} style = {styles.contentIcon}  />     
                        <Text style = {styles.profileContentStyling}>Experience :- {item.networkProfileWorkTenure}</Text>
                        </View>
                        <Text style = {styles.titleHeading}>
                            Project
                        </Text>
                        <View style = {styles.contentGroup}>
                        <FontAwesomeIcon icon = {faCode} size = {25} style = {styles.contentIcon}  />     
                        <Text style = {styles.profileContentStyling}>Project Name :- {item.networkProfileProjectName}</Text>
                        </View>
                        <View style = {styles.contentGroup}>
                        <FontAwesomeIcon icon = {faReadme} size = {25} style = {styles.contentIcon}  />     
                        <Text style = {styles.profileContentStyling}>Description :- {item.networkProfileProjectDescription}</Text>
                        </View>
                        <View style = {styles.contentGroup}>
                        <FontAwesomeIcon icon = {faSquareGithub} size = {25} style = {styles.contentIcon}  />     
                        <Text style = {styles.profileContentStyling}>URL :- {item.networkProfileProjectLink}</Text>
                        </View>
                    {/*   
                       <View style = {styles.followButtonWrapping}> 
                        <TouchableOpacity style = {styles.followButtonStyling}>
                             <Text style = {styles.followButtonTextStyling}>Follow</Text>     
                        </TouchableOpacity>
                       </View>  
                    */}            
               </View> 
               )
           ) 
           }    
       </View>      
 </View>   
 </ScrollView> 
         )
}

export default IndividualCard;

const styles = StyleSheet.create(
   {

       mainPage : {
            width:'100%' ,
            backgroundColor:'rgba(64,64,64,1)' ,
            height:'100%',
            flex:1
       },
       profileCard : {
            width:'100%' ,
            height:'100%' ,
            backgroundColor:'rgba(64,64,64,1)' ,
       } ,
       fontIconProfileStyling : {
          color:'white', 
       } ,
       profileHeadingStyling : {
          fontSize:25 ,
          textAlign:'left' ,
          fontStyle:'normal',
          color:'white', 
          paddingTop:5,
          paddingLeft:3,
       },
       profileTitleStyling : {
          fontSize:21 ,
          textAlign:'left',
          color:'white',
          paddingTop:5,
          paddingLeft:3 
       },
       profileContentStyling : {
          fontSize:18 ,
          textAlign:'left' ,
          color:'white',
          paddingTop:3,
          paddingLeft:3 
       },
       iconWrapper : {
          display:'flex' ,
          justifyContent:'center',
          alignItems:'center',
          marginTop:16 ,
          borderLeftColor:'white' ,
          borderRightColor:'white' ,
          borderTopColor:'white' ,
          borderBottomColor:'white' ,
          borderWidth:4,  
          paddingTop:14,
          paddingBottom:14,
          marginLeft:'30%',
          marginRight:'30%',
          borderRadius:20,
       },

       contentGroup : {
           display:'flex' ,
           flexDirection:'row',
           gap:6,
           paddingTop:7,
           paddingLeft:5
       },
       contentIcon : {
          color:'white'
       },
       titleHeading : {
          fontSize:25 ,
          color:'white',
          paddingTop:20,
          paddingLeft:5,
       } ,
       skillWrapping : {
          paddingTop:8,
       } ,

       followButtonStyling : {
          width:'40%' ,
          backgroundColor:'blue' ,
          height:'14%',
          borderRadius:6,
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          marginTop:'4%',
          marginBottom:'20%',
          color:'white'
       },
       followButtonTextStyling:{
           fontSize:15,
           color:'white'
       },
       followButtonWrapping : {
           display:'flex',
           justifyContent:'center',
           alignItems:'center'
       } 


      
   }
)