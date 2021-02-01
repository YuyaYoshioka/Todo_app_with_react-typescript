import React from 'react';

type TodoAppState = {
  value: string
  todoList: TodoList[]
  count: number
}

type TodoList = {
  id: number
  content: string
}

type AddTodoProps = {
  content: string
  count: number
  onChange: (key_value: HashStringString) => void
  onAdd: (todoElement: TodoList) => void
}

type HashStringString = {
  [key: string]: string
}

class TodoApp extends React.Component<{}, TodoAppState> {
  state: TodoAppState = {
    value: '',
    todoList: [],
    count: 0,
  }

  handleChange(key_value: HashStringString) {
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

  render() {
    const todoListNode = this.state.todoList.map(element => {
      return (
        <li key={element.id}>{element.content}</li>
      )
    })
    return (
      <div>
        <h1>Todo App</h1>
        <AddTodo
          content={this.state.value}
          count={this.state.count}
          onChange={key_value => this.handleChange(key_value)}
          onAdd={todoElement => this.handleAdd(todoElement)}
        />
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

const App: React.FC = () => {
  return (
    <div className="main">
      <TodoApp />
    </div>
  );
}

export default App
