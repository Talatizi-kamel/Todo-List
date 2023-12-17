import { useState } from "react";
import { getCookie } from "./AddTodo";

function EditTodo({ todo, updateTodo }) {
  const [value, setValue] = useState(todo.content);
  const [loading, setLoading] = useState(false);

  async function tryUpdateTodo(newTodo) {
    const token = getCookie("token");

    if (!token) {
      throw new Error("Token manquant");
    }
    try {
      setLoading(true);
      const { _id, ...newTodoWithoutId } = newTodo;
      const response = await fetch(
        `http://localhost:3000/api/todolists/${todo.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(newTodoWithoutId),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const newTodo = await response.json();
        updateTodo(newTodo);
      } else {
        console.log("Erreur");
      }
    } catch (e) {
      console.log("Erreur");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
  }

  function handleKeyDown(e) {
    if (e.code === "Enter" && value.length) {
      tryUpdateTodo({ ...todo, content: value, edit: false });
      setValue("");
    }
  }

  function handleClick() {
    if (value.length) {
      tryUpdateTodo({ ...todo, content: value, edit: false });
      setValue("");
    }
  }

  return (
    <div className="d-flex flex-row justify-content-center align-items-center mb-10">
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        placeholder="Ajouter une todo"
        className="mr-15 flex-fill"
      />
      <button
        onClick={() => tryUpdateTodo({ ...todo, edit: false })}
        className="btn btn-reverse-primary mr-15"
      >
        Annuler
      </button>
      <button onClick={handleClick} className="btn btn-primary">
        Sauvegarder
      </button>
    </div>
  );
}

export default EditTodo;
