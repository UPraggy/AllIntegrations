import React, {useState, useEffect} from 'react'
import {Text, View, ImageBackground, 
		StyleSheet, Modal, FlatList} from 'react-native'
import CustomizedBtn from './CustomizedButton'
import getApiValues from './getApiValues'


//setShowModal
function ShowBooksValue(resp,setVal ,showModal, setBook){
		setVal(<FlatList 
				data={resp}
				keyExtractor={item => item.abbrev.pt}
				renderItem={({item}) => {
					return (<CustomizedBtn  
						textBtn={item.name} 
						styleButton={[{backgroundColor:"#fff", paddingLeft:'3%'}]}
						styleTextBtn={[{color:"#000", alignSelf:'flex-start'}]}
						onPress={()=> {
							showModal(false)
							setBook(item.abbrev.pt)}
						}

						/>
						);
					}
				}
				/>)
}


export default props => {

	const [responseBooks,SetBooks] = useState(<Text>Waiting Informations</Text>);

	const [showModal, setShowModal] = useState(false)


	const [functions, setFunctions] = useState(0);

	useEffect(()=>{
		if (functions != 1){
			//setInitValues(responseBooks,SetBooks);
			getApiValues.GetBooksValue()
			.then(resp => ShowBooksValue(resp, SetBooks, setShowModal, props.setBook));
			setFunctions(1)
		}		
	})
	
	return (
		<View>
		<ImageBackground style={[styles.style_btn, styles.shadow]} source={require('./statics/bibleIcon.png')} >
			<CustomizedBtn styleButton={[styles.style_btn,{backgroundColor:""}]} /*styleTextBtn={styleText}*/ 
								onPress={() => setShowModal(!showModal)} />
		</ImageBackground>

		<Modal
			animationType="slide"
			visible={showModal}
			>

			<View style={{width:"100%",height:"100%",backgroundColor:'#fff'}}>
				{responseBooks}

			</View>

		</Modal>


		</View>

		);

}


const styles = StyleSheet.create({

	style_btn:{
			//backgroundColor : '#fff',
			width:40,
			height:40,
			marginTop:5,
			elevation: 0,
			marginLeft:'10%',
		},
	shadow:{
		shadowColor: "#f50",
		shadowOffset:{
			width: 40,
			height: 40
		},
		elevation: 30,
	},
})

