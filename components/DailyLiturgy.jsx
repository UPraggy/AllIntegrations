import React, {useState, useEffect} from 'react'
import {View,Text,StyleSheet,
		ScrollView,Image,
		Pressable,ActivityIndicator,
	ImageBackground} from 'react-native'

import MeuEstilo from './statics/MeuEstilo'
import StilizedMenuBar, {renderScreenIcon,styleNavbar,styleMenuBtn} from './StilizedMenuBar'
import getDaily from './getDailyLiturgy'

function setCorLit(cor){
	cor = cor.toLowerCase()
	let cores = ["verde", "branco", "vermelho", "roxo", "preto", "rosa"]
	let coresHex = ["#1d9902","#e9ebe8","#9e1402","#4a0273","#000000","#d402a6"]
	for (let x=0; x<cores.length; x++){
		if(cor.indexOf(cores[x]) != -1){
			return coresHex[x]
		}
	}
}

function formatVersiculo(text){
	text = text.replace(/(\r\n|\n|\r|\t)/gm,"")

	let letr = text.split(/\d+/g)
	let num =  text
	letr.forEach((val,i)=>{
		num = num.replace(val,"Versiculo")
	});
	
	
	num = num.split("Versiculo")

	//lineBreak: 'auto'
	num = num.map((val,i)=>{
		if (i > 0 && i < num.length-1){

			return <Text key={i}>
			{letr[i].length < 2 ? <Text style={styles.versicleStyle}>{val}{letr[i]}</Text> : 
				<>
					<Text  style={styles.versicleStyle}>{val}{". "}</Text>
				  	<Text  style={styles.textStyle}>{letr[i]}{"\n"}</Text>
				</>
			  }
			</Text>
		}else{
			return ;
		}
	})

	return num
}

function PrimeiraLeitura(resp,setTitle){
	setTitle(resp.primeiraLeitura[0])
	//<Text style={{fontSize:25, textAlign: 'center'}}>{" "}{}</Text>
	return <Text style={{fontSize:20}}>{"\n"}{formatVersiculo(resp.primeiraLeitura[2])}</Text>
}

function Salmo(resp,setTitle){
	setTitle(resp.salmo[0])
	return <Text style={{fontSize:20}}>{"\n"}{resp.salmo[1]}</Text>
}

function Evangelho(resp,setTitle){
	setTitle(resp.evangelho[0])
	//<Text style={{fontSize:25, textAlign: 'center'}}>{" "}{}</Text>
	return <Text style={{fontSize:20}}>{"\n"}{formatVersiculo(resp.evangelho[1])}</Text>
}

function setLeitura(resp,setTitle,leitura){
	if (leitura === "primeiraLeitura"){
		return PrimeiraLeitura(resp,setTitle)
	}
	else if (leitura === "salmo"){
		return Salmo(resp,setTitle)
	}
	else if (leitura === "evangelho"){
		return Evangelho(resp,setTitle)
	}
	return ;
}


