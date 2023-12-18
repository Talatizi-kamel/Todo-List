import { useState } from "react";

export function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
}
function EditTodo({ todo, updateTodo }) {
  const [value, setValue] = useState(todo.titre);
  const [loading, setLoading] = useState(false);

  async function tryUpdateTodo(newTodo) {
    try {
      setLoading(true);
      const token = getCookie("token");
      const { id, ...newTodoWithoutId } = newTodo;
      const response = await fetch(
        `http://localhost:3000/api/todolists/${todo.id}`,
        {
          method: "PUT",
          body: JSON.stringify(newTodoWithoutId),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const newTodo = await response.json();
        console.log("je suis la" + newTodo);
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
    if (value.length) {
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
        onClick={() => tryUpdateTodo({ ...todo })}
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
