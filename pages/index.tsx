import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import RecorderControls from "../components/controls";
import RecordingsList from "../components/recorder";
import useRecorder from "../hooks/use-recorder";
import { UseRecorder } from "../types/recorder";
import ReactHowler from "react-howler"
import { Howl } from "howler"
import { FaMusic, FaStop } from "react-icons/fa"
import { useState } from 'react';

const Home: NextPage = () => {
  const { recorderState, ...handlers }: UseRecorder = useRecorder();
  const { audio } = recorderState;
  const sound = new Howl({
    src: ['/sample.mp3'],
    volume: 0.2,
    html5: true
  }); 

  const convertToBase64 = (file: any) => {
    console.log("audio:", file)
  };

  const createRecord = async () => {
    const converted = convertToBase64(audio)
    const res = await fetch('/api/record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        masterpiece: converted
      }),
    });
    const data = await res.json();
    console.log(data);
  }

  function startInstrument() {
    sound.play()
  }

  function stopInstrument() {
    sound.stop()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Soundbox Experiment</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <h4 style={{ color: "#ffffff" }}>
      for you, for you, i might drown myself if that with let me follow you up there.
it's been a while since we spoke, and now babby i'm all by myself.
hold on, hold on before you leave I will made up for what I did last night.
I know, I know I was a jerk, so let me made everything alright.(height up)
        </h4>

        <div className={styles.grid}>
          <div className="card">
          {/* <ReactHowler
        src='/sample.mp3'
        playing={true} />  */}
          <div className="flex">
          <button onClick={startInstrument} className="music-start">
            <FaMusic color="#fff" size={20} /> Start
          </button>
          <button onClick={stopInstrument} className="music-start">
            <FaStop color="#fff" size={20} /> Stop
          </button>
          </div>
          <button style={{ width: "100%", marginTop: "30px" }} onClick={createRecord} className="music-start">
            Save Masterpiece
          </button>
          </div>
          <div className="card">
          <RecorderControls recorderState={recorderState} handlers={handlers} />
        <RecordingsList audio={audio} />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
