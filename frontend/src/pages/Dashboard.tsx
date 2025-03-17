import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const auth = useContext(AuthContext);

  if (!auth) return <p>Cargando...</p>;

  // Si el usuario no está autenticado, redirige a la página de inicio
  if (!auth.user) return <Navigate to="/" />;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dashboard</h1>
      <p>Bienvenido, {auth.user.displayName}!</p>
      <img src={auth.user.profilePhoto} alt="Avatar" width={100} />
      <p>{auth.user.email}</p>
      <button onClick={auth.logout}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
