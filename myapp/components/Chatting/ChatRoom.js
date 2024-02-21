import {View,TextInput,TouchableOpacity,Text,StyleSheet,ScrollView} from "react-native" ;
import React,{useState} from "react" ;
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; 
import {faFile,faMicrophone,faCamera,faUserTie} from "@fortawesome/free-solid-svg-icons";
const ChatRoom = () => {
   const [message,setMessage] = useState('') ;
   const [chats,setChats] = useState([]) ;

   return (
      <View style = {styles.mainPage}>
          <View style = {styles.mainPageNavbar}>
            <FontAwesomeIcon icon = {faUserTie} size = {15} style = {styles.navbarIcon} />
            <Text>
               Mr.X
            </Text> 
          </View>
          <View style = {styles.inputContent}>
              <View style = {styles.inputCollection}>
                 <TextInput style = {styles.textInputStyling}  placeholder="Enter a message" value={message} onChangeText={(text) => setMessage(text)}  
                 />
                 <View style = {styles.buttonWrapping}>    
                   <TouchableOpacity style = {styles.sendButtonStyling}>
                     <Text style = {styles.buttonTextStyling}>Send</Text> 
                  </TouchableOpacity> 
                 </View>                                                  
              </View>  
              <View style = {styles.fontIconCollection}>
                 <FontAwesomeIcon style = {styles.iconStyling} icon = {faFile} size = {35} />
                 <FontAwesomeIcon style = {styles.iconStyling} icon = {faCamera} size = {35} />
                 <FontAwesomeIcon style = {styles.iconStyling} icon = {faMicrophone} size = {35} />
             </View> 
          </View>   
      </View> 
   )
}

export default ChatRoom ;

const styles = StyleSheet.create(
   {
        inputCollection : {
            display:'flex' ,
            justifyContent:'center',
            alignItems:'flex-end',
            flexDirection:'row' ,
            gap:5, 
            marginLeft:2
        } ,
        sendButtonStyling : {
           backgroundColor:'blue' ,
           borderRadius:4 ,
           width:100,
           height:50,
        } ,
        buttonTextStyling : {
           fontSize:20,
           color:'white' ,  
           display:'flex',
           justifyContent:'center',
           textAlign:'center',
           alignItems:'center',
           lineHeight:50
        } ,
        buttonWrapping : {
           marginTop:16
        },
        textInputStyling : {
           borderColor:'white' ,
           color:'white',
           width:260,
           height:50,
           borderWidth:2 ,
           marginTop:16,
           borderRadius:5,
           display:'flex' ,
           justifyContent:'center' ,
           alignItems:'center',
           alignContent:'center',
           paddingLeft:'4%',
        },
        fontIconCollection : {
            display:'flex' ,
            flexDirection:'row' ,
            justifyContent:'center' ,
            alignItems:'flex-start',
            paddingTop:10,
            gap:12
        } ,
        mainPage : {
          width:'100%' ,
          height:'100%' ,
          backgroundColor:'black' ,  
        } ,
        iconStyling : {
           color:'white' ,
        } ,
        inputContent : {
           display:'flex' ,
           backgroundColor:'rgba(64,64,64,1)', 
           marginLeft:'2%',
           marginRight:'2%',
           height:'22%',
           borderRadius:8,
           marginTop:'92%',
        } ,
        mainPageNavbar : {
           display:'flex',
           backgroundColor:'rgba(64,64,64,1)',
           marginLeft:'2%',
           marginRight:'2%',
           height:'9%',
           borderRadius:8,   
           marginTop:'2%'
        },
        navbarIcon : {
          color:'white',
          paddingTop:'1%',
          paddingLeft:'1%',
          borderColor:'white',
          borderRadius:'50%',
          borderWidth:3       
        }
   }
)