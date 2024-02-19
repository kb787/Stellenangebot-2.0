import { StyleSheet, Text, View,SafeAreaView,TextInput,TouchableOpacity,ScrollView } from 'react-native'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome' 
import {faBell,faMessage,faSuitcase,faUser,faUserGroup} from '@fortawesome/free-solid-svg-icons'
import React from 'react' ;
import { useNavigation } from '@react-navigation/native'

const Navbar = () => {
   const navigator = useNavigation() ;
   return (
         <View style = {styles.mainContainerNavbar}>
            <ScrollView horizontal = {true}>
                <View style = {styles.mainSubContainer}>
                    <Text style = {styles.navbarTitle}>
                       Stellenangebot
                    </Text>
                    <TextInput 
                       placeholder="Enter your role"
                       style = {styles.navbarInputForms}
                    /> 
                    <TextInput
                       placeholder="Enter your preferred location"
                       style = {styles.navbarInputForms}
                    />
                    <TouchableOpacity>
                    <FontAwesomeIcon icon = {faMessage} style={styles.fontItem} size = {21} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <FontAwesomeIcon icon = {faBell} style={styles.fontItem} size = {21} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => navigator.navigate("Browsing")}>
                    <FontAwesomeIcon icon = {faSuitcase} style={styles.fontItem} size = {21} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => navigator.navigate("NewUserProfile")}>
                    <FontAwesomeIcon icon = {faUser} style={styles.fontItem} size = {21} />
                    </TouchableOpacity> 
                    <TouchableOpacity onPress = {() => navigator.navigate("GeneralCard")}>
                    <FontAwesomeIcon icon = {faUserGroup} style={styles.fontItem} size = {21} />
                    </TouchableOpacity>
                </View>  
            </ScrollView>          
         </View>


   )
}

export default Navbar ;

const styles = StyleSheet.create(
   {
       mainContainerNavbar : {
           display:'flex' ,
           backgroundColor:'black' ,
           color:'yellow', 
           height:40
       } ,
       mainSubContainer:{
          flex:1 ,
          display:'flex' ,
          flexDirection:'row' ,
          justifyContent:'space-between',
          alignContent:'flex-start'
          } ,
       navbarTitle : {
          fontSize:15 ,
          color:'yellow',
          paddingTop:9 
         } ,
       navbarInputForms : {
          color:'yellow',
          width:'23%',
          height:10,
          borderWidth:1 ,
          borderColor:'white',
          marginTop:7.5,
          alignItems:'flex-start',
          borderRadius:12,
          marginLeft:10,
       },
       fontItem : {
           color:'yellow',
           width:12,
           height:12,
           marginLeft:20,
           marginTop:6
           
       },
       scrolling : {
          width:800
       }

   }
)