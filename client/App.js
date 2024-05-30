import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MuMap from './screens/Map';
import { UserDetails } from './screens/User';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from './screens/RegistrationScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Reg">
      <Stack.Screen name="Reg" component={RegistrationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Map" component={MuMap} options={{ headerShown: false }} />
      <Stack.Screen name="User" component={UserDetails} options={{ headerShown: false }} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;