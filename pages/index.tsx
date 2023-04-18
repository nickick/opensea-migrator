/* eslint-disable @next/next/no-img-element */
import fsPromises from 'fs/promises';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/future/image';
import path from 'path';
import { useState } from 'react';
import Client from 'src/components/Client';
import ConnectButton from 'src/components/ConnectButton';
import ExplanationModal from 'src/components/ExplanationModal';
import InfoIcon from 'src/components/InfoIcon';
import Migrator from 'src/components/Migrator';
import { StepText } from 'src/utils/types';
import Moon from 'src/components/Moon';
import Clouds from 'src/components/Clouds.tsx';
import { ModeSwitch } from 'src/components/ModeSwitch';

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
      {/* Grid using CSS */}
      <div
        className="w-full h-full absolute z-0 top-0"
        style={{
          background: `repeating-linear-gradient(
            0deg, rgba(255,255,255,0), rgba(255,255,255,0) 68px, rgba(255, 255, 255, 0.3) 70px, rgba(255,255,255, 0.4) 5px
        )`,
          backgroundBlendMode: 'hard-light',
        }}
      />
      <div
        className="w-full h-full absolute z-0 top-0"
        style={{
          background: `repeating-linear-gradient(
            90deg, rgba(255,255,255,0), rgba(255,255,255,0) 68px, rgba(255, 255, 255, 0.3) 70px, rgba(255,255,255, 0) 5px
        )`,
          backgroundBlendMode: 'hard-light',
        }}
      />
      {/* end grid */}

      {/* darkening scrim for overall page */}
      <div className="bg-black opacity-20 h-full w-screen absolute z-[2] top-0 left-0 mix-blend-overlay" />

      <Head>
        <title>{props.name}</title>
        <meta name="description" content="Migration dapp for Seerlight NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Client>
        <main className="z-10 relative">
          {/* scrim for main window, with castle */}

          <div
            className="w-full h-full absolute inset-0 z-0 rounded-xl mix-blend-multiply"
            style={{
              background:
                'linear-gradient(180deg, rgba(0, 108, 201, 0.6) 0%, rgba(28, 142, 212, 0.6) 25%, rgba(151, 147, 197, 0.6) 51.04%, rgba(254, 149, 169, 0.6) 75.52%, rgba(251, 140, 136, 0.6) 100%)',
            }}
          />
          <div
            className="max-w-screen-2xl mx-auto space-y-8 border border-borderColor px-40 pb-12 pt-12 rounded-xl relative overflow-hidden"
            style={{
              boxShadow: '120px 120px 200px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Moon className="absolute z-10 right-10 top-10" />
            <Clouds className="absolute z-10 right-20 top-48" />
            <Image
              src="/castle.png"
              alt="Seerlight Japanese castle"
              className="absolute z-10 left-0 bottom-0"
              height={605}
              width={484}
              priority
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
              <ModeSwitch />
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
