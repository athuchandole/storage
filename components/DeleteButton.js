import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const DeleteButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ marginLeft: 'auto' }}>
        <MaterialIcons name="delete" size={24} color="red" />
    </TouchableOpacity>
);

export default DeleteButton;
