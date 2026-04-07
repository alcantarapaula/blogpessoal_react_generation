import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

  
  // Objeto responsável por redirecionar o usuário pora uma outra rota, sair de um compotente pra outro
  const navigate = useNavigate();

  const {handleLogout} = useContext(AuthContext);

  function logout() {
    handleLogout();
    alert('O Usuário foi desconectado com sucesso!');
    navigate('/')
  }
  
  return (
    <>
      <div className="w-full flex justify-center py-4 bg-indigo-900 text-white"
      >
        <div className="container flex justify-between text-lg mx-8"
        >
          <Link to="/home" className="text-2xl font-bold">
          Blog da Paula
          </Link>
          <div className="flex gap-4"
          >
            Postagem
            <Link to="/temas" className="hover:underline">
              Temas
            </Link>
            <Link to="/cadastrartema" className="hover:underline">
              Cadastrar Tema
            </Link>
            Perfil 
            <Link to="" onClick={logout} className="hover:underline">
              Sair
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar