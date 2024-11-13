import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
const apiurl = "http://localhost:5000/filmes"


function App() {

  const [filmes, setFilmes] = useState([]);
  const [nome, setNome] = useState("");
  const [desc, setDesc] = useState("");
  const [poster, setPoster] = useState();
  const [data, setData] = useState("");


  useEffect(() => {
    fetchFilmes();
  }, [])

  const fetchFilmes = async () => {
    try {
      const r = await axios.get(apiurl);
      setFilmes(r.data);
    } catch (e) {
      console.error(e);
    }
  }

  const handleAddFilme = async () => {

    if (!nome || !desc || !data || !poster) return;

    try {
      const r = await axios.post(apiurl, { nome, desc, data, poster });
      setFilmes([...filmes, r.data]);
      setNome("")
      setDesc("")
      setData("")
      setPoster("")
    }
    catch (e) {
      console.error(e)
    }

  }

  const handleUpdateFilme = async (id) => {

    if (!id || !nome || !desc || !data) return

    try {
      const r = await axios.put(`${apiurl}/${id}`, { nome, desc, data, poster });
      setFilmes((prev) => {
        return prev.map((filme) => {
          if (filme.id === id) {
            return {
              ...filme,
              nome: nome,
              descricao: desc,
              data: data,
              poster: poster
            };
          }
          return filme;
        });
      });
      setNome("")
      setDesc("")
      setData("")
      setPoster("")
    } catch (e) {
      console.error(e)
    }

  }

  const handleDeleteFilme = async (id) => {
    if (!id) return;
    try {
      setFilmes((prev) => { 
        return prev.filter((filme) => filme.id !== id)
      })
      const r = await axios.delete(`${apiurl}/${id}`);
    } catch (error) {
      console.error("Erro", error);
    }
  };

  return (
    <div className="App">
      <div>
        <h2>Filmes</h2>
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="text" placeholder="Desc" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <input type="url" placeholder="Poster" value={poster} onChange={(e) => setPoster(e.target.value)} />
        <input type="date" placeholder="Data" value={data} onChange={(e) => setData(e.target.value)} />
        <button onClick={handleAddFilme}>Adicionar Filme</button>
        <ul>
          {filmes.map((filme) => (
            <li key={filme.id} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div>
                <img src={filme.poster} style={{ width: 100, height: 100}} />
              </div>
              {filme.id} - {filme.nome}
              <div>
                <a onClick={() => { handleDeleteFilme(filme.id) }} style={{ marginLeft: "1rem", cursor: "pointer" }}>Deletar</a>
                <a onClick={() => { handleUpdateFilme(filme.id) }} style={{ marginLeft: "1rem", cursor: "pointer" }}>Editar</a>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default App;
