import React, {useState} from 'react'
import {View, StyleSheet} from 'react-native'
import MeuEstilo from './statics/MeuEstilo'
import Api_Specific_Book from './Api_Specific_Book'
import TopMenuWidgets from './TopMenuWidgets'
import CustomizedBtn from './CustomizedButton'


function changePageState(setState, app){
	setState(app);
}

const createButtons = function (func,args, name, id){
	const style_btn = StyleSheet.create({
		backgroundColor : '#3b706a',
		width:"40%",
		height:"40%"
	})
	const styleText = StyleSheet.create({
		fontSize : 15,
	})



	return <CustomizedBtn key={name} textBtn={name} onPress={() => changePageState(func,args)} styleButton={style_btn} styleTextBtn={styleText} />
}
export default props => {

	const [actualApp,setActualApp] = useState(<Api_Specific_Book />)

	const api_specific = createButtons(setActualApp,<Api_Specific_Book />, 'Litugia Diaria')


	return (
		<View style={MeuEstilo.containerPrincipal}>

		<TopMenuWidgets buttons={[api_specific]} slogan="Bible with API"/>
		{actualApp}
		</View>
		);
}

