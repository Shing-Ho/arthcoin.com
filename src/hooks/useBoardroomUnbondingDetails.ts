import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';
import moment from 'moment';
import { BoardroomInfo } from '../basis-cash';


const useBoardroomUnbondingDetails = (boardroom: BoardroomInfo, stakedBalance: BigNumber): [Date, Date, BigNumber] => {
  const [startDate, setStartDate] = useState(moment().utc().startOf('day').toDate());
  const [endDate, setEndDate] = useState(moment().utc().startOf('day').toDate());
  const [amount, setAmount] = useState(BigNumber.from(0));

  const basisCash = useBasisCash();

  const fetchDepositTime = useCallback(async () => {
    const b = await basisCash.currentBoardroom(boardroom.kind);
    const details = await b._stakingDetails(basisCash.myAccount)

    const from = new Date((details.lastStakedOn || details.date).toNumber() * 1000)
    const to = new Date(from.getTime() + 86400 * 1000 * boardroom.lockInPeriodDays)

    console.log(details, from, to)
    setStartDate(from)
    setEndDate(to)
    setAmount(details.amount)
  }, [basisCash, boardroom.kind, boardroom.lockInPeriodDays]);

  useEffect(() => {
    if (basisCash.isUnlocked && stakedBalance.gt(0)) {
      fetchDepositTime().catch(err => console.error(err.stack));
    }
  }, [basisCash.isUnlocked, fetchDepositTime, stakedBalance]);

  return [startDate, endDate, amount];
};

export default useBoardroomUnbondingDetails;