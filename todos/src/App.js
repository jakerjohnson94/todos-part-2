import React, { Component } from 'react';

import './App.css';
import todoList from './todos.json';

const TodoItem = props => (
  <li key={props.id} className={props.completed ? 'completed' : ''}>
    <div className="view">
      <input
        id={props.id}
        className="toggle"
        onClick={props.handleCheckClick}
        type="checkbox"
        defaultChecked={props.completed}
      />
      <label>{props.title}</label>
      <button id={props.id} onClick={props.handleDeleteClick} className="destroy" />
    </div>
  </li>
);

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: todoList,
    };
  }

  handleKeyPress = event => {
    let todos = this.state.todos;
    if (event.key === 'Enter') {
      const lastTodo = todos[todos.length - 1];
      console.log(lastTodo);
      const newTodo = {
        userId: 1,
        id: lastTodo ? lastTodo.id + 1 : 1,
        title: event.target.value,
        completed: false,
      };
      todos.push(newTodo);
      this.setState({ todos: todos });
    }
  };

  handleCheckClick = () => event => {
    let todos = this.state.todos;
    const listElement = event.target.parentElement.parentElement;
    const id = parseInt(event.target.id);
    const todo = todos.find(a => a.id === id);
    todo.completed === true ? (todo.completed = false) : (todo.completed = true);
    listElement.classList.toggle('completed');

    this.setState({ todo: todos });
  };

  handleDeleteClick = () => event => {
    let todos = this.state.todos;
    const id = parseInt(event.target.id);

    todos = todos.filter(a => a.id !== id);

    this.setState({ todos: todos });
  };
  handleClearClick = () => () => {
    let todos = this.state.todos;
    todos = todos.filter(a => !a.completed);
    this.setState({ todos: todos });
  };

  render() {
    const todos = this.state.todos;

    return (
      <React.Fragment>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            onKeyPress={this.handleKeyPress}
            placeholder="What needs to be done?"
            autoFocus
          />
        </header>
        {todos.length ? (
          <section className="main">
            <ul className="todo-list">
              {todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  completed={todo.completed}
                  handleCheckClick={this.handleCheckClick()}
                  handleDeleteClick={this.handleDeleteClick()}
                />
              ))}
            </ul>
          </section>
        ) : null}
        {/* This footer should hidden by default and shown when there are todos */}
        {todos.length ? (
          <footer className="footer">
            {/* This should be `0 items left` by default */}
            <span className="todo-count">
              <strong>{todos.length}</strong> item(s) left
            </span>
            {/* Remove this if you don't implement routing */}
            {/* Hidden if no completed items are left ↓ */}
            {todos.filter(a => a.completed).length ? (
              <button onClick={this.handleClearClick()} className="clear-completed">
                Clear completed
              </button>
            ) : null}
          </footer>
        ) : null}
      </React.Fragment>
    );
  }
}

class App extends Component {
  render() {
    return (
      <section className="todoapp">
        <TodoList />
      </section>
    );
  }
}
// }

export default App;
