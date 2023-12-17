import { useState } from "react";

function AddTodo({ addTodo }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
  }

  function handleKeyDown(e) {
    if (e.code === "Enter" && value.length) {
      createTodo();
      setValue("");
    }
  }

  async function createTodo() {
    try {
      setLoading(true);
      setError(null);
      const token = getCookie("token");

      if (!token) {
        throw new Error("Token manquant");
      }
      const response = await fetch(
        "http://localhost:3000/api/todolists/insert",
        {
          method: "POST",
          body: JSON.stringify({
            titre: value,
            description: "ma todo", // Assurez-vous de mettre la clé correcte
            statut: "en cours", // Assurez-vous de mettre la clé correcte
          }),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const todo = await response.json();
        addTodo(todo);
      } else {
        setError("Oops, une erreur");
      }
    } catch (e) {
      setError("Oops, une erreur");
    } finally {
      setLoading(false);
    }
    setValue("");
  }

  function handleClick() {
    if (value.length) {
      createTodo();
    }
  }

  return (
    <div className="d-flex flex-row justify-content-center align-items-center mb-20">
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        placeholder="Ajouter une todo"
        className="mr-15 flex-fill"
      />
      {error && <p>{error}</p>}
      <button onClick={handleClick} className="btn btn-primary">
        {loading ? "Chargement" : "Ajouter"}
      </button>
    </div>
  );
}
export function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      console.log("je suis le" + cookieValue);
      return cookieValue;
    }
  }
}
export default AddTodo;
