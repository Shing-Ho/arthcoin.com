import { useCallback, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import { BigNumber } from 'ethers';
import ERC20 from '../basis-cash/ERC20';
import config from '../config';
import useBasisCash from './useBasisCash';


const useAllowance = (token: ERC20, spender: string, pendingApproval?: boolean) => {
  const [allowance, setAllowance] = useState<BigNumber>(null);
  const { account } = useWallet();
  const basisCash = useBasisCash();


  const fetchAllowance = useCallback(async () => {
    console.log(`Fetching Allowance of ${account} ${token.symbol} for ${spender}`);
    const allowance = await token.allowance(account, spender);
    console.log(`Allowance: ${allowance.toString()} ${token.symbol} for ${spender}`);
    setAllowance(allowance);
  }, [account, spender, token]);

  useEffect(() => {
    if (basisCash.isUnlocked) {
      fetchAllowance().catch((err) => console.log(`Failed to fetch allowance: ${err.stack}`));

      let refreshInterval = setInterval(fetchAllowance, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [basisCash.isUnlocked, fetchAllowance, token]);

  useEffect(() => {
    if (account && spender && token) {
      fetchAllowance().catch((err) => console.log(`Failed to fetch allowance: ${err.stack}`));
    }
  }, [account, spender, token, pendingApproval, fetchAllowance]);

  return allowance;
};

export default useAllowance;
