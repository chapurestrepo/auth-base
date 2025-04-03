import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

// Define la interfaz para el tipo de userData
interface UserData {
  _id: string;
  googleId: string;
  displayName: string;
  email: string;
  profilePhoto: string;
  __v?: number; // Opcional si no siempre está presente
}

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState<UserData | null>(null); // Tipar el estado

  if (!auth) return <p>Cargando...</p>;

  if (!auth.user) return <Navigate to="/" />;

  useEffect(() => {
    fetch(`${API_URL}/auth/user`, { credentials: "include" })
      .then((res) => res.json())
      .then((data: UserData) => setUserData(data))
      .catch((err) => console.error("Error al obtener datos del usuario", err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dashboard</h1>
      <p>Bienvenido, {auth.user.displayName}!</p>
      <img src={auth.user.profilePhoto} alt="Avatar" width={100} />
      <p>{auth.user.email}</p>
      {userData && <><p>Datos extra del usuario:</p>
      <div>
      <p>ID: {userData._id}</p>
      <p>Google ID: {userData.googleId}</p>
      <p>Nombre: {userData.displayName}</p>
      <p>Email: {userData.email}</p>
      <img src={userData.profilePhoto} alt="Foto de perfil" width={50} />
    </div></>
    }
      <button onClick={auth.logout}>Cerrar sesión.</button>
    </div>
  );
};

export default Dashboard;
