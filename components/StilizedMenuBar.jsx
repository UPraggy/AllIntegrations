import React from 'react'
import {View,Text, Image} from 'react-native'



const styleNavbar= {
	position: 'absolute',
	height: 90,
	width: '80%',
	bottom: 25,
	left:20,
	right:20,
	backgroundColor: "#fff",
	borderRadius: 15,
	paddingBottom: 10,
	elevation: 5,
	shadowColor: "#7F5DF0",
	shadowOffset:{
		height: 10,
		width: 0
	},
	shadowRadius: 3.5,
}

const styleMenuBtn = {
	position: 'absolute',
	bottom: 25,
	right: 7,
	width: "10%",
	alignSelf:'flex-end',
	backgroundColor: "#fff",
	width: 40,
	height: 40,
	borderRadius: 15,
	padding: 5,
	elevation: 5,
}

const renderScreenIcon = function (focused, name, icon=require('./statics/homeIcon.png'), focuscolor1 ="#3285a8", focuscolor2="#748c94") {
	let tint = {}
	if (focuscolor1 != false){
		tint = {tintColor: focused ? focuscolor1 : focuscolor2}
	}else{
		tint = {opacity: focused ? 1 : 0.5}
		focuscolor1 = "#3285a8";
	}
	return <View style={{alignItems:"center",justifyContent:'center',top:0}}>
		<Image
		source={icon}
		resizeMode='contain'
		style={[{width: focused ? 30 : 25,
				height: focused ? 30 : 25},tint]}>
		</Image>
		<Text style={{color: focused ? focuscolor1 : focuscolor2}}>{name}</Text>
	</View>
}


export default {renderScreenIcon,styleNavbar,styleMenuBtn}