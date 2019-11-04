import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export  default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ]
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {
        const newItem = {
            label: text,
            important: false,
            id: this.maxId++
        };
        this.setState(({ todoData }) => {
            const newArray = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newArray
            }
        });
    };

    onToggleImportant = (id) => {
        console.log('Toggle Important', id);
    };
    onToggleDone = (id) => {
        console.log('Toggle Done', id);
    };


    render() {
        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={3} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
            </div>

            <TodoList
                todos={this.state.todoData}
                onDeleted={ this.deleteItem }
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone}
            />
            <ItemAddForm onItemAdded={ this.addItem }/>
        </div>
        );
    }
};

