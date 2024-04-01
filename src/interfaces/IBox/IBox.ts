export interface IBox {
    manager: people[]
}

interface people {
    _id: string;
    diretor: string;
    suporte: string;
    sorteado: number;
}
