import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  //section for Adding taseks.
  const addTask = () => {
    if (taskText.trim() === '') return; 
    const newTask = {
      id: Date.now().toString(),
      text: taskText,
       done: false
    };
    setTasks([...tasks, newTask]);
     setTaskText('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  ///This section is for deleting only.
  const deleteTask = (id) =>
     {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Input row and Task Lists int the FlatList.*/}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task-name to add..."
       value={taskText}
        onChangeText={setTaskText}
        />
          <Button title="Add to List" onPress={addTask} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text
              style={[styles.taskText, item.done && styles.taskTextDone]}
              onPress={() => toggleTask(item.id)}
            >
              {item.text}
            </Text>

            <TouchableOpacity onPress={() => toggleTask(item.id)}>
              <Text style={styles.checkbox}>{item.done ? "✅" : "⬜"}</Text>
            </TouchableOpacity>

            {/*FOr Deleting A task from The List.*/}
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,
     padding: 20,
      backgroundColor: 'white' },

  inputRow: { 
    flexDirection: 'row',
     marginBottom: 10 ,
    
    },
  input: { 
    flex: 1,
     borderColor: '#ccc',
      borderWidth: 1, 
      padding: 8,
       borderRadius: 5 
       
      },
  taskItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 5 ,
   
  },

  taskText: 
  { 
    flex: 1, 
    fontSize: 16 ,
     color: 'red'
  },
  taskTextDone: { 
    textDecorationLine: 'line-through', 
    color: 'green' },
  checkbox: { marginRight: 10, 
    fontSize: 18 
  },
  deleteButton: { marginLeft: 10,
     fontSize: 18 
    }
});
