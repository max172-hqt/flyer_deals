import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeBaseProvider } from 'native-base';
import HomeScreen from './screens/HomeScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';
import 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { registerRootComponent } from 'expo';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: route.name !== 'Home',
            // tabBarStyle: {
            //   backgroundColor: '#16375A',
            //   height: 60,
            // },
            // tabBarLabelStyle: {
            //   color: 'white',
            // },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Shopping List') {
                iconName = focused ? 'cart' : 'cart-outline';
              } else {
                throw new Error('Unknown tab');
              }

              return (
                <Ionicons name={iconName} size={size} color={color} />
              );
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Shopping List" component={ShoppingListScreen} />
        </Tab.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

const RootComponent = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

registerRootComponent(RootComponent);
