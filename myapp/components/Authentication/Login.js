import { StyleSheet, Text, View,TextInput,TouchableOpacity,SafeAreaView } from 'react-native'
import React,{useState} from 'react' 
import { useNavigation } from '@react-navigation/native'
import axios from 'axios' 
import Toast from 'react-native-toast-message'

const Login = () => {
  const navigator = useNavigation() ;

  const [userEmail,setUserEmail] = useState('') ;
  const [userPassword,setUserPassword] = useState('') ;
  
  const handleRegisterButtonClick = async() => {
        try {
             const postResponse = await axios.post("http://192.168.43.148:3500/v2/api/postUserLogin",{
                    userEmail:userEmail,
                    userPassword:userPassword
                }
             )
             console.log(postResponse) ;
             if(postResponse.data && postResponse.data.success){
                  
                  navigator.navigate("Browsing")
                  Toast.show('Login successfull')     
             }
             else {
                  Toast.show('Invalid credentials')
             }
        }
        catch(error){
             console.log(error) 
             Toast.show('Server side error occured') 
        } 
  }   
  return (
    <View style = {styles.mainContainerRegister}>
         <View style = {styles.registerContainer}>
         <View>
            <Text style={styles.registrationHeading}>Verify your credentials</Text> 
          </View> 
              <TextInput keyboardType='email-address' placeholder="Enter your email address" style = {styles.registerTextInput2} placeholderTextColor='yellow' value = {userEmail} onChangeText = {(text) => setUserEmail(text) }  />
              <TextInput type='password' placeholder="Enter password" style = {styles.registerTextInput3} placeholderTextColor='yellow' secureTextEntry={true} value = {userPassword} onChangeText = {(text) => setUserPassword(text)}   />
              <TouchableOpacity style={styles.registerButton} onPress={handleRegisterButtonClick}>
                   <Text style = {styles.registerButtonText}>Login</Text>
              </TouchableOpacity>
              <View>
               <TouchableOpacity onPress={() => navigator.navigate("Register")}>
                  <Text style={styles.loginHeading}>Not having an account Register Here!</Text>
               </TouchableOpacity>
               </View>
         </View>
    </View>

  )
}

export default Login ;

const styles = StyleSheet.create({
     mainContainerRegister : {
          backgroundColor:'rgba(64,64,64,1)' ,
          height:'100%' ,
          width:'100%'
     },
     registerContainer : {
          backgroundColor:'black' ,
          marginLeft:45,
          marginRight:45,
          color:'yellow' ,
          marginTop:85,
          height:320,
          borderRadius:15          

     },
     registerTextInput : {
          width:45 ,
          height:40 , 
          width:'80%',
          borderWidth:1,
          borderColor:'white',
          marginTop:30,
          marginLeft:25,
          borderRadius:10,
          color:'yellow',
          fontSize:15,
     } ,

     registerTextInput2 : {
        width:45 ,
        height:10 , 
        width:'80%',
        height:40,
        borderWidth:1,
        borderColor:'white',
        marginTop:12,
        marginLeft:25,
        borderRadius:10,
        color:'yellow',
        fontSize:15,
   } ,
   registerTextInput3 : {
    width:45 ,
    height:10 , 
    width:'80%',
    height:40,
    borderWidth:1,
    borderColor:'white',
    marginTop:12,
    marginLeft:25,
    borderRadius:10,
    color:'yellow',
    fontSize:15,
} ,
     
     registerButton:{
          width:100,
          backgroundColor:'blue',
          marginLeft:80,
          marginRight:80,
          borderRadius:5,
          justifyContent:'center',
          alignItems:'center',
          marginTop:20,
          fontSize:25,
          color:'white',
          height:35

     } ,

     registerButtonText:{
          color:'white',
     } ,
 
     registrationHeading:{
          color:'yellow',
          fontSize:15,
          paddingTop:20,
          paddingLeft:30
     },
     loginHeading:{
          color:'yellow',
          fontSize:15,
          paddingTop:20,
          paddingLeft:16
     }

})