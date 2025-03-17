import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  if (!auth) return <p>Cargando...</p>;

  if (!auth.user) return <Navigate to="/" />;

  useEffect(() => {
    fetch(`${API_URL}/api/user`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error("Error al obtener datos del usuario", err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dashboard</h1>
      <p>Bienvenido, {auth.user.displayName}!</p>
      <img src={auth.user.profilePhoto} alt="Avatar" width={100} />
      <p>{auth.user.email}</p>
      {userData && <p>Datos extra del usuario: {JSON.stringify(userData)}</p>}
      <button onClick={auth.logout}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
