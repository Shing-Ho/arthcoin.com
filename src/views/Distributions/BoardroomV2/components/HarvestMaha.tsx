import React from 'react';
import styled from 'styled-components';

import Button from '../../../../components/Button';
import TokenSymbol from '../../../../components/TokenSymbol';
import CardContent from '../../../../components/CardContent';
import CardIcon from '../../../../components/CardIcon';
import useHarvestFromBoardroom from '../../../../hooks/useHarvestFromBoardroom';
import useEarningsOnBoardroomV2 from '../../../../hooks/useEarningsOnBoardroomV2';
import { getDisplayBalance } from '../../../../utils/formatBalance';
import useBasisCash from '../../../../hooks/useBasisCash';
import { BoardroomsV2 } from '../../../../basis-cash/config';

const HarvestMaha = ({ boardroomId }: { boardroomId: BoardroomsV2 }) => {
  const basisCash = useBasisCash()
  const boardroom = basisCash.getBoardroom(boardroomId, 'v2')
  const { onReward } = useHarvestFromBoardroom(boardroom);
  const [earnings, claimable] = useEarningsOnBoardroomV2(boardroomId);

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyleLabel>MAHA Earned </StyleLabel>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol="MAHA" />
            </CardIcon>
            <StyledValue>{getDisplayBalance(earnings)}</StyledValue>
          </StyledCardHeader>
        </StyledCardContentInner>
        <p>
          Your rewards are vested across 8 hours. If you claim your rewards now you will be able to claim {getDisplayBalance(claimable)} MAHA
        </p>
        <StyledCardActions>
          <Button onClick={onReward} text={`Claim ${getDisplayBalance(claimable)} MAHA`} disabled={earnings.eq(0)} />
        </StyledCardActions>
      </CardContent>
    </Card>
  );
};
const StyledValue = styled.div`
  color: rgba(255, 255, 255, 0.88);
  font-size: 24px;
  margin-left: 20px;
  font-weight: bold;
`;
const StyleLabel = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
  align-self: start;
  line-height: 24px;
  color: #ffffff;
  opacity: 0.64;
`;
const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  flex-direction: row;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Card = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(21px);
  border-radius: 12px;
  display: flex;
  width: 100%;
  max-width: 500px;
  flex-direction: column;
`;
export default HarvestMaha;