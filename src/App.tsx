import React from 'react';

type TodoAppState = {
  value: string
  todoList: TodoList[]
  count: number
  editId: number
  flag: number
}

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

class TodoApp extends React.Component<{}, TodoAppState> {
  state: TodoAppState = {
    value: '',
    todoList: [],
    count: 0,
    editId: -1,
    flag: 0,
  }

  handleChange(key_value: KeyValue) {
    this.setState({
      value: key_value['value'],
    })
  }

  handleAdd(todoElement: TodoList) {
    this.setState({
      todoList: this.state.todoList.concat(todoElement),
      value: '',
      count: this.state.count + 1,
    })
  }

  handleDelete(id: number) {
    let index: number = 0
    let todoList: TodoList[] = this.state.todoList.concat()
    for (const element of todoList) {
      if (element.id===id) {
        break
      }
      index++
    }
    todoList.splice(index, 1)
    this.setState({todoList: todoList})
  }

  handleEdit(todoList: TodoList) {
    this.setState({
      editId: todoList.id,
      value: todoList.content,
      flag: 1,
    })
  }

  handleCancel() {
    this.setState({
      value: '',
      flag: 0,
      editId: -1,
    })
  }

  handleUpdate() {
    let todoList: TodoList[] = this.state.todoList
    let index: number = 0
    for (const element of todoList) {
      if (element.id===this.state.editId) {
        todoList[index].content = this.state.value
      }
      index++
    }
    this.setState({
      todoList: todoList,
      flag: 0,
      editId: -1,
      value: '',
    })
  }
  render() {
    const todoListNode = this.state.todoList.map(element => {
      return (
        <TodoElement
          key={element.id}
          todoList={element}
          onDelete={id => this.handleDelete(id)}
          onEdit={todoList => this.handleEdit(todoList)}
        />
      )
    })

    let changeTodo: any
    if (this.state.flag===0) {
      changeTodo = <AddTodo
                    content={this.state.value}
                    count={this.state.count}
                    onChange={key_value => this.handleChange(key_value)}
                    onAdd={todoElement => this.handleAdd(todoElement)}
                   />
    } else {
      changeTodo = <UpdateTodo
                    onChange={key_value => this.handleChange(key_value)}
                    onUpdate={() => this.handleUpdate()}
                    onCancel={() => this.handleCancel()}
                    content={this.state.value}
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
}

class AddTodo extends React.Component<AddTodoProps,{}> {
  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange({
      value: e.target.value
    })
  }

  onAdd() {
    const id: number = this.props.count
    const content: string = this.props.content
    const todoElement: TodoList = {
      id: id,
      content: content
    }
    this.props.onAdd(todoElement)
  }

  render() {
    return (
      <div>
        <input
          type='text'
          value={this.props.content}
          onChange={e => this.onChange(e)}
        />
        <button onClick={() => this.onAdd()}>追加</button>
      </div>
    )
  }
}

class UpdateTodo extends React.Component<UpdateTodoProps, {}> {
  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange({
      value: e.target.value
    })
  }

  onCancel() {
    this.props.onCancel()
  }

  onUpdate() {
    this.props.onUpdate()
  }

  render() {
    return (
      <div>
        <input
          type='text'
          value={this.props.content}
          onChange={e => this.onChange(e)}
        />
        <button onClick={() => this.onUpdate()}>編集</button>
        <button onClick={() => this.onCancel()}>キャンセル</button>
      </div>
    )
  }
}

class TodoElement extends React.Component<TodoElementProps, {}> {
  onDelete() {
    this.props.onDelete(this.props.todoList.id)
  }

  onEdit() {
    this.props.onEdit(this.props.todoList)
  }

  render() {
    return (
      <li>
        <span>{this.props.todoList.content}</span>
        <button onClick={() => this.onDelete()}>削除</button>
        <button onClick={() => this.onEdit()}>編集</button>
      </li>
    )
  }
}

const App: React.FC = () => {
  return (
    <div className="main">
      <TodoApp />
    </div>
  );
}

export default App
