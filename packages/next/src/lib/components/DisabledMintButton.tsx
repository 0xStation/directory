import { Button } from "./ui/Button";
import TextLink from "./TextLink";

const DisabledMintButton = ({
  error,
}: {
  error?: { message: string; component?: () => JSX.Element };
}) => {
  const Component = error?.component;
  return (
    <div className="flex flex-col w-full gap-3">
      <Button size="lg" fullWidth disabled onClick={() => {}}>
        Claim
      </Button>
      {error ? (
        !!Component ? (
          <Component />
        ) : (
          <span className="text-sm">{error.message}</span>
        )
      ) : (
        <span className="text-sm">
          Error encountered. Try refreshing the page or contact.
        </span>
      )}
    </div>
  );
};

export default DisabledMintButton;
