/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import Homescreen from './components/MainContent/Homescreen';
import MainContainer from './components/CardComponents/MainContainer';
import NewUserProfile from './components/User/NewUserProfile';
import GeneralCard from './components/Networking/GeneralCard';
import IndividualCard from './components/Networking/IndividualCard';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;
const Stack = createStackNavigator();
function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return ( 
       <NavigationContainer>
          <Stack.Navigator initialRouteName="Homescreen">
            <Stack.Screen name = "Homescreen" component = {Homescreen} /> 
            <Stack.Screen name = "Register" component = {Register} />
            <Stack.Screen name = "Login" component = {Login} />
            <Stack.Screen name = "Browsing" component = {MainContainer} />
            <Stack.Screen name = "NewUserProfile" component = {NewUserProfile} />
            <Stack.Screen name = "GeneralCard" component = {GeneralCard} /> 
            <Stack.Screen name = "IndividualCard" component = {IndividualCard} /> 
          </Stack.Navigator> 
       </NavigationContainer> 
  )
  }  
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
