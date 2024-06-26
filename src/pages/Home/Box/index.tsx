import { IBox } from "../../../interfaces/IBox/IBox";
import styles from './box.module.sass';
import logo from '../../assets/img/portologo.png'
import { useContext, useState } from "react";
import http from "../../../environment/environment";
import { GlobalContext } from "../../../store/GlobalState";

export default function Box(props: IBox) {
    const [opens, setOpens] = useState<boolean[]>(Array(props.manager.length).fill(false));
    const { setIdOpen }: any = useContext(GlobalContext);

    const toggleOpen = (index: number) => {
        setOpens(prevOpens => {
            const newOpens = [...prevOpens];
            newOpens[index] = !newOpens[index];
            return newOpens;
        });
    };

    async function liberarVotacao(id: string) {
        try {
            const response = await http.put(`puzzle/${id}`, { "sorteado": 1 });
            console.log(response.data);
        } catch (error) {
            console.error("Ocorreu um erro ao liberar a votação:", error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.container__box}>
                {props.manager.map((element, index) => {
                    const avaliado = props.avaliados.find((avaliado: any) => avaliado.id === element._id);
                    let cor = '';

                    if (avaliado) {
                        switch (avaliado.status) {
                            case 1:
                                cor = styles.azulClaro;
                                break;
                            case 2:
                                cor = styles.amarelo;
                                break;
                            case 3:
                                cor = styles.preto;
                                break;
                            default:
                                cor = styles.vermelho;
                                break;
                        }
                    } else {
                        cor = styles.vermelho;
                    }

                    return (
                        <div
                            className={`${styles.container__box_div} ${cor} ${opens[index] ? styles.open : ''}`}
                            onClick={async () => {
                                toggleOpen(index)
                                setIdOpen(element._id)
                                await liberarVotacao(element._id)
                            }}
                            key={index}
                        >
                            {opens[index] ? (
                                <div className={styles.container__box_div_content}>
                                    <span className={styles.container__box_div_content_fixed} style={{ paddingBottom: "7rem" }}>{element.diretor}</span>
                                    <span className={styles.container__box_div_content_fixed} style={{ fontSize: "2rem" }}>&</span>
                                    <span className={styles.container__box_div_content_fixed} style={{ paddingTop: "6.5rem" }}>{element.suporte}</span>
                                </div>
                            ) : (
                                <>
                                    <img src={logo} alt='logo' />
                                    <span className={styles.container__box_div_content_number}>{index + 1}</span>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
