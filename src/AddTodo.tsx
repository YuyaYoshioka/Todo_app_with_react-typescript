import React from 'react';
import { KeyValue } from './KeyValue';
import { TodoList } from './Todolist';

type AddTodoProps = {
  content: string;
  count: number;
  onChange: (key_value: KeyValue) => void;
  onAdd: (todoElement: TodoList) => void;
};

const AddTodo = (props: AddTodoProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({
      value: e.target.value
    });
  };

  const onAdd = () => {
    const id: number = props.count;
    const content: string = props.content;
    const todoElement: TodoList = {
      id: id,
      content: content
    };
    props.onAdd(todoElement);
  };

  return (
    <div>
      <input
        type='text'
        value={props.content}
        onChange={e => onChange(e)}
      />
      <button onClick={() => onAdd()}>追加</button>
    </div>
  )
};

export default AddTodo;