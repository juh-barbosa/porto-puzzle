import {IBox} from "../../../interfaces/IBox/IBox";
import styles from './box.module.sass';
import logo from '../../assets/img/portologo.png'
import {useState} from "react";

export default function Box(props: IBox) {
    // Estado para rastrear a abertura de cada elemento
    const [opens, setOpens] = useState<boolean[]>(Array(props.manager.length).fill(false));

    // Função para alternar o estado de abertura de um elemento
    const toggleOpen = (index: number) => {
        setOpens(prevOpens => {
            const newOpens = [...prevOpens];
            newOpens[index] = !newOpens[index];
            return newOpens;
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.container__box}>
                {props.manager.map((element, index) => (
                    <div
                        className={`${styles.container__box_div} ${opens[index] ? styles.open : ''}`}
                        onClick={() => toggleOpen(index)}
                        key={index}
                    >
                        {opens[index] ? (
                            <div className={styles.container__box_div_content}>
                                <span className={styles.container__box_div_content_fixed} style={{paddingBottom: "3rem"}}>{element.name} &</span>
                                <span className={styles.container__box_div_content_fixed} style={{paddingTop: "9rem"}}>{element.support}</span>
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

