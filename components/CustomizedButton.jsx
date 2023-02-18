import React from 'react'
import {Text, StyleSheet, Pressable} from 'react-native'


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    cornerRadius: 4,
    elevation: 3,
    backgroundColor: '#000',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#fff',
    textAlign: 'center'
  },
});



export default props => {

	return(
		<Pressable  style={[styles.button,props.styleButton]} onPress={props.onPress}>
			<Text style={[styles.text,props.styleTextBtn]}>{props.textBtn}</Text>
		</Pressable>

		);
}


