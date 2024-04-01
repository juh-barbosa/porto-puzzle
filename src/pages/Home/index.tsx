import styles from './home.module.sass'
import Box from "./Box";
import {useEffect, useState} from "react";
import http from "../../environment/environment";

export default function Home(){
    const [manager, setManager] = useState([])

    async function getDiretores(){
        await http.get('puzzle').then((res) => {
            setManager(res.data)
        })
    }

    useEffect(() => {
        getDiretores()
    }, [])

    return (
        <section className={styles.container}>
            <h1  className={styles.container__title}>PORTO PUZZLE</h1>
            <Box
                manager={manager}
            />
        </section>
    )
}
