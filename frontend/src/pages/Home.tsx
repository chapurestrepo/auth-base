import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const auth = useContext(AuthContext);

  if (!auth) return <p>Cargando...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenido a Auth App</h1>
      {auth.user ? (
        <>
          <p>Hola, {auth.user.displayName}!</p>
          <Link to="/dashboard">Ir al Dashboard</Link>
        </>
      ) : (
        <>
          <p>Inicia sesión para acceder a más contenido.</p>
          <button onClick={auth.login}>Login con Google</button>
        </>
      )}
    </div>
  );
};

export default Home;
