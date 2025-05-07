import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTask from './screens/AddTask';
import TaskList from './screens/TaskList';
import StatusChange from './screens/StatusChange';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AddTask">
          <Stack.Screen name="AddTask" component={AddTask} />
          <Stack.Screen name="TaskList" component={TaskList} />
          <Stack.Screen name="StatusChange" component={StatusChange} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
