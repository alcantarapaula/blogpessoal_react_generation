import axios from "axios";

const api = axios.create({
  baseURL: 'https://blogpessoal-0k1j.onrender.com'
})

// Cadastrar usuário
export const cadastrarUsuario = async(url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data)
}

// Autenticar usuário
export const login = async(url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data)
}

// Consultar com token
export const buscar = async(url: string, setDados: Function, header: Object) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data)
}

// cadastrar com token
export const cadastrar = async(url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data)
}

// Atualizar com token
export const atualizar = async(url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data)
}

// deletar com token
export const deletar = async(url: string, header: Object) => {
  await api.delete(url, header);
}