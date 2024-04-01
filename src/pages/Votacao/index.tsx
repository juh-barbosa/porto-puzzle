import { useEffect, useState } from "react";
import styles from './Votacao.module.sass';
import http from "../../environment/environment";
import like from '../assets/img/gostar.png'
import deslike from '../assets/img/nao-gosto.png'

export default function Votacao() {
    const [modalName, setModalName] = useState(true);
    const [name, setName] = useState('');
    const [manager, setManager] = useState([]);
    const [votedIds, setVotedIds] = useState<string[]>([]);

    async function getDiretores() {
        await http.get('puzzle').then((res) => {
            setManager(res.data);
        });
    }

    async function votar(id: string, status: boolean) {
        await http.put(`puzzle/votacao/${name}`, {
            id: id,
            status: status
        });
        setVotedIds([...votedIds, id]);
        await getDiretores();
    }

    useEffect(() => {
        getDiretores();

        const intervalId = setInterval(() => {
            getDiretores();
        }, 30000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <section className={styles.container}>
            {
                modalName ?
                    <div className={styles.container__modal}>
                        <h1>INSERIR NOME</h1>
                        <input
                            type="text"
                            placeholder="NOME"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <button disabled={name === ''} onClick={() => setModalName(false)}>ENVIAR</button>
                    </div>
                    :
                    <div className={styles.container_diretores}>
                        <h1 className={styles.container_diretores_title}>VOTAÇÃO ATIVA</h1>
                        <h1 className={styles.container_diretores_title}>VOCÊ GOSTOU DESSA RESPOSTA ?</h1>
                        {
                            manager.map((element: any) => (
                                <div className={styles.container_diretores_div}
                                     style={element.sorteado === 1 && !votedIds.includes(element._id) ? { "display": "flex" } : {}}>
                                    <span
                                        className={styles.container_diretores_div_span}>{element.diretor} & {element.suporte}</span>
                                    <div className={styles.container_diretores_div_buttons}>
                                        <button className={styles.container_diretores_div_buttons_aprovar} onClick={() => votar(element._id, true)}>
                                            <img src={like} alt='' /> GOSTEI
                                        </button>
                                        <button className={styles.container_diretores_div_buttons_desaprovar} onClick={() => votar(element._id, false)}>
                                            <img src={deslike} alt='' /> NÃO GOSTEI
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }
        </section>
    )
}
