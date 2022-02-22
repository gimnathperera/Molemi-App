import * as React from 'react';
import { Text } from 'react-native';

export default function TabBarLabel({ focused, name }) {
  return focused ? <Text style={{ color: '#000' }}>{name}</Text> : null;
}
