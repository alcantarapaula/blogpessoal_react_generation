import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, cadastrar, atualizar} from "../../../services/Service";
import { ClipLoader } from "react-spinners";

function FormTema() {

    // Objeto responsável por redirecionar o usuário pora uma outra rota, sair de um compotente pra outro
  const navigate = useNavigate();

  //Estado para configurar o loader (animação de carregamento)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estado para receber os dados do tema que está presente no backend
  const [tema, setTema] = useState<Tema>({} as Tema);

  // Acessar o token do usuário autenticado
  const { usuario, handleLogout} = useContext(AuthContext);

  // Cria um objeto para armazenar o token
  const token = usuario.token;

  // Acessar o parâmetro id da rota de edção do tema
  const {id} = useParams<{id: string}>()

  // Função para buscar tema por id no backend que será atualizada
    async function buscarTemaPorId(){
      try{
        setIsLoading(true)
  
        await buscar(`/temas/${id}`, setTema, {
          headers: {Authorization: token}
        })
      }catch(error: any){
        if(error.toString().includes('401')){
          handleLogout();
  
        }
      } finally {
        setIsLoading(false);
      }
    }

  // Cria um useEffect para monitorar o token
  useEffect( () => {
    if(token === '') {
      alert('É preciso estar logado para realizar esta ação');
      navigate('/')
    }
  }, [token])

  // Cria um useEffect para monitorar o id da rota do componente
  useEffect( () => {
    if(id !== undefined) {
      buscarTemaPorId()
    }
  }, [id])

  // Função de atualização do estado tema
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setTema({
      ...tema,
      [e.target.name]: e.target.value
    })
  }

  async function gerarNovoTema(e: SyntheticEvent<HTMLFormElement>){
    e.preventDefault();
    setIsLoading(true);
    
    if(tema.id !== 0) {
      try{
        await atualizar('/temas', tema, setTema, {
          headers: {Authorization: token}
        });
        alert("Tema atualizado com sucesso!")
      }catch(error: any){
        if(error.toString().includes('401')){
          handleLogout();
        } else {
          alert('Erro ao Cadastrar o Tema')
        }
    }

    } else {
      try{
        await cadastrar('/temas', tema, setTema, {
          headers: {Authorization: token}
        });
        alert("Tema cadastrado com sucesso!")
      }catch(error: any){
        if(error.toString().includes('401')){
          handleLogout();
        } else {
          alert('Erro ao Cadastrar o Tema')
        }
      }
    }

    setIsLoading(false);
    retornar() 
  }

  function retornar() {
    navigate('/temas')
  }


  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">{id === undefined ? "Cadastrar" : "Editar"} Tema</h1>
      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição do Tema</label>
          <input type="text" 
            placeholder="Descreva aqui o seu tema"
            name="descricao"
            className="border-2 border-slate-700 rounded p-2"
            value={tema.descricao}
            onChange={(e:ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <button
          className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
          type="submit"
        >
          {
            isLoading ?

              <ClipLoader
                color="#ffffff"
                size={24}
              />

            :

              <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>

          }
        </button>
      </form>
    </div>
  )
}

export default FormTema