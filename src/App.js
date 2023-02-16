import React, { useState } from "react";
import './style.css';

const App = () => {
  // todoのstate
  const [todos, setTodos] = useState([]);

  // 入力された内容のstate
  const [addTodo, setAddTodo] = useState("");

  // 進行状況のstate
  const [todoStatus, setTodoStatus] = useState(true)

  // 入力された値を取得してAddTodoを更新
  const addTodoList = (e) => {
    setAddTodo(e.target.value);
  };

  // Addボタンを押したらtodosに追加される関数
  const submitTodo = (e) => {
    e.preventDefault();
    if (addTodo !== "") {
      setTodos([...todos, { id: todos.length + 1, text: addTodo.trim(), status: "Waiting" }]);
    };
    setAddTodo("");
  };

  // Deleteを押したら削除する関数
  const delTodo = (id) => {
    const removedItem = todos.filter(todo => todo.id !== id);
    setTodos(removedItem);
  };

  // Doneになったら打消し線が引かれる関数
  const doneTodo = (e, id) => {
    e.preventDefault();
    // セレクトボックスの文字列を取得
    const todoOption = e.target.value;
    // ???
    // todosのidと変更のあったidが同じなら打消し線を引きたい
    // 現状だと1つ変えたら全部変わってしまう
    todos.find(todo => todo.id === id) &&
    todoOption === "Done" ? setTodoStatus(false) : setTodoStatus(true);
    }

  return (
    <>
      <h1>My Todo List</h1>
      <form onSubmit={submitTodo}>
        <input
          name="todo"
          placeholder="Input your todo!"
          type="text"
          value={addTodo}
          onChange={addTodoList}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todoStatus ? <span>{todo.text}</span> :
            <span className="done">{todo.text}</span>}
              <select onChange={(e)=>doneTodo(e, todo.id)}>
                <option value={"waiting"}>Waiting</option>
                <option value={"Done"} >Done</option>
              </select>
            
            <button>Edit</button>
            <button onClick={()=>delTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>

  );
}

export default App;
