import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";


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
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [isAuthInitialized, setIsAuthInitialized] = useState(false); // Nuevo estado


  useEffect(() => {
    // Simula la inicialización de auth si es necesario
    if (auth) {
      setIsAuthInitialized(true);
    }
  }, [auth]);

  useEffect(() => {
    if (isAuthInitialized && auth && auth.user) {
      fetch(`${API_URL}/auth/user`, { credentials: "include" })
        .then((res) => res.json())
        .then((data: UserData) => {
          setUserData(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error al obtener datos del usuario", err);
          setIsLoading(false);
        });
    } else if (isAuthInitialized) {
      setIsLoading(false);
    }
  }, [auth, isAuthInitialized]);

  if (isLoading || !isAuthInitialized) return <p>Cargando...</p>;

  if (!auth || !auth.user) {
    // Mostrar mensaje estático con botón de login
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Acceso restringido</h1>
        <p>Debes iniciar sesión para acceder al Dashboard.</p>
        <button onClick={auth?.login}>Login con Google!</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dashboard</h1>
      <p>Bienvenido, {auth.user.displayName}!</p>
      <img src={auth.user.profilePhoto} alt="Avatar" width={100} />
      <p>{auth.user.email}</p>
      {userData && (
        <>
          <p>Datos extra del usuario:</p>
          <div>
            <p>ID: {userData._id}</p>
            <p>Google ID: {userData.googleId}</p>
            <p>Nombre: {userData.displayName}</p>
            <p>Email: {userData.email}</p>
            <img src={userData.profilePhoto} alt="Foto de perfil" width={50} />
          </div>
        </>
      )}
      <button onClick={auth.logout}>Cerrar sesión.</button>
    </div>
  );
};

export default Dashboard;