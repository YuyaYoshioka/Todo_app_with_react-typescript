import React from 'react';
import { KeyValue } from './KeyValue';

type UpdateTodoProps = {
  content: string;
  onChange: (key_value: KeyValue) => void;
  onUpdate: () => void;
  onCancel: () => void;
};

const UpdateTodo = (props: UpdateTodoProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({
      value: e.target.value
    });
  };

  const onCancel = () => {
    props.onCancel();
  };

  const onUpdate = () => {
    props.onUpdate();
  };

  return (
    <div>
      <input
        type='text'
        value={props.content}
        onChange={e => onChange(e)}
      />
      <button onClick={() => onUpdate()}>編集</button>
      <button onClick={() => onCancel()}>キャンセル</button>
    </div>
  )
};

export default UpdateTodo;