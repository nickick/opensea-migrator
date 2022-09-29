import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import fsPromises from 'fs/promises';
import path from 'path'
import styles from '../styles/Home.module.css'
import InfoIcon from '../src/components/InfoIcon';

type Props = {
  name: string
  title: string
  description: string
  learnText: string
  migrationProcessDescription: string[]
  backgroundImage: string
  styles: {
    textColor?: string
    textHighlighStyle?: string
  }
  socials: {
    discordUrl?: string
    etherscanUrl?: string
    twitterUrl?: string
  }
}

const Home: NextPage<Props> = (props: Props) => {
  console.log(props.styles.textHighlighStyle)
  return (
    <div
      className='min-h-screen'
      style={{
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundSize: 'cover'
      }}
    >
      <Head>
        <title>{props.name}</title>
        <meta name="description" content="Migration dapp for Seerlight NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className='pt-20'
      >
        <div className='max-w-screen-lg mx-auto py-10 space-y-8'>
          <h1 className={`${props.styles.textColor} w-full text-5xl font-bold`}>
            <span style={{
              color: props.styles.textColor,
              backgroundColor: props.styles.textHighlighStyle,
            }}>{props.title}</span>
          </h1>
          <p className='text-xl'>
            <span style={{
              color: props.styles.textColor,
              backgroundColor: props.styles.textHighlighStyle,
            }}>
              {props.description}
            </span>
          </p>
          <p className='text-xl flex items-center'>
            <span style={{
              color: props.styles.textColor,
              backgroundColor: props.styles.textHighlighStyle,
            }}>
              Learn more about the migration process here:
            </span>
            <span className='ml-2 cursor-pointer'>
              <InfoIcon color={props.styles.textColor} />
            </span>
          </p>
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

          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'config.json');
  const jsonData = await fsPromises.readFile(filePath);
  const stringData = jsonData.toString()
  const objectData = JSON.parse(stringData);

  return {
    props: objectData
  }
}
