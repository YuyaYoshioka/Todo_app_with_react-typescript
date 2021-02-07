import React, { useState } from 'react';
import TodoElement from './TodoElement';
import AddTodo from './AddTodo';
import UpdateTodo from './UpdateTodo';
import { TodoList } from './Todolist';
import { KeyValue } from './KeyValue';

const TodoApp = () => {
  const [value, setValue] = useState('');
  const [todoList, setTodoList] = useState([] as TodoList[]);
  const [count, setCount] = useState(0);
  const [editId, setEditId] = useState(-1);
  const [flag, setFlag] = useState(0);

  const handleChange = (key_value: KeyValue) => {
    setValue(key_value['value']);
  };

  const handleAdd = (todoElement: TodoList) => {
    setTodoList(todoList.concat(todoElement));
    setValue('');
    setCount(count + 1);
  };

  const handleDelete = (id: number) => {
    let index: number = 0;
    let newTodoList: TodoList[] = todoList.concat();
    for (const element of newTodoList) {
      if (element.id===id) {
        break;
      }
      index++;
    }
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  const handleEdit = (todoList: TodoList) => {
    setEditId(todoList.id);
    setValue(todoList.content);
    setFlag(1);
  };

  const handleCancel = () => {
    setValue('');
    setFlag(0);
    setEditId(-1);
  };

  const handleUpdate = () => {
    let newTodoList: TodoList[] = todoList;
    let index: number = 0;
    for (const element of newTodoList) {
      if (element.id===editId) {
        newTodoList[index].content = value;
      }
      index++;
    }
    setTodoList(newTodoList);
    setFlag(0);
    setEditId(editId);
    setValue('');
  }

  const todoListNode = todoList.map(element => {
    return (
      <TodoElement
        key={element.id}
        todoList={element}
        onDelete={id => handleDelete(id)}
        onEdit={todoList => handleEdit(todoList)}
      />
    );
  });

  let changeTodo: any;
  if (flag===0) {
    changeTodo = <AddTodo
                  content={value}
                  count={count}
                  onChange={key_value => handleChange(key_value)}
                  onAdd={todoElement => handleAdd(todoElement)}
                  />
  } else {
    changeTodo = <UpdateTodo
                  onChange={key_value => handleChange(key_value)}
                  onUpdate={() => handleUpdate()}
                  onCancel={() => handleCancel()}
                  content={value}
                  />
  }

  return (
    <div>
      <h1>Todo App</h1>
      {changeTodo}
      <ul>
        {todoListNode}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <div className="main">
      <TodoApp />
    </div>
  );
};

export default App;
