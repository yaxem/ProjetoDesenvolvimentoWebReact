import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
const apiurl = "http://localhost:5000/filmes";

function App() {
  const [filmes, setFilmes] = useState([]);
  const [nome, setNome] = useState("");
  const [desc, setDesc] = useState("");
  const [poster, setPoster] = useState("");
  const [data, setData] = useState("");
  const [editId, setEditId] = useState(null); 

  useEffect(() => {
    fetchFilmes();
  }, []);

  const fetchFilmes = async () => {
    try {
      const r = await axios.get(apiurl);
      setFilmes(r.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddFilme = async () => {
    if (!nome || !desc || !data || !poster) return;

    try {
      const r = await axios.post(apiurl, { nome, desc, data, poster });
      setFilmes([...filmes, r.data]);
      clearForm();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateFilme = async () => {
    if (!editId || !nome || !desc || !data || !poster) return;

    try {
      const r = await axios.put(`${apiurl}/${editId}`, { nome, desc, data, poster });
      setFilmes((prev) => {
        return prev.map((filme) => (filme.id === editId ? r.data : filme));
      });
      clearForm();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditClick = (filme) => {
    setEditId(filme.id);
    setNome(filme.nome);
    setDesc(filme.descricao);
    setData(filme.data);
    setPoster(filme.poster);
  };

  const handleDeleteFilme = async (id) => {
    if (!id) return;
    try {
      setFilmes((prev) => prev.filter((filme) => filme.id !== id));
      
      await axios.delete(`${apiurl}/${id}`);
      
    } catch (error) {
      console.error("Erro", error);
    }
  };
  

  const clearForm = () => {
    setNome("");
    setDesc("");
    setData("");
    setPoster("");
    setEditId(null);
  };

  const handleSubmit = () => {
    if (editId) {
      handleUpdateFilme();
    } else {
      handleAddFilme();
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
        <button onClick={handleSubmit}>
          {editId ? "Atualizar Filme" : "Adicionar Filme"}
        </button>
        {editId && <button onClick={clearForm}>Cancelar</button>}
        <ul>
          {filmes.map((filme) => (
            <li key={filme.id} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div>
                <img src={filme.poster} alt="poster" style={{ width: 100, height: 100 }} />
              </div>
              {filme.id} - {filme.nome}
              <div>
                <a onClick={() => handleDeleteFilme(filme.id)} style={{ marginLeft: "1rem", cursor: "pointer" }}>
                  Deletar
                </a>
                <a onClick={() => handleEditClick(filme)} style={{ marginLeft: "1rem", cursor: "pointer" }}>
                  Editar
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
