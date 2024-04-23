import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import apiRequest from "../Template/apiRequest";
import ToDo from "./ToDo";
import "../Styles/ToDoList.css";
import { api_url } from "../Template/apiUrl";
uuidv4();

function ToDoList() {
  const [list, setList] = useState([]);

  const API_URL = api_url;

  //GET Request
  useEffect(() => {
    async function fetchList() {
      try {
        const fetchData = await fetch(API_URL);
        const response = await fetchData.json();
        setList(response);
      } catch (err) {
        console.error(err);
      }
    }

    fetchList();
  }, []);

  const [newValue, setNewValue] = useState("");

  //POST Request
  async function addItem(item) {
    const id = uuidv4();
    const addNewItem = { id, task: item, checked: false };
    const pushNewItem = [...list, addNewItem];
    setList(pushNewItem);
    console.log(list);

    const createOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addNewItem),
    };

    const result = await apiRequest(API_URL, createOption);
  }

  function handleSubmit(event) {
    event.preventDefault();
    addItem(newValue);
    setNewValue("");
  }

  //PATCH Request
  async function handleChange(id) {
    const change = list.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setList(change);

    const updateChange = change.filter((item) => item.id === id);
    const updateOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: updateChange[0].checked }),
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOption);
  }

  //DELETE Request
  async function handleDelete(id) {
    const del = list.filter((item) => item.id !== id);
    setList(del);

    const updateDel = del.filter((item) => item.id !== id);
    const delOption = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateDel),
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, delOption);
  }

  return (
    <div className="todolist">
      <form className="todolistform" onSubmit={(event) => handleSubmit(event)}>
        <input
          className="taskInput"
          type="text"
          placeholder="What is the Task today?"
          value={newValue}
          onChange={(event) => setNewValue(event.target.value)}
          required
        />
        <button className="taskInputButton" type="submit">
          Add Task
        </button>
      </form>
      {list.length ? (
        <ul className="inputLists">
          {list.map((item) => (
            <li className="individualList" key={item.id}>
              <ToDo
                item={item}
                handleChange={handleChange}
                handleDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="emptySign">Your list is Empty!</p>
      )}
    </div>
  );
}

export default ToDoList;