export default props => {

	const [subMenuBtn, setsubMenuBtn] = useState(true)

	const [liturgia, setliturgia] = useState('');

	const [actualApp,setActualApp] = useState(null)

	const [title, setTitle] = useState(null);
	
	const [option, setOption] = useState([true,false,false,false]);

	useEffect(
		()=>{
			
			const unsubscribe = props.navigation.navigation.addListener('focus', () => {
	      		let temp = props.navigation.route.params
	      		getDaily()
					.then(resp => {
						setliturgia(resp)
						setActualApp(setLeitura(resp,setTitle,'primeiraLeitura'))
					})
				temp.setMenuBtn(false)
				temp.setShowMenuBtn(false)
				setOption([true,false,false,false]);
		    });

		    // Return the function to unsubscribe from the event so it gets removed on unmount
		    return unsubscribe;
		  }, [props.navigation]);

	
//{backgroundColor:"#4ca88d"}
	return (

		
		<View style={[MeuEstilo.containerPrincipal,{backgroundColor: "#633e3e"}]}>

		
		<View style={{width:"100%",height: "88%", margin: 0}}>

		<View style={styles.titleView}>
			<Text style={[styles.titleViewText,{fontSize: title != null && title.length > 30 ? 20 : 30}]}>{liturgia === '' ? '...' : title ? title.split("(").join("\n(") : "..."}</Text>

			<View style={styles.titleSubView}>
			<Image style={[styles.titleSubViewImg,{tintColor:liturgia === '' ? "#badabb" :setCorLit(liturgia.corLiturgica[0])}]} 
				source={require('./statics/flagIcon.png')}></Image>
			<Text style={{fontSize:15,color:"#fff"}}>{liturgia === '' ? 'carregando' : liturgia.corLiturgica[1]}</Text>
			</View>

		</View>


		<ScrollView style={styles.scrollV}
		contentContainerStyle={{flex: actualApp? 0 : 1,justifyContent:"center",alignItems:'center'}}>
			{actualApp ? 
			
			<View style={[{width:"100%"}]}>{actualApp}</View>

			: <View>
			<ActivityIndicator size="large" color="#00aad9"/>
			</View>}

		
		</ScrollView>


		</View>
		
		{subMenuBtn ? <View style={[StilizedMenuBar.styleNavbar,
							{flexDirection:"row",justifyContent:"space-around",alignItems:"flex-start"}]}>

			<Pressable style={{top:'5%'}} onPress={()=>{
				setOption([true,false,false,false]);
				setActualApp(setLeitura(liturgia,setTitle,'primeiraLeitura'));
			}}>
				{StilizedMenuBar.renderScreenIcon(option[0],"1ª leitura" ,require('./statics/bibleIcon.png'),false)}
			</Pressable>

			<Pressable style={{top:'5%'}} onPress={()=>{
				setOption([false,true,false,false]);
				setActualApp(setLeitura(liturgia,setTitle,'salmo'));
			}}>
				{StilizedMenuBar.renderScreenIcon(option[1],"Salmo" ,require('./statics/salmoIcon.png'),false)}
			</Pressable>

			<Pressable style={{top:'5%'}} onPress={()=>{
				setOption([false,false,true,false]);
				setActualApp(setLeitura(liturgia,setTitle,'evangelho'));
			}}>
				{StilizedMenuBar.renderScreenIcon(option[2],"Evangelho" ,require('./statics/EvangelhoIcon.png'),false)}
			</Pressable>

			<Pressable style={{top:'5%'}} onPress={()=>props.navigation.navigation.navigate('Home')}>
				{StilizedMenuBar.renderScreenIcon(option[3],"Home" ,require('./statics/homeColorIcon.png'),false)}
			</Pressable>

		</View> : <></>}

		<Pressable  style={[StilizedMenuBar.styleMenuBtn]} onPress={()=>setsubMenuBtn(!subMenuBtn)}>
			<Image 
			style={{width:'100%',height:'100%',resizeMode:"contain"}}
			source={subMenuBtn ? require('./statics/closeIcon.png') : require('./statics/menuIcon.png')}/>
		</Pressable>
		</View>
		

		);
}


const styles = StyleSheet.create({
	textStyle:{
		flex:1, 
		flexWrap: 'wrap',
		fontSize:20,
	},
	versicleStyle:{
		fontSize:20,
		color: '#1e9e98'
	},
	titleView:{
		width:"100%",
		height: "25%", 
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems:'center',
		paddingHorizontal:10,
		paddingTop:8
	},
	titleViewText:{
		color:"#fff",
		paddingBottom:4, 
		textAlign: "center"
	},
	titleSubView:{
		width:"100%",
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems:'center'
	},
	titleSubViewImg:{
		marginRight: 10, 
		width:50,
		height:50
	},
	scrollV:{
		width:"100%",
		height:"100%",
		flexDirection:'column',
		backgroundColor: "#ffffffca",
		paddingHorizontal:10
	}

})