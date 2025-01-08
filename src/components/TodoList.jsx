import React, { useState, useEffect } from 'react';
import { Trash2, CheckCircle, Circle, PlusCircle } from 'lucide-react';

const TodoList = () => {
    const [todos, setTodos] = useState(() => {
        // 從 localStorage 讀取已存在的待辦事項
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [newTodo, setNewTodo] = useState('');

    // 當 todos 改變時，保存到 localStorage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // 新增待辦事項
    const addTodo = (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        setTodos([...todos, {
            id: Date.now(),
            text: newTodo.trim(),
            completed: false
        }]);
        setNewTodo('');
    };

    // 切換待辦事項狀態
    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    // 刪除待辦事項
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">待辦事項清單</h1>

            <form onSubmit={addTodo} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="新增待辦事項..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-1"
                >
                    <PlusCircle size={20} />
                    新增
                </button>
            </form>

            <ul className="space-y-3">
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => toggleTodo(todo.id)}
                                className="text-gray-500 hover:text-blue-500"
                            >
                                {todo.completed ?
                                    <CheckCircle className="text-green-500" size={20} /> :
                                    <Circle size={20} />
                                }
                            </button>
                            <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {todo.text}
              </span>
                        </div>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className="text-gray-400 hover:text-red-500"
                        >
                            <Trash2 size={20} />
                        </button>
                    </li>
                ))}
            </ul>

            {todos.length === 0 && (
                <p className="text-center text-gray-500 mt-6">目前沒有待辦事項</p>
            )}
        </div>
    );
};

export default TodoList;