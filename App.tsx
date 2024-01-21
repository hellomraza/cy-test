import Checkbox from "expo-checkbox";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [warning, setWarning] = useState<boolean>(false);

  const ref = useRef<TextInput>(null);

  const onTextChange = (text: string) => {
    if (text.trim().length > 0) {
      setWarning(false);
      setDisabled(false);
    } else {
      setDisabled(true);
      setWarning(true);
    }
    setText(text);
  };

  const onBlur = () => {
    if (text.trim().length === 0) {
      setWarning(true);
    }
  };

  const addTodo = () => {
    if (text.trim().length === 0) {
      return;
    }
    const newTodo: Todo = {
      id: Math.random().toString(),
      text: text,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setText("");
    ref.current?.focus();
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        aria-label="todo-input"
        style={styles.todoInput}
        value={text}
        onChangeText={onTextChange}
        // onBlur={onBlur}
        // onFocus={() => setWarning(false)}
        placeholder="Add todo..."
      />
      <Text>{text}</Text>

      <Pressable
        style={[styles.addTodoButton, disabled && styles.addTodoButtonDisabled]}
        aria-label="add-todo-button"
        onPress={addTodo}
        disabled={disabled}
      >
        <Text
          aria-label="add-todo-button-text"
          style={styles.addTodoButtonText}
        >
          Add
        </Text>
      </Pressable>
      {warning && (
        <Text aria-label="warning-message" style={{ color: "red" }}>
          Todo text cannot be empty
        </Text>
      )}

      <Text style={styles.title} aria-label="todo-list-title">
        Todo List
      </Text>
      {todos.map((todo, i) => (
        <View key={todo.id}>
          <Text aria-label={`todo-item-${i}`} style={styles.todoText}>
            {todo.text}
          </Text>
          <Pressable
            aria-label={`remove-todo-button-${i}`}
            style={styles.removeTodoButton}
            onPress={() => removeTodo(todo.id)}
          >
            <Text style={styles.removeTodoButtonText}>Remove</Text>
          </Pressable>
          <Checkbox
            aria-label={`toggle-todo-button-${i}`}
            value={todo.completed}
            onValueChange={() => toggleTodo(todo.id)}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  todoInput: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 20,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  todoText: {
    fontSize: 20,
  },
  addTodoButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  addTodoButtonDisabled: {
    backgroundColor: "gray",
  },
  addTodoButtonText: {
    color: "white",
    fontSize: 20,
  },

  removeTodoButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  removeTodoButtonText: {
    color: "white",
    fontSize: 20,
  },
});
