import React, { useState , useEffect} from 'react';
import { Text , View} from 'react-native';
import Button from '../components/Button';
import client from '../client';


export function UserDetails ({navigation,route}) {
    const[user,setUser]=useState([])
    const [usename,setUsername]= useState("")
    useEffect(()=>{
      const {username}=route.params;
      setUsername(username);
        client.get(`/userdetails/${username}`).then((response)=>{
        //console.log(response.data)
        setUser(response.data);
        })
      },[]);
    const goback=()=>{
        navigation.navigate('Map',{"username":usename})
    }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {user.map((val,key)=>{
        return (
          <View key={key} className="User"> 
            <Text style={{fontSize:50}}>User Name: {val.username}</Text>
            <Button title={"Go Back"} onPress={goback} />
          </View>
        );
      })}

    </View>
  );
};