import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom"
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ClipLoader } from "react-spinners";

function Cadastro() {

  // Objeto responsável por redirecionar o usuário pora uma outra rota, sair de um compotente pra outro
  const navigate = useNavigate();

  //Estado para configurar o loader (animação de carregamento)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Estado para confirmar senha digitada pelo usuário
  const [confirmarSenha, setConfirmarSenha] = useState<string>('')

  // Estado usuário para armazenar os dados do usuário que será cadastrado
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  })

  // Função de atualização do estado usuário

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  // Função de atualização do estado confirmarSenha
  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(e.target.value)
  }

  // Função para enviar os dados para o backend
  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);

    if(confirmarSenha === usuario.senha && usuario.senha.length >= 8){

      try{
        await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuario);

        alert('Usuário cadastrado com sucesso!');
      }catch{
        alert('Erro ao cadastrar o usuário!');
      }
    } else {
      alert('A senha deve ter no mínimo 8 caracteres');
      setUsuario({
        ...usuario,
        senha: ''
      });
      setConfirmarSenha('');
    }

    setIsLoading(false)
  }

  function retornar() {
    navigate('/')
  }

  // Useeffect vai controlar o redirecionamento par aa página de login caso o cadastro seja bem sucedido

  useEffect(() => {
    if(usuario.id !== 0) {
      retornar()
    }
  }, [usuario])

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        <div className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center">

        </div>
        <form className="flex justify-center items-center flex-col w-2/3 gap-3"
        onSubmit={cadastrarNovoUsuario}
        >
          <h2 className="text-slate-900 text-5xl">Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.nome}
            onChange={(e:ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuário</label>
            <input type="text"
            id="usuario"
            name="usuario"
            placeholder="Usuário"
            className="border-2 border-slate-700rounded p-2"
            value={usuario.usuario}
            onChange={(e:ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input type="text"
            id="foto"
            name="foto"
            placeholder="Foto"
            className="border-2 border-slate-700rounded p-2"
            value={usuario.foto}
            onChange={(e:ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            className="border-2 border-slate-700rounded p-2"
            value={usuario.senha}
            onChange={(e:ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            className="border-2 border-slate-700rounded p-2"
            value={confirmarSenha}
            onChange={(e:ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button type="reset"
            className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2"
            onClick={retornar}
            >
              Cancelar
            </button>
            <button type="submit"
            className="rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2 flex justify-center">
              {
								isLoading ?
 
									<ClipLoader
										color="#ffffff"
										size={24}
									/>
 
								:
 
									<span>Cadastrar</span>
 
							}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro