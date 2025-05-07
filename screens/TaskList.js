import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeleteButton from '../components/DeleteButton';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            setTasks(storedTasks ? JSON.parse(storedTasks) : []);
        } catch (error) {
            console.error('Failed to load tasks', error);
        }
    };

    const deleteTask = async (indexToDelete) => {
        try {
            const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
            setTasks(updatedTasks);
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        } catch (error) {
            Alert.alert('Failed to delete task');
        }
    };

    return (
        <ScrollView style={styles.container}>
            {tasks.map((task, index) => (
                <View key={index} style={styles.card}>
                    <View style={styles.row}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{task.title}</Text>
                            <Text>{task.description}</Text>
                        </View>
                        <DeleteButton onPress={() => deleteTask(index)} />
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    card: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 6,
        marginBottom: 10,
        elevation: 2,
    },
    title: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
    row: { flexDirection: 'row', alignItems: 'center' },
});

export default TaskList;
