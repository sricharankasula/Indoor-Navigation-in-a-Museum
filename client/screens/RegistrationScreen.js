import React from 'react';
import { StackActions } from '@react-navigation/native';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import COLORS from '../colors';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
img=require('../assets/log.png')
import client from '../client';

const RegistrationScreen = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    username: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async() => {
    Keyboard.dismiss();

    let isValid = true;

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.username) {
      handleError('Please input username', 'username');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Please input phone number', 'phone');

      isValid = false;
    }
    if(inputs.phone.length!==10)
    {
      handleError('Please input valid phone number','phone')
      isValid=false;
    }
    if (isValid) {
      register();
    }
    else{
      console.log("Validation error");
    }
  };

  const register = async() => {
    setLoading(true);
    setTimeout(async()=>{
          const data=JSON.stringify({
            username: inputs.username,
            gmail: inputs.email,
            phone: inputs.phone,
          });
          try {
                  const res = await client.post('/register', {
                    data
              })
              if(JSON.parse(res.data.success))
              {
                setLoading(false)
                Alert.alert("Successful Registration");
               
                navigation.dispatch(
                    StackActions.replace('Map',{
                      username:inputs.username
                    })
                )
              }
              else{
                setLoading(false)
                Alert.alert((res.data.message));
              }
          } catch (error) {
            setLoading(false)
            console.log(error);
          }
    },3000);
    };
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Image source={img} style={{alignItems: 'center', justifyContent: 'center',marginLeft:'30%'}} />

        <Text style={{color: COLORS.darkBlue, fontSize: 30,marginLeft:'15%', fontWeight: 'bold'}}>
          User Registration
        </Text>
        <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter Your Details
        </Text>
        <View style={{marginVertical: 7}}>

           <Input
            onChangeText={text => handleOnchange(text, 'username')}
            onFocus={() => handleError(null, 'username')}
            iconName="account-outline"
            label="User Name"
            placeholder="Enter a User name"
            error={errors.username}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
          />
          <Button title="Register" onPress={validate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;