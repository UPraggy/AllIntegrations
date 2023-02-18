import React, {useState, useEffect} from 'react'
import {TextInput, StyleSheet} from 'react-native'



//Animar PlaceHolder
const defaultCap = " Capitulo e/ou versiculo (23:1-3)"

let onPlaceHolder = 1

async function animatePlaceHolder(slices, setEl,time = 200){
			setTimeout(()=>{
			slices += 1;
			el = defaultCap.slice(slices,22+slices)
			if (el.length < 2){
				animatePlaceHolder(0, setEl)
			}else{
				if (onPlaceHolder === 1){

					setEl(el)
				}
				
				if (slices == 1){
					animatePlaceHolder(slices,setEl,1000)
				}else{
					animatePlaceHolder(slices,setEl)
				}
				
			}
		},time) 
}


export default (props) =>{

	//UseEffect não vai chamar diversas vezes a mesma função com TimeOut
	const [functions, setFunctions] = useState(0);
	const [placeHolderCap, setPlaceCap] = useState(defaultCap);

	

	useEffect(()=>{
		if (functions != 1){
			animatePlaceHolder(0,setPlaceCap)
			setFunctions(1)
		}		
	})


	return <TextInput

				numberOfLines={1} 

        style={styles.input}
        onChangeText={props.changeChapter}
        value={props.callCapther}
        placeholder={placeHolderCap}

        onFocus={() =>onPlaceHolder=0 }
        onBlur={() =>onPlaceHolder=1 }
      ></TextInput>
 

}


const styles = StyleSheet.create({input: {
  	flex: 1,
  	height: "75%",
  	fontSize: 20,
  	borderWidth: 1,
    padding: 10,
  },})