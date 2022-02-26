import React from "react";
import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  item: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
}

export function TaskItem({
  item,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksListProps) {
  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${item.id}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${item.id}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <Text style={item.done ? styles.taskTextDone : styles.taskText}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        testID={`trash-${item.id}`}
        style={{ paddingHorizontal: 24 }}
        onPress={() => removeTask(item.id)}
      >
        <Image source={trashIcon} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
