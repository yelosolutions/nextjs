import styles from './layout.module.css';
import Header from 'next/head';
import utils from '../styles/utils.module.css'
import Image from 'next/head'

export default function Layout({children}) {

    const name = 'Jay';

    return <>
    {home? (
        <Header>
            <Image
                sr
            />
        </Header>
    ) : (

    )}
    </>
}