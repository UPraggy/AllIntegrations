import React, {useState,useEffect} from 'react'
import {View,Text, StyleSheet,Modal, Image,Pressable} from 'react-native'
import MeuEstilo from './statics/MeuEstilo'
import TopMenuWidgets from './TopMenuWidgets'
import HomePage from './Home'
import Api_Specific_Book from './Api_Specific_Book'
import DailyLiturgy from './DailyLiturgy'

import CustomizedBtn from './CustomizedButton'

import StilizedMenuBar, {renderScreenIcon,styleNavbar,styleMenuBtn} from './StilizedMenuBar'
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);


const Stack = createBottomTabNavigator();

const styles = StyleSheet.create({
		centerView:{
			justifyContent:'center',
			alignItems:'center'
		}
	})



function Home(navigation){
	useEffect(() => {
    const unsubscribe = navigation.navigation.addListener('focus', () => {
      	props = navigation.route.params
    		
				props.setMenuBtn(true)
				props.setShowMenuBtn(true)
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

	return (
		<View style={MeuEstilo.containerPrincipal}>
		<TopMenuWidgets /*buttons={[api_specific]}*/ slogan="Bem Vindo"/>
		<HomePage navigation= {navigation}/>
		</View>
		);
}

function BibleApi(navigation){

	useEffect(() => {
    const unsubscribe = navigation.navigation.addListener('focus', () => {
      	props = navigation.route.params
    		
				props.setMenuBtn(true)
				props.setShowMenuBtn(true)
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

	return (
		<View style={MeuEstilo.containerPrincipal}>
		<TopMenuWidgets slogan="Bible with API"/>
		<Api_Specific_Book />
		</View>
		);
}

function DailyLitg(navigation){


	return (
		<View style={MeuEstilo.containerPrincipal}>
		<DailyLiturgy navigation= {navigation}/>
		</View>
		);
}





function Navigator(props){
	const [functions, setFunctions] = useState(0);

	const [showModal, setShowModal] = useState(true)

	const [menuBtn, setMenuBtn] = useState(true)

	const [showMenuBtn, setShowMenuBtn] = useState(true)

	useEffect(()=>{
		if (functions != 1){
			setTimeout(()=>{
				setShowModal(false)
				setFunctions(1)
			},1300)
			
		}		
	})

  return (
  	<View style={{width:"100%",height:"100%"}}>
  	<Modal
			animationType="fade"
			visible={showModal}
			>

			<View style={[styles.centerView,{width:"100%",height:"100%",backgroundColor:'#ffd4c7'}]}>
				
			<View style={[styles.centerView,{width:'80%',height:'40%',borderRadius:800, elevation:40,shadowColor:"#401001"}]}>	
			<Image 
			style={{width:'80%',height:'80%',resizeMode:"contain",borderRadius:800}}
			source={require('./statics/logo.png')}></Image>
			</View>
			</View>

	</Modal>


     <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Home"
      headerMode="none"
      screenOptions={{ 
      headerShown: false,
  		tabBarStyle: StilizedMenuBar.styleNavbar,
  		tabBarShowLabel: false
  	}
	}>
        <Stack.Screen 
        	name="Home" 
        	component={Home} 
        	initialParams={{setMenuBtn,setShowMenuBtn}}
        	options={{
        		tabBarIcon: ({focused})=>StilizedMenuBar.renderScreenIcon(focused,"Home" ,require('./statics/homeIcon.png')),
        		tabBarStyle: [StilizedMenuBar.styleNavbar,{display : menuBtn ? 'flex' : 'none'}]
        	}}/>

        	<Stack.Screen 
        	name="BibleApi" 
        	component={BibleApi} 
        	initialParams={{setMenuBtn,setShowMenuBtn}}
        	options={{
        		tabBarIcon: ({focused})=>StilizedMenuBar.renderScreenIcon(focused,"BibleApi" ,require('./statics/bibleIconNav.png')),
        		tabBarStyle: [StilizedMenuBar.styleNavbar,{display : menuBtn ? 'flex' : 'none'}]
        	}}/>

        	<Stack.Screen 
        	name="DailyLitg" 
        	component={DailyLitg} 
        	initialParams={{setMenuBtn,setShowMenuBtn}}
        	options={{
        		tabBarIcon: ({focused})=>StilizedMenuBar.renderScreenIcon(focused,"Liturgia Diaria" ,require('./statics/bookIcon.png')),
        		tabBarStyle: [StilizedMenuBar.styleNavbar,{display : menuBtn ? 'flex' : 'none'}]
        	}}/>


      </Stack.Navigator>
    </NavigationContainer> 
	{showMenuBtn ? <Pressable  style={[StilizedMenuBar.styleMenuBtn]} onPress={()=>setMenuBtn(!menuBtn)}>
			<Image 
			style={{width:'100%',height:'100%',resizeMode:"contain"}}
			source={menuBtn ? require('./statics/closeIcon.png') : require('./statics/menuIcon.png')}></Image>
		</Pressable> : <></>}
    </View>
  );
}


export default Navigator;


