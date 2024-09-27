import { Link } from "react-router-dom";

export default function StartRoute() {
  return (
    <div>
      <h1>Feierabend</h1>
      <Link to="/create">Anlegen</Link>
    </div>
  );
}
