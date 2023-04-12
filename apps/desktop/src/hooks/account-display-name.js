import { utils as ethersUtils } from "ethers";
import { useEnsName } from "wagmi";
import { useUserWithWalletAddress } from "@shades/common/app";
import { ethereum as ethereumUtils } from "@shades/common/utils";

const { truncateAddress } = ethereumUtils;

const useAccountDisplayName = (
  walletAddress,
  { customDisplayName = true } = {}
) => {
  const user = useUserWithWalletAddress(walletAddress);

  const { data: ensName } = useEnsName({
    address: walletAddress,
    enabled: user == null && walletAddress != null && customDisplayName,
  });

  if (!customDisplayName)
    return ensName ?? truncateAddress(ethereumUtils.getAddress(walletAddress));

  const displayName =
    user?.displayName ??
    ensName ??
    (walletAddress == null
      ? null
      : truncateAddress(ethersUtils.getAddress(walletAddress)));

  return displayName;
};

export default useAccountDisplayName;
