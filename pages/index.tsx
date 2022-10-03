import { getDefaultProvider } from 'ethers';
import fsPromises from 'fs/promises';
import type { NextPage } from 'next';
import Head from 'next/head';
import path from 'path';
import { useState } from 'react';
import Button from 'src/components/Button';
import ConnectButton from 'src/components/ConnectButton';
import ExplanationModal from 'src/components/ExplanationModal';
import Footer from 'src/components/Footer';
import InfoIcon from 'src/components/InfoIcon';
import Migrator from 'src/components/Migrator';
import { createClient, useAccount, useDisconnect, WagmiConfig } from 'wagmi';

type Props = {
  name: string;
  title: string;
  description: string;
  learnText: string;
  migrationProcessDescription: string[];
  backgroundImage: string;
  styles: {
    textColor?: string;
    textHighlighStyle?: string;
  };
  socials: {
    discordUrl?: string;
    etherscanUrl?: string;
    twitterUrl?: string;
  };
};

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

const Home: NextPage<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundSize: 'cover',
      }}
    >
      <Head>
        <title>{props.name}</title>
        <meta name="description" content="Migration dapp for Seerlight NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WagmiConfig client={client}>
        <main className="pt-20">
          <div className="max-w-screen-lg mx-auto py-10 space-y-8">
            <div className="flex items-center">
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
            <p className="text-xl">
              <span
                style={{
                  color: props.styles.textColor,
                  backgroundColor: props.styles.textHighlighStyle,
                }}
              >
                {props.description}
              </span>
            </p>
            <p className="text-xl flex items-center">
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

            <Migrator />
          </div>
        </main>
      </WagmiConfig>

      <Footer {...props.socials} />
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'config.json');
  const jsonData = await fsPromises.readFile(filePath);
  const stringData = jsonData.toString();
  const objectData = JSON.parse(stringData);

  return {
    props: objectData,
  };
}
