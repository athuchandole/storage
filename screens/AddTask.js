import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputBox from '../components/InputBox';

const AddTask = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const saveTask = async () => {
        if (!title || !description) {
            Alert.alert('Please enter both title and description');
            return;
        }

        const newTask = { title, description, status: 0 }; // 👈 status = 0 by default
        const existingTasks = await AsyncStorage.getItem('tasks');
        const tasks = existingTasks ? JSON.parse(existingTasks) : [];
        tasks.push(newTask);
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        setTitle('');
        setDescription('');
        Alert.alert('Task added!');
    };

    return (
        <View style={styles.container}>
            <InputBox label="Title" value={title} onChangeText={setTitle} placeholder="Enter title" />
            <InputBox
                label="Description"
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
            />
            <Button title="Add Task" onPress={saveTask} />
            <View style={{ marginTop: 15 }}>
                <Button title="Go to Task List" onPress={() => navigation.navigate('TaskList')} />
            </View>
            <View style={{ marginTop: 10 }}>
                <Button title="Accepted Tasks" onPress={() => navigation.navigate('StatusChange')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
});

export default AddTask;
