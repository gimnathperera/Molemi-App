import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

export default function TabBarIcon(props) {
  return <Ionicons name={props.name} size={24} style={{ marginBottom: -3 }} />;
}
