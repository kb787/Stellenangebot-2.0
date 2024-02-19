import React from "react"
import {useState,useEffect} from'react' 
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import {View,Text,StyleSheet} from 'react-native' 

const CardFetchingDomain3 = () => {
     const [data,setData] = useState([]) ;
     useEffect(() => {
          const handleFetchGeneralJobsData = async() => {
                try {
                    let fetchResponse = await fetch("http://192.168.43.148:3500/v6/api/getDataCategory4") ;
                    if(!fetchResponse){
                         Toast.show({
                            type:'error',
                            text1:'Unable to get data',
                    })
                    }
                    else {
                        jsonData = await fetchResponse.json() ;
                        if(Array.isArray(jsonData)){
                             setData(jsonData)
                        }
                        else {
                             Toast.show({
                                type:'error',
                                text1:'Data is in invalid form'
                             })
                        }
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
          handleFetchGeneralJobsData()},[])

          return  ( 
            (data?.map((item) =>  
                <View  key = {item._id}>     
                <View style = {styles.cardEntireContainer}>   
                    <View style = {styles.mainCardElement}>
                         <Text style = {styles.textStyling}>Role :- {item.jobTitle}</Text>
                         <Text style = {styles.textStyling}>Company :- {item.jobCompany}</Text>
                         <Text style = {styles.textStyling}>Location :-  {item.jobLocation}</Text>
                         <Text style = {styles.textStyling}>Skills :-  {item.jobSkills}</Text>
                         <Text style = {styles.textStyling}>Location type :- {item.jobLocationType}</Text>           
                    </View>
                </View>
            </View>    
                )

            )      
          )
}

export default CardFetchingDomain3;

const styles = StyleSheet.create(
    {   
        mainCardInnerContent: {
            paddingTop:5,
            paddingBottom:5
        },
        mainCardElement : {
             justifyContent:'center',
             alignItems:'center',
             backgroundColor:'black',
             width:'100%',
            
        } ,

        textStyling : {
            fontSize:15,
            color:'yellow',
        } ,
        cardEntireContainer : {
            borderTopColor:'darkgrey',
            borderBottomColor:'darkgrey', 
            borderBottomWidth: 2,
            borderTopWidth:2,
            borderRightColor:'darkgrey',
            borderRightWidth:2,
            borderLeftWidth:2,
            borderLeftColor:'darkgrey'
        }, 
    }
)