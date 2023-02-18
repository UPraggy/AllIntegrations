import React, {useState} from 'react'
import {View, StyleSheet,ImageBackground} from 'react-native'
import CustomizedBtn from './CustomizedButton'
import Books from './Books'
import Capitulo from './Capitulo'
import Texto from './Texto'
import getApiValues from './getApiValues'



function BuscarTexto(capitulo,setCap,setCall, captherRange, setText){
	
	if(capitulo === undefined || capitulo === null){
		setText('Capitulo e/ou Versiculo Invalidos!')
		return ;
	}

	let testeNum = ''
	try{
		
		testeNum = isNaN(capitulo.split("-").join("").split(":").join(""))

	}catch{ //capitulo procurado, apagado e procurado vazio
		
	}
		if (capitulo.length > 0 && testeNum == false){
			if ((capitulo < captherRange && capitulo > 0) || typeof capitulo === 'string'){ //se capitulo for mais que o range, não realiza a busca
				setCap(capitulo);
				setCall(1);
				return ;
			}
		}

	setText('Capitulo e/ou Versiculo Invalidos!')
	return ;
}



export default props => {

	const [showText,setText] = useState('Selecione um livro e um capitulo para iniciar a leitura.');
	
	const [bookOption,setbookOption] = useState('');
	const [captherOption,setcaptherOption] = useState('');

	const [captherRange,setcaptherRange] = useState('');

	const [callCapther,setcallCapther] = useState('');
		

	if (bookOption != ''){
		getApiValues.GetBookValue(bookOption)
		.then(resp => {
			setcaptherRange(resp.chapters)
		})
		.catch(resp => setText('Capitulo e/ou Versiculo Invalidos!'));

	}

	return <View style={{width:"100%", height: "88%"}}>

	<View style={[styles.viewMaster,styles.shadowProp]}>
	<View style={[styles.view]}>
		<Books setBook={setbookOption}/>

		<Capitulo changeChapter={setcallCapther} callCapther={callCapther}/>
		<ImageBackground style={[styles.style_btn,{shadowColor: "#fff",elevation: 40}]} source={require('./statics/searchIcon.png')} >
			<CustomizedBtn styleButton={[styles.style_btn,{backgroundColor:""}]} /*styleTextBtn={styleText}*/ 
							onPress={() => {
								if (bookOption != ''){
									BuscarTexto(callCapther,setcaptherOption,setcallCapther, captherRange, setText)
								}else{
									setText("Comando Invalido, por favor, selecione um livro clicando no icone da Biblia.")
								}
							}} />
		</ImageBackground>


	</View>
	</View>
		<View style={[styles.viewText]}>
			<Texto text={showText} book={bookOption} capther={captherOption} call={callCapther} setCall={setcallCapther} paddingbottom={420}/>
		</View>

	</View>
	
}



const styles = StyleSheet.create({
	viewMaster:{
		width:'120%',
		height: 80,
		borderWidth: 0,
		marginTop: "-2.4%",
		marginLeft:"-10%"

	},
	view:{
		flexDirection: 'row',
		backgroundColor : '#5a9c94aa',
		width:'100%',
		marginTop: '2%',
		height: '87%',
		paddingTop: "2%",
		paddingHorizontal: "10%",
	},
	viewText:{
		width: "100%",
		height:"100%",
		backgroundColor: "#fff",
	},
	style_btn:{
		//backgroundColor : '#ffffff',
		borderRadius: 20,
		width:40,
		height:40,
		marginVertical:"0.5%",
		elevation: 0,
		marginLeft:'5%',
		marginRight:'3%',
	},
	shadowProp: {
	  	shadowColor:"#3b706a",
		shadowOffset: {
			width: 0,
			height: -3,
		},
		shadowOpacity: 1,

		elevation: 6,
  },

})
