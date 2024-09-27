import { FormEvent } from "react";
import { backendUrl } from "../config";
import { useNavigate } from "react-router-dom";

export default function CreateListRoute() {
  const navigate = useNavigate();

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);
    const list = Object.fromEntries(formData);

    const response = await fetch(`${backendUrl}/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });
    const createdList = await response.json();
    navigate(`/list/${createdList.id}`);
  }

  return (
    <div>
      <h2>Neue Liste</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <span>Name:</span>
            <input type="text" name="title" required />
          </label>
        </div>
        <div>
          <label>
            <span>Email:</span>
            <input type="email" name="email" required />
          </label>
        </div>
        <button type="submit">Anlegen</button>
      </form>
    </div>
  );
}
