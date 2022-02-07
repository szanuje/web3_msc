import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Smart Contract interactive app</h1>

                <p className={(styles.description, styles.card)}>
                    Please connect your wallet
                </p>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h2>Send assets</h2>
                        <input className={styles.input}></input>
                        <button className={styles.btn}>
                            <p>Send Ether</p>
                        </button>
                    </div>

                    <div className={styles.card}>
                        <h2>Get assets amount</h2>
                        <input read-only={true} className={styles.input}></input>
                        <button className={styles.btn}>
                            <p>Get assets</p>
                        </button>
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://github.com/szanuje"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Created by M.P
                </a>
            </footer>
        </div>
    );
};

export default Home;