

function Home() {
  return (
    <section className="bg-indigo-900 flex justify-center">
      <article className="container grid grid-cols-1 md:grid-cols-2 text-white">
        <figure
        className="flex justify-center pb-4 md:pb-0 order-first md:order-last"
        >
          <img
          src="https://i.imgur.com/fyfri1v.png"
          alt="Imagem Página Home"
          className="w-1/2 md:w-2/3"
          />
        </figure>
        <div className="flex flex-col justify-center items-center gap-4 py-4 text-center md:text-left order-last md:order-first">
          <h2 className="text-5xl font-bold">Seja Bem Vindo!</h2>
          <p
           className="text-xl"
          >Expresse aqui os seus pensamentos e opiniões</p>
          <div className="flex justify-around gap-4">
            <div
            className="rounded border-white border-solid border-2 py-2 px-4"
            >
              Nova Postagem
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}

export default Home