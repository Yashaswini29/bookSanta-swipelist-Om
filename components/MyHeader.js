import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import db from '../config'
import firebase from 'firebase'

export default class MyHeader extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    value: ''
  }
}

componentDidMount() {
  this.getNumberOfNotications()
}

getNumberOfNotications = () => {
  db.collection("Notifications").where("notificationStatus", "==", "Unread").where("reciverID", "==", firebase.auth().currentUser.email)
  .onSnapshot((snapshot) => {
    var unreadnotifications = snapshot.docs.map((doc) => 
      doc.data())
      this.setState({
        value: unreadnotifications.length
      })
    })
}

 BellIconWithBadge = () => {
  return(
    <View>
      <Icon name = "bell" type = "font-awesome" color = 'gray' onPress = {() => {this.props.navigation.navigate('Notifications')}}/>
      <Badge value = {this.state.value}
      containerStyle = {{position: 'absolute', top: -4, right: -4}}/>
    </View>
  )
}

render() {
  return (
    <Header
      leftComponent = {<Icon name = "bars" type = "font-awesome" color = 'gray' onPress = {()=> {this.props.navigation.toggleDrawer()}}/>}
      centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
      backgroundColor = "#eaf8fe"
      rightComponent = {<this.BellIconWithBadge{...this.props}/>}
    />
  );
};
}


