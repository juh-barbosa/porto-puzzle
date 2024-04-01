export interface IBox {
    manager: people[];
    avaliados: any;
}

interface people {
    _id: string;
    diretor: string;
    suporte: string;
    sorteado: number;
}
