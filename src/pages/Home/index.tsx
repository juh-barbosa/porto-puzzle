import styles from './home.module.sass'
import Box from "./Box";

export default function Home(){
    const manager = [
        {
            'name': 'Manfrin',
            'support': 'Allan'
        },
        {
            'name': 'Manfrin',
            'support': 'Gabi'
        },{
            'name': 'Manfrin',
            'support': 'Felix'
        },{
            'name': 'Manfrin',
            'support': 'Marco'
        },{
            'name': 'Allan',
            'support': 'Gabi'
        },{
            'name': 'Allan',
            'support': 'Felix'
        },{
            'name': 'Allan',
            'support': 'Marco'
        },{
            'name': 'Gabi',
            'support': 'Felix'
        },{
            'name': 'Gabi',
            'support': 'Marco'
        },{
            'name': 'Felix',
            'support': 'Marco'
        },
    ]
    return (
        <section className={styles.container}>
            <h1  className={styles.container__title}>PORTO PUZZLE</h1>
            <Box
                manager={manager}
            />
        </section>
    )
}
