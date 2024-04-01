import styles from './home.module.sass'
import Box from "./Box";
import {useContext, useEffect, useState} from "react";
import http from "../../environment/environment";
import {GlobalContext} from "../../store/GlobalState";

export default function Home(){
    const [manager, setManager] = useState<any>([])
    const { idOpen }: any = useContext(GlobalContext);
    const [avaliados, setAvaliados] = useState<any>([])

    function shuffle(array: any) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    async function getDiretores(){
        await http.get('puzzle').then((res) => {
            const shuffledManager = shuffle(res.data);
            setManager(shuffledManager);
        })
    }

    async function encerrarVotacao(){
        await http.put(`/puzzle/${idOpen}`, {
            sorteado: 2
        })

        await http.get(`puzzle/votacao/resultado/${idOpen}`).then((res) => {
            setAvaliados([...avaliados, {
                id: idOpen,
                status: res.data
            }])
        })
    }

    useEffect(() => {
        getDiretores()
    }, [])

    return (
        <section className={styles.container}>
            <h1 className={styles.container__title} style={{width: "90%", textAlign: "center"}}>PORTO PUZZLE</h1>
            <button style={{width: "5%", height: "2rem", marginBottom: "1rem", cursor: "pointer", backgroundColor: "rgba(0,161,252,0.18)", borderStyle: "none", color: "rgba(0,0,0,0.49)"}} onClick={async () => {
                await encerrarVotacao()
            }} >ENCERRAR</button>
            <Box
                manager={manager}
                avaliados={avaliados}
            />
        </section>
    )
}
