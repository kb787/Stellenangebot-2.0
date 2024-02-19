import Navbar from "../MainContent/Navbar";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import CardFetching from "./CardFetching";
import CardFetchingDomain1 from "./CardFetchingDomain1";
import CardFetchingDomain2 from "./CardFetchingDomain2";
import CardFetchingDomain3 from "./CardFetchingDomain3";
const MainContainer = () => {
  return (
   <ScrollView> 
    <View>
    <Navbar/>
    <View> 
      <View> 
        <View style = {styles.mainPageHeadingContainer}>
        <Text style = {styles.mainPageHeading}>Recently Posted</Text>
        </View> 
        <CardFetching/>
      </View> 
      <View> 
        <View style = {styles.mainPageHeadingContainer}>
        <Text style = {styles.mainPageHeading}>Web/Mobile App Development</Text>
        </View> 
        <CardFetchingDomain1/>
      </View> 
      <View> 
        <View style = {styles.mainPageHeadingContainer}>
        <Text style = {styles.mainPageHeading}>Machine Learning/Data Science/DevOps</Text>
        </View> 
        <CardFetchingDomain2/>
      </View> 
      <View> 
        <View style = {styles.mainPageHeadingContainer}>
        <Text style = {styles.mainPageHeading}>Sales/Marketing/Human Resource</Text>
        </View> 
        <CardFetchingDomain3/>
      </View>
    </View>      
    </View>
    </ScrollView> 
  )
}

export default MainContainer ;

const styles = StyleSheet.create(
   {
       mainPageHeading: {
           fontSize:22,
           color:'yellow',
           textAlign:'left',
           fontWeight:'bold',
           marginTop:15
      } ,
      mainPageHeadingContainer : {
          backgroundColor:'black',
          paddingTop:6,
          paddingBottom:6
      } 
     
   } 
)

