import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import db from '../config';
export default class Searchscreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      allTransactions: [],
      lastVisibleTransaction: null,
      search:''
    }
  }
  fetchMoreTransactions = async ()=>{
    var text = this.state.search.toUpperCase();
    const query = await db.collection("Stories").where('by','==',text).startAfter(this.state.lastVisibleTransaction).limit(7).get();
    query.docs.map((doc)=>{
      this.setState({
        allTransactions: [...this.state.allTransactions, doc.data()],
        lastVisibleTransaction: doc
      });
    });
}
  searchTransactions= async(text) =>{
      const transaction =  await db.collection("Stories").where('by','==',text).get();
      transaction.docs.map((doc)=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastVisibleTransaction: doc
        });
      });
  }
  componentDidMount = async ()=>{
    const query = await db.collection("by").limit(7).get();
    query.docs.map((doc)=>{
      this.setState({
        allTransactions: [],
        lastVisibleTransaction: doc
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
      <TextInput 
        style ={styles.bar}
        placeholder = "Enter Author's Name"
        onChangeText={(text)=>{this.setState({search:text})}}/>
        <TouchableOpacity
          style = {styles.searchButton}
          onPress={()=>{this.searchTransactions(this.state.search)}}
        >
          <Text style={{fontSize:17,color:'white'}}>Search</Text>
        </TouchableOpacity>
        </View>
      <FlatList
        data={this.state.allTransactions}
        renderItem={({item})=>(
          <View style={{borderBottomWidth: 2, padding:15}}>
            <Text style ={{fontWeight:'bold', fontSize:20, marginBottom:5}}>Title : {item.title}</Text>
            <Text style={{fontWeight:'bold', fontSize:15, marginBottom:5}}>{'By - '+item.by}</Text>
            <Text>{"Date : " + item.date.toDate()}</Text>
            <Text style={{marginTop:10}}>{item.story}</Text>
          </View>
        )}
        keyExtractor= {(item,index)=> index.toString()}
        onEndReached ={this.fetchMoreTransactions}
        onEndReachedThreshold={0.7}
      /> 
      </View>
    );
  }
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },
    searchBar:{
      flexDirection:'row',
      height:45,
      width:'auto',
      borderWidth:1,
      alignItems:'center',
      borderLeftWidth:0,
      borderRightWidth:0,
    },
    bar:{
      borderWidth:1.5,
      height:35,
      width:300,
      paddingLeft:15,
      borderRightWidth:0,
      marginLeft:5
    },
    searchButton:{
      borderWidth:1.5,
      height:35,
      width:60,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#66BB6A',
      borderLeftWidth:0
    }
  });