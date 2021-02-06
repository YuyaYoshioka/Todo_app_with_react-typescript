import React, { useState } from 'react';

type TodoList = {
  id: number
  content: string
}

type AddTodoProps = {
  content: string
  count: number
  onChange: (key_value: KeyValue) => void
  onAdd: (todoElement: TodoList) => void
}

type UpdateTodoProps = {
  content: string
  onChange: (key_value: KeyValue) => void
  onUpdate: () => void
  onCancel: () => void
}

type TodoElementProps = {
  todoList: TodoList
  onDelete: (id: number) => void
  onEdit: (todoList: TodoList) => void
}

type KeyValue = {
  [key: string]: string
}

const TodoApp = () => {
  const [value, setValue] = useState('');
  const [todoList, setTodoList] = useState([] as TodoList[]);
  const [count, setCount] = useState(0);
  const [editId, setEditId] = useState(-1);
  const [flag, setFlag] = useState(0);

  const handleChange = (key_value: KeyValue) => {
    setValue(key_value['value']);
  }

  const handleAdd = (todoElement: TodoList) => {
    setTodoList(todoList.concat(todoElement));
    setValue('');
    setCount(count + 1);
  }

  const handleDelete = (id: number) => {
    let index: number = 0
    let newTodoList: TodoList[] = todoList.concat()
    for (const element of newTodoList) {
      if (element.id===id) {
        break
      }
      index++
    }
    todoList.splice(index, 1)
    setTodoList(todoList)
  }

  const handleEdit = (todoList: TodoList) => {
    setEditId(todoList.id);
    setValue(todoList.content);
    setFlag(1);
  }

  const handleCancel = () => {
    setValue('');
    setFlag(0);
    setEditId(-1);
  }

  const handleUpdate = () => {
    let newTodoList: TodoList[] = todoList
    let index: number = 0
    for (const element of newTodoList) {
      if (element.id===editId) {
        newTodoList[index].content = value
      }
      index++
    }
    setTodoList(todoList);
    setFlag(flag);
    setEditId(editId);
    setValue(value);
  }

  const todoListNode = todoList.map(element => {
    return (
      <TodoElement
        key={element.id}
        todoList={element}
        onDelete={id => handleDelete(id)}
        onEdit={todoList => handleEdit(todoList)}
      />
    )
  })

  let changeTodo: any
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
  )
}

const AddTodo = (props: AddTodoProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({
      value: e.target.value
    })
  }

  const onAdd = () => {
    const id: number = props.count
    const content: string = props.content
    const todoElement: TodoList = {
      id: id,
      content: content
    }
    props.onAdd(todoElement)
  }

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
}

const UpdateTodo = (props: UpdateTodoProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({
      value: e.target.value
    })
  }

  const onCancel = () => {
    props.onCancel()
  }

  const onUpdate = () => {
    props.onUpdate()
  }

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
}

const TodoElement = (props: TodoElementProps) => {
  const onDelete = () => {
    props.onDelete(props.todoList.id)
  }

  const onEdit = () => {
    props.onEdit(props.todoList)
  }

  return (
    <li>
      <span>{props.todoList.content}</span>
      <button onClick={() => onDelete()}>削除</button>
      <button onClick={() => onEdit()}>編集</button>
    </li>
  )
}

const App: React.FC = () => {
  return (
    <div className="main">
      <TodoApp />
    </div>
  );
}

export default App
