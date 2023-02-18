import React from 'react'
import {View, Text, Image,
		StyleSheet,Pressable,Linking} from 'react-native'

const styles = StyleSheet.create({
		centerView:{
			justifyContent:'center',
			alignItems:'center'
		},
		button: {
	    //elevation: 3,
	  },
	})



function OpenLinkURL(link){
	Linking.openURL(link);
}


function createButtonLink(icon = require('./statics/LinkedinIcon.png'), link='https://www.linkedin.com/in/rafael-moreira-ramos-de-rezende-16420b21b/', shadow=10, shadowcolor="#57F"){
	return <Pressable  style={{width:40,height:40,borderRadius:900, elevation: shadow, shadowColor:shadowcolor}} onPress={()=>OpenLinkURL(link)}>
			<Image 
			style={{width:'100%',height:'100%',resizeMode:"contain",borderRadius:900}}
			source={icon}></Image>
		</Pressable>
}


export default props => {


	return <View style={{width:"100%", height: "100%", backgroundColor:'#fff'}}>

	<Text style={{fontSize:25, textAlign:'center', marginVertical: "6%"}}>App desenvolvido com objetivo de englobar todos
	os projetos sobre ReactNative</Text>

	<Text style={{fontSize:25,color:"#3275a8", marginBottom: "4%", marginLeft:"4%"}}>Desenvolvido por:</Text>

	<View style={[styles.centerView,{height:"30%", justifyContent:"flex-start",alignItems:"flex-start", flexDirection:"row"}]}>


		<Pressable  style={[styles.centerView,{width:150,height:150,borderRadius:900, elevation: 30, shadowColor:"#401001bb"}]} onPress={()=>OpenLinkURL('https://www.rafaelmr.com.br/portifolio')}>
			<Image 
			style={{width:'80%',height:'80%',resizeMode:"contain",borderRadius:900}}
			source={require('./statics/logo.png')}></Image>
		</Pressable>
		
		<View>
		<Text style={{fontSize:25,color:"#000", marginBottom: "5%", marginLeft:"4%", marginTop:"10%"}}>Rafael Moreira</Text>

			<View style={{flexDirection:"row", justifyContent:"space-around"}}>

			{createButtonLink(require('./statics/internetIcon.png'),
				'https://www.rafaelmr.com.br/portifolio',20,"#00000055")}
			
			{createButtonLink(require('./statics/LinkedinIcon.png'),
				'https://www.linkedin.com/in/rafael-moreira-ramos-de-rezende-16420b21b/')}

			{createButtonLink(require('./statics/mailIcon.png'),
				'mailto:rafaelmoreira2001ofc@gmail.com',0)}

			{createButtonLink(require('./statics/gitIcon.png'),
				'https://github.com/UPraggy',10,"#55555544")}

			</View>


		</View>


	</View>
	
	<Text style={{fontSize:25, textAlign:'center'}}>Selecione o Aplicativo desejado no menu abaixo</Text>

	</View>
	
}


