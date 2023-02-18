import React, {useState} from 'react'
import {Text,View,ScrollView,StyleSheet} from 'react-native'
import getApiValues from './getApiValues'



const styles = StyleSheet.create({
	textStyle:{
		flex:1, 
		flexWrap: 'wrap',
		fontSize:20,
	},
})

function returnFragment(value){
	return <View key={value.number} style={{width:"90%", flexDirection: 'row'}}><Text style={{fontSize:20,color: '#1e9e98'}}> {`  ${value.number}.`}</Text>
			<Text style={styles.textStyle}>{`${value.text}`}</Text></View>


}
function ShowTextValue(resp,SetText, versiculo){
	let retorno = [];
	let template = {msg: 'Chapter not found'}
	if(template === resp){
		SetText("Capitulo não encontrado!")
		return ;
	}
	if (versiculo === null){
		resp.verses.forEach((value, index)=>{
			retorno[index] = returnFragment(value)	
				})
			
	}else if (versiculo.length === 1){
		resp.verses.forEach((value, index)=>{
			if (parseInt(versiculo[0]) === parseInt(value.number)){
					retorno[index] = returnFragment(value)}
			})
	}else{
		resp.verses.forEach((value, index)=>{
			if (parseInt(versiculo[0]) <= parseInt(value.number)){
				if (parseInt(versiculo[1]) >= parseInt(value.number)) {
					retorno[index] = returnFragment(value)
				}
			}
		})
	}

	SetText(retorno)
}



const textDefault = 'Selecione um livro e um capitulo para iniciar a leitura.'

export default (props) =>{
	const [showText,SetText] = useState(props.text);


		if (props.call === 1){
		let capitulo = props.capther
		let versiculo = null;
		if (capitulo.search(":") > -1){
			capitulo = capitulo.split(":")[0]
			try{
				versiculo = props.capther.toString().split(":")[1].split('-');
			}catch{
				versiculo = null;
			}
		}else{
			capitulo = props.capther;
		}
		
		getApiValues.ShowCaptherValue(props.book,capitulo)
		.then(resp => ShowTextValue(resp,SetText, versiculo))
		.then( _ => props.setCall(!props.call))
		.catch(resp => {
			SetText("Capitulo não encontrado!")
			props.setCall(!props.call)
		});

		
	}

	return (
		<View style={{height:"100%",paddingBottom:200}}>
		<ScrollView >{showText !=  textDefault  ? showText : <Text style={[styles.textStyle,{marginLeft:'2%',fontSize:25}]}>{props.text}</Text>}</ScrollView>
		</View >
		);

}

