import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AcceptButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ marginLeft: 10 }}>
        <MaterialIcons name="check-circle" size={24} color="green" />
    </TouchableOpacity>
);

export default AcceptButton;
