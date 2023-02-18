import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

/*template by bootstrap*/

const style_ = StyleSheet.create({
topMenuWidgets:{
   width: '100%', 
   height: "20%",
   backgroundColor: '#5a9c94aa', 
   paddingTop: '10%',
   justifyContent: 'flex-start',
   alignItems: 'center'

},
 topMenuWidgetsP:{
    marginBottom: '3%',
    fontSize: 50,
    color: '#ffffffdd',
},
topMenuWidgetsBtns:{
   width:'100%',
   height: '75%',
   flexDirection: 'row',
   justifyContent: 'space-around',
   alignItems: 'baseline'

}})

export default props => {
	return <View style={style_.topMenuWidgets}>
			<Text  style={style_.topMenuWidgetsP}>{props.slogan}</Text>
         <View style={style_.topMenuWidgetsBtns}>{props.buttons}</View>
		</View>
}