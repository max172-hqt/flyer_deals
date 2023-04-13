import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeBaseProvider } from 'native-base';
import HomeScreen from './components/screens/HomeScreen';
import ShoppingListScreen from './components/screens/ShoppingListScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Shopping List" component={ShoppingListScreen} />
        </Tab.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
