import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExist = tasks.find((_task) => _task.title === newTaskTitle);

    if (taskExist) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome!"
      );
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldTasks) => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks((oldTasks) =>
      oldTasks.map((_task) => {
        if (_task.id === id) {
          return { ..._task, done: !_task.done };
        }

        return _task;
      })
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        { text: "Não", onPress: () => {} },
        {
          text: "Sim",
          onPress: () => {
            setTasks((oldTasks) => oldTasks.filter((_task) => _task.id !== id));
          },
        },
      ]
    );
  }

  function handleEditTask(taskId: number, newTaskTitle: string) {
    const taskExist = tasks.find((_task) => _task.title === newTaskTitle);

    if (taskExist) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome!"
      );
      return;
    }

    setTasks((oldTasks) =>
      oldTasks.map((_task) => {
        if (_task.id === taskId) {
          return { ..._task, title: newTaskTitle };
        }

        return _task;
      })
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
