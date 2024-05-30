import React, { useState } from 'react';
import {Text,SafeAreaView, StyleSheet, View,Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard , useWindowDimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import COLORS from '../colors';
import { ScrollView } from 'react-native-gesture-handler';
import {WebView} from 'react-native-webview';

const MuMap = ({navigation,route}) => {
  const gotoUser=()=>{
     const {username}=route.params;
    navigation.navigate('User',{"username":username})
  }
  const width=useWindowDimensions();
  return (
    <ScrollView>
      <View>
      <Ionicons name="ios-person-circle-outline" size={50} color={COLORS.darkBlue} style={{marginTop:30,marginRight:340}} onPress={gotoUser} />
      <View style={{marginRight:"40%",flexDirection:'row'}}>
          <View>
          <Image source={require('client/assets/source.png')} style={{padding:50,marginLeft:100,}} />
        <Text style={{marginLeft:"60%",}} >Source</Text>
          </View>
          <View>
          <Image source={require('client/assets/dest.png')} style={{padding:50,marginLeft:20,}} />
        <Text style={{marginLeft:30,}} >Destination</Text>
          </View>
        </View>
      <View>
          <WebView
          originWhitelist={['*']}
          automaticallyAdjustContentInsets={false}
          source={{uri:'http://127.0.0.1:5500/client/components/svg_main1.html'}}
          style={{height:600,width:450,marginRight:20}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};
 
export default MuMap;
 