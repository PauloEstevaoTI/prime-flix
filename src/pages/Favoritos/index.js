import { useEffect, useState } from 'react';
import "./favoritos.css";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


function Favoritos() {

    const [filmes, setFilmes] = useState([]);
    

    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeFlix");
        setFilmes(JSON.parse(minhaLista) || []);
    
    }, []);

    function excluirFilme(id){
        
        let filtrosFilmes = filmes.filter((item)=> {
            return (item.id !== id);
        })

        setFilmes(filtrosFilmes);

        localStorage.setItem("@primeFlix", JSON.stringify(filtrosFilmes));
        toast.success("Filme removido com sucesso!");
    }

    return(
        <div className='meus-filmes'>
            <h2>Minha lista</h2>

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}

            <ul>
               {filmes.map((item)=> {                   
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filmes/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>                  
                    )
               })}
            </ul> 
        </div>
        
    )
}

export default Favoritos;

