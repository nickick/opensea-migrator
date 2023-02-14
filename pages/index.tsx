/* eslint-disable @next/next/no-img-element */
import fsPromises from 'fs/promises';
import type { NextPage } from 'next';
import Head from 'next/head';
import path from 'path';
import { useState } from 'react';
import Client from 'src/components/Client';
import ConnectButton from 'src/components/ConnectButton';
import ExplanationModal from 'src/components/ExplanationModal';
import Footer from 'src/components/Footer';
import InfoIcon from 'src/components/InfoIcon';
import Migrator from 'src/components/Migrator';
import { StepText } from 'src/utils/types';

type ConfigProps = {
  name: string;
  title: string;
  description: string;
  learnText: string;
  migrationProcessDescription: string[];
  styles: {
    textColor?: string;
    textHighlighStyle?: string;
    background?: string;
  };
  text: {
    steps: StepText[];
  };
  socials: {
    discordUrl?: string;
    etherscanUrl?: string;
    twitterUrl?: string;
  };
};

const Home: NextPage<ConfigProps> = (props: ConfigProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center"
      style={{
        background: props.styles.background,
      }}
    >
      <div
        className="w-full h-screen absolute z-0"
        style={{
          background: `repeating-linear-gradient(
            0deg, rgba(255,255,255,0), rgba(255,255,255,0) 68px, #34B9E5 70px, rgba(255,255,255, 0.4) 5px
        )`,
          backgroundBlendMode: 'hard-light',
        }}
      />
      <div
        className="w-full h-screen absolute z-0"
        style={{
          background: `repeating-linear-gradient(
            90deg, rgba(255,255,255,0), rgba(255,255,255,0) 68px, #34B9E5 70px, rgba(255,255,255, 0) 5px
        )`,
          backgroundBlendMode: 'hard-light',
        }}
      />
      <div className="bg-black opacity-30 h-screen w-screen absolute z-[2] top-0 left-0 mix-blend-overlay" />
      <Head>
        <title>{props.name}</title>
        <meta name="description" content="Migration dapp for Seerlight NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Client>
        <main className="z-10 relative">
          <div
            className="max-w-screen-xl mx-auto py-10 space-y-8 border border-[#34B9E5] p-20 rounded-xl relative"
            style={{}}
          >
            <div
              className="w-full h-full absolute inset-0 z-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0, 108, 201, 0.6) 0%, rgba(28, 142, 212, 0.6) 25%, rgba(151, 147, 197, 0.6) 51.04%, rgba(254, 149, 169, 0.6) 75.52%, rgba(251, 140, 136, 0.6) 100%)',
                mixBlendMode: 'darken',
              }}
            />
            <img
              src="/castle.png"
              alt="Seerlight Japanese castle"
              className="absolute z-10 left-0 bottom-0"
            />
            <div className="flex items-center relative z-10">
              <h1
                className={`${props.styles.textColor} w-full text-5xl font-bold`}
              >
                <span
                  style={{
                    color: props.styles.textColor,
                    backgroundColor: props.styles.textHighlighStyle,
                  }}
                >
                  {props.title}
                </span>
              </h1>
              <ConnectButton />
            </div>
            <p className="text-xl z-10 relative">
              <span
                style={{
                  color: props.styles.textColor,
                  backgroundColor: props.styles.textHighlighStyle,
                }}
              >
                {props.description}
              </span>
            </p>
            <p className="text-xl flex items-center z-10 relative">
              <span
                style={{
                  color: props.styles.textColor,
                  backgroundColor: props.styles.textHighlighStyle,
                }}
              >
                Learn more about the migration process here:
              </span>
              <span
                className="ml-2 cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <InfoIcon color={props.styles.textColor} />
              </span>
              <ExplanationModal
                open={open}
                setOpen={setOpen}
                text={props.migrationProcessDescription}
              />
            </p>

            <Migrator stepText={props.text.steps} />
          </div>
        </main>
      </Client>

      {/* <Footer {...props.socials} /> */}
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'config.json');
  const jsonData = await fsPromises.readFile(filePath);
  const stringData = jsonData.toString();
  const objectData = JSON.parse(stringData);

  return {
    props: objectData,
  };
}
