import { StyleSheet, Text, View,TextInput,TouchableOpacity,SafeAreaView,ScrollView,Image } from 'react-native'
import React from 'react' 
import { useNavigation } from '@react-navigation/native'

const Homescreen = () => {
    const navigation = useNavigation() ;
     return (
        <ScrollView>
              <View style = {styles.mainContainer}>
                    <View>
                         <View>
                              <Image source={require("D:/Stellangebot-App-2/myapp/images/homepageImg.png")}
                                style = {styles.cardImage}
                              />
                         </View>
                         <View style = {styles.subContainerCard}>
                            <Text style = {styles.cardMainContent}>
                            Welcome to Stellenangebot  – Where Talent Meets Opportunity!
                            </Text>
                            <Text style = {styles.cardSubContent}>
                            Are you seeking top-tier talent to drive your company's success or a seeker finding for an ideal opportunity. Look no further! Stellenangebot is the ultimate destination for discovering a skilled professional poised to elevate your team.Also for a seeker it recommends the best suited jobs and internship opprtunites based on preferences
                            </Text>
                         </View>
                         <View style = {styles.subContainerCard}>
                            <Text style = {styles.cardMainContent}>
                            Why Choose Stellenangebot?
                            </Text>
                            <Text style = {styles.cardSubContent}>
                            🎯 Precision Matching: Our cutting-edge algorithms connect you with candidates whose skills align perfectly with your requirements, ensuring a seamless fit for your organization. This is also true for seekers applying to jobs or internships{'\n'}{'\n'}
                            📈 Dynamic Portfolios: Dive into detailed portfolios that go beyond resumes, providing a holistic view of candidates' achievements, projects, and the unique value they bring to the table.{'\n'}{'\n'}
                            💼 Personalized Profiles: Candidates on Stellenangebot showcase their personalities alongside their professional achievements, giving you insight into the individuals behind the qualifications.{'\n'}{'\n'}
                            🚀 Career Growth Insights:
Get a 360-degree view of your professional development. 
Stellenangebot offers personalized insights and resources to help you navigate your career path whether you're starting out or aiming for the next level{'\n'}{'\n'}
                            </Text>
                            <View>
                            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("Register")}>
                               <Text style = {styles.registerButtonText}>Explore More</Text>
                           </TouchableOpacity>
                           </View>
                         </View>
                    </View>
              </View>
        </ScrollView>
     )
}

export default Homescreen ;

const styles = StyleSheet.create(
    {
         mainContainer : {
            backgroundColor:'black',
            color:'yellow'
         },
         mainSubContainer:{},
         subContainerCard:{
             padding:6,
             borderColor:'darkgrey'
         } ,
         cardImage : {
             height:350
        } ,
         cardMainContent : {

            color:'yellow',
            fontWeight:'bold',
            fontSize:20,
            paddingTop:10,
            paddingLeft:5,
            paddingRight:5

         } ,
         cardSubContent : {
            color:'yellow',
            fontSize:16,
            paddingTop:8,
            paddingLeft:5,
            paddingRight:5
         },
         registerButton:{
            width:130,
            backgroundColor:'blue',
            marginLeft:110,
            marginRight:110,
            borderRadius:5,
            justifyContent:'center',
            alignItems:'center',
            marginTop:20,
            fontSize:35,
            color:'white',
            marginBottom:7,
            height:45
  
       } ,
  
       registerButtonText:{
            color:'white',
       } 

    }
)