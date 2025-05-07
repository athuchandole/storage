import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeleteButton from '../components/DeleteButton';
import AcceptButton from '../components/AcceptButton';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            const allTasks = storedTasks ? JSON.parse(storedTasks) : [];
            const pendingTasks = allTasks.filter(task => task.status === 0);
            setTasks(pendingTasks);
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

    const deleteTask = async (indexToDelete) => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            const allTasks = storedTasks ? JSON.parse(storedTasks) : [];

            const pendingTasks = allTasks.filter(task => task.status === 0);
            const taskToDelete = pendingTasks[indexToDelete];

            const updatedTasks = allTasks.filter(
                task =>
                    !(
                        task.title === taskToDelete.title &&
                        task.description === taskToDelete.description &&
                        task.status === 0
                    )
            );

            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
            loadTasks();
        } catch (error) {
            Alert.alert('Failed to delete task');
        }
    };

    const acceptTask = async (indexToAccept) => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            const allTasks = storedTasks ? JSON.parse(storedTasks) : [];

            const pendingTasks = allTasks.filter(task => task.status === 0);
            const taskToAccept = pendingTasks[indexToAccept];

            const updatedTasks = allTasks.map(task => {
                if (
                    task.title === taskToAccept.title &&
                    task.description === taskToAccept.description &&
                    task.status === 0
                ) {
                    return { ...task, status: 1 };
                }
                return task;
            });

            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
            loadTasks(); // 👈 refresh list to remove accepted task
        } catch (error) {
            Alert.alert('Failed to accept task');
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
                        <AcceptButton onPress={() => acceptTask(index)} />
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
