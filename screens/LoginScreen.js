import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native';
import firebase from 'firebase';
export default class LoginScreen extends React.Component  {
    constructor(){
        super();
        this.state={
          emailId : '',
          password: ''
        }
      }
      login=async(email,password)=>{
        if (email && password){
          try{
            const response = await firebase.auth().signInWithEmailAndPassword(email,password);
            if(response){
              this.props.navigation.navigate('Transaction');
            }
          }
          catch(error){
            switch (error.code) {
              case 'auth/user-not-found':
                Alert.alert("user dosen't exists");
                break
              case 'auth/invalid-email':
                Alert.alert('incorrect email or password');
                break
            }
          }
        }
        else{
            Alert.alert('Enter email and password');
        }
      }
    render(){
        return(
          <KeyboardAvoidingView style = {{alignItems:'center',marginTop:60}}>
          <View>
            <Image
              source={require("../assets/booklogo.jpg")}
              style={{width:250, height: 250}}/>
            <Text style={{textAlign: 'center', fontSize: 45, fontWeight:'600' , marginBottom:35}}>Wily</Text>
          </View>
          <View>
          <TextInput
            style={styles.loginBox}
            placeholder="someone@example.com"
            keyboardType ='email-address'
            onChangeText={(text)=>{
              this.setState({
                emailId: text
              });
            }}
          />
          <TextInput
            style={styles.loginBox}
            secureTextEntry = {true}
            placeholder="Enter Password"
            onChangeText={(text)=>{
              this.setState({
                password: text
              });
            }}
          />
          </View>
          <View>
            <TouchableOpacity style={{height:50,width:130,marginTop:35,paddingTop:5,backgroundColor: '#66BB6A'}}
            onPress={()=>{this.login(this.state.emailId ,this.state.password);}}>
              <Text style={{textAlign:'center',fontSize:27, fontWeight:'bold',color:'white'}}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        );
    }
  }
  const styles = StyleSheet.create({
    loginBox:{
    width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin:10,
    paddingLeft:10,
    marginTop:20,
  }
  });