import {IBox} from "../../../interfaces/IBox/IBox";
import styles from './box.module.sass';
import logo from '../../assets/img/portologo.png'
import {useState} from "react";
import http from "../../../environment/environment";

export default function Box(props: IBox) {
    const [opens, setOpens] = useState<boolean[]>(Array(props.manager.length).fill(false));

    const toggleOpen = (index: number) => {
        setOpens(prevOpens => {
            const newOpens = [...prevOpens];
            newOpens[index] = !newOpens[index];
            return newOpens;
        });
    };

    async function liberarVotacao(id: string) {
        try {
            const response = await http.put(`puzzle/${id}`, { "sorteado": 2 });
            console.log(response.data);
        } catch (error) {
            console.error("Ocorreu um erro ao liberar a votação:", error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.container__box}>
                {props.manager.map((element, index) => (
                    <div
                        className={`${styles.container__box_div} ${opens[index] ? styles.open : ''}`}
                        onClick={ async () => {
                            toggleOpen(index)
                            await liberarVotacao(element._id)
                        }}
                        key={index}
                    >
                        {opens[index] ? (
                            <div className={styles.container__box_div_content}>
                                <span className={styles.container__box_div_content_fixed} style={{paddingBottom: "8.5rem"}}>{element.diretor}</span>
                                <span className={styles.container__box_div_content_fixed} style={{fontSize: "3rem"}}>&</span>
                                <span className={styles.container__box_div_content_fixed} style={{paddingTop: "7.5rem"}}>{element.suporte}</span>
                            </div>
                        ) : (
                            <>
                                <img src={logo} alt='logo'/>
                                <span className={styles.container__box_div_content_number}>{index + 1}</span>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
