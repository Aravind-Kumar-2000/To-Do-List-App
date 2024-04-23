import React from "react";
import {FaTrashAlt} from "react-icons/fa";
import "../Styles/ToDo.css";

function ToDo({handleChange, handleDelete, item}) {
  return (
    <div className="inputContents">
      <input
      className="listInput"
        type="Checkbox"
        checked={item.checked}
        onChange={() => handleChange(item.id)}
      />
      <label className="listLabel"
        onDoubleClick={() => handleChange(item.id)}
        style={item.checked ? { textDecoration: "line-through" } : null}
      >
        {item.task}
      </label>
      <FaTrashAlt style={{color:"white"}} className="deleteInput" onClick={() => handleDelete(item.id)} />
    </div>
  );
}

export default ToDo;
