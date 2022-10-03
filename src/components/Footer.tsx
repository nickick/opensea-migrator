import DiscordIcon from "src/components/DiscordIcon";
import EtherscanIcon from "src/components/EtherscanIcon";
import TwitterIcon from "src/components/TwitterIcon";

type FooterProps = {
  discordUrl?: string;
  etherscanUrl?: string;
  twitterUrl?: string;
};

export default function Footer({
  discordUrl,
  etherscanUrl,
  twitterUrl,
}: FooterProps) {
  return (
    <footer>
      <div className="flex justify-end max-w-screen-lg mx-auto">
        {discordUrl && (
          <a
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-10"
          >
            <DiscordIcon />
          </a>
        )}
        {etherscanUrl && (
          <a
            href={etherscanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-4 ml-8"
          >
            <EtherscanIcon />
          </a>
        )}
        {twitterUrl && (
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-4 ml-8"
          >
            <TwitterIcon />
          </a>
        )}
      </div>
    </footer>
  );
}
