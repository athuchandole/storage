import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
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
            const allTasks = storedTasks ? JSON.parse(storedTasks) : [];
            setTasks(allTasks);
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

    const deleteTask = async (indexToDelete) => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            const allTasks = storedTasks ? JSON.parse(storedTasks) : [];
            allTasks.splice(indexToDelete, 1);
            await AsyncStorage.setItem('tasks', JSON.stringify(allTasks));
            loadTasks();
        } catch (error) {
            Alert.alert('Failed to delete task');
        }
    };

    const toggleStatus = async (indexToToggle) => {
        try {
            const updatedTasks = [...tasks];
            updatedTasks[indexToToggle].status = updatedTasks[indexToToggle].status === 0 ? 1 : 0;
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
            loadTasks();
        } catch (error) {
            Alert.alert('Failed to update status');
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
                        <TouchableOpacity onPress={() => toggleStatus(index)}>
                            <Text style={[styles.statusBtn, task.status === 0 ? styles.pending : styles.confirmed]}>
                                {task.status === 0 ? 'Pending' : 'Confirmed'}
                            </Text>
                        </TouchableOpacity>
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
    statusBtn: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        fontWeight: 'bold',
        marginRight: 10,
    },
    pending: {
        backgroundColor: '#f0ad4e',
        color: 'white',
    },
    confirmed: {
        backgroundColor: '#5cb85c',
        color: 'white',
    },
});

export default TaskList;
