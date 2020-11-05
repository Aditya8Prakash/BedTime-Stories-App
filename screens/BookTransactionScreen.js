import React from 'react';
import { Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Alert} from 'react-native';
import * as firebase from 'firebase';
import db from '../config.js';
export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      title:'Story',
      story:'',
      author:'Anonymous'
    }
  }

  initiateBookIssue = async()=>{
    db.collection("Stories").add({
      'title': this.state.title,
      'by' : this.state.author,
      'date' : firebase.firestore.Timestamp.now().toDate(),
      'story': this.state.story
    });
    Alert.alert('Story Uploaded !');
  }

  render(){
    return(
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        placeholder="Title"
        style={styles.titleBox}
        onChangeText={(text)=>{
          this.setState({
            title: text
          });
        }}/>
        <TextInput
        placeholder="Written by --"
        style={styles.writterBox}
        onChangeText={(text)=>{
          this.setState({
            author: text
          });
        }}/>
        <TextInput
        placeholder="Write Here"
        style={styles.storyBox}
        onChangeText={(text)=>{
          this.setState({
            story: text
          });
        }}/>
        <Text style={styles.info}>{this.state.title} By - {this.state.author}</Text>
        <Text style={styles.story}>{this.state.story}</Text>
        <TouchableOpacity style ={styles.uploadButton} onPress={this.initiateBookIssue}><Text>UPLOAD</Text></TouchableOpacity>
    </KeyboardAvoidingView>)
  }
    
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    titleBox:{
      borderBottomWidth:2,
      fontSize:25,
      paddingBottom:5,
      marginBottom:20,
      outline:0
    },
    storyBox:{
      borderBottomWidth:2,
      fontSize:25,
      marginBottom:15,
      padding:5,
      outline:0
    },
    writterBox:{
      borderBottomWidth:2,
      fontSize:25,
      paddingBottom:5,
      marginBottom:20,
      outline:0
    },
    story:{
      fontSize:20,
      height:400,
      width :300
    },
    info:{
      fontSize:20,
      borderBottomWidth:1,
      marginBottom:10
    },
    uploadButton:{
      backgroundColor:'#52adf7',
      padding:10,
      fontSize:15,
    }
    
  });