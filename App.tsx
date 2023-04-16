import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeBaseProvider } from 'native-base';
import HomeScreen from './screens/HomeScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';
import 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RootState, store } from './redux/store';
import { Provider, useSelector } from 'react-redux';
import { registerRootComponent } from 'expo';
import type { RootBottomTabParamList } from './types';
import AccountScreen from './screens/AccountScreen';
import { lightGray, theme, themeColor } from './utils/constants';

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: route.name === 'Account',
            tabBarStyle: {
              backgroundColor: lightGray,
            },
            tabBarActiveTintColor: themeColor,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

              if (route.name === 'Home') {
                iconName = focused ? 'pricetag' : 'pricetag-outline';
              } else if (route.name === 'Cart') {
                iconName = focused ? 'cart' : 'cart-outline';
              } else if (route.name === 'Account') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              } else {
                throw new Error('Unknown tab: ' + route.name);
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{
            title: 'Weekly Deals'
          }}/>
          <Tab.Screen name="Cart" component={ShoppingListScreen} options={{
            title: 'Shopping List'
          }}/>
          {isLoggedIn && (
            <Tab.Screen name="Account" component={AccountScreen} options={{
              title: 'Account'
            }}/>
          )}
        </Tab.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

const RootComponent = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

registerRootComponent(RootComponent);
