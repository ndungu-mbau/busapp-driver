/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';

import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ThemeProvider, Header } from 'react-native-elements';

import login from './login';
import details from './details';

const { Navigator, Screen } = createStackNavigator();

const theme = {
  colors: {
    primary: '#030457',
    secondary: '#AF08DC',
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <Navigator>
          <Screen
            name="login"
            component={login}
            options={{
              headerShown: false,
            }}
          />
          <Screen
            name="details"
            component={details}
            options={{
              title: 'Passenger Details',
              header: ({ scene, previous, navigation }) => {
                const { options } = scene.descriptor;
                const title =
                  options.headerTitle !== undefined
                    ? options.headerTitle
                    : options.title !== undefined
                    ? options.title
                    : scene.route.name;

                return (
                  <Header
                    placement="left"
                    statusBarProps={{
                      backgroundColor: '#030457',
                    }}
                    leftComponent={{
                      icon: 'chevron-back-outline',
                      type: 'ionicon',
                      color: '#fff',
                      onPress: navigation.goBack,
                    }}
                    centerComponent={{ text: title, style: { color: '#fff' } }}
                    style={options.headerStyle}
                  />
                );
              },
            }}
          />
        </Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
