import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeleteButton from '../components/DeleteButton';

const StatusChange = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadAcceptedTasks();
    }, []);

    const loadAcceptedTasks = async () => {
        const storedTasks = await AsyncStorage.getItem('tasks');
        const allTasks = storedTasks ? JSON.parse(storedTasks) : [];
        const acceptedTasks = allTasks.filter(task => task.status === 1);
        setTasks(acceptedTasks);
    };

    const deleteTask = async (indexToDelete) => {
        const storedTasks = await AsyncStorage.getItem('tasks');
        const allTasks = storedTasks ? JSON.parse(storedTasks) : [];

        const acceptedIndexes = allTasks
            .map((task, i) => (task.status === 1 ? i : -1))
            .filter(i => i !== -1);

        allTasks.splice(acceptedIndexes[indexToDelete], 1);

        await AsyncStorage.setItem('tasks', JSON.stringify(allTasks));
        loadAcceptedTasks();
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
        backgroundColor: '#e0ffe0',
        padding: 15,
        borderRadius: 6,
        marginBottom: 10,
        elevation: 2,
    },
    title: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
    row: { flexDirection: 'row', alignItems: 'center' },
});

export default StatusChange;
