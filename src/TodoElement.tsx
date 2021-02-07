import React from 'react';
import { TodoList } from './Todolist';

type TodoElementProps = {
  todoList: TodoList;
  onDelete: (id: number) => void;
  onEdit: (todoList: TodoList) => void;
};

const TodoElement = (props: TodoElementProps) => {
  const onDelete = () => {
    props.onDelete(props.todoList.id);
  };

  const onEdit = () => {
    props.onEdit(props.todoList);
  };

  return (
    <li>
      <span>{props.todoList.content}</span>
      <button onClick={() => onDelete()}>削除</button>
      <button onClick={() => onEdit()}>編集</button>
    </li>
  )
};

export default TodoElement;