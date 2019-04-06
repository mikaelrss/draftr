import React from 'react';
import { ReactComponent as ARI } from './ARI.svg';
import { ReactComponent as ATL } from './ATL.svg';
import { ReactComponent as BAL } from './BAL.svg';
import { ReactComponent as BUF } from './BUF.svg';
import { ReactComponent as CAR } from './CAR.svg';
import { ReactComponent as CHI } from './CHI.svg';
import { ReactComponent as CIN } from './CIN.svg';
import { ReactComponent as CLE } from './CLE.svg';
import { ReactComponent as DAL } from './DAL.svg';
import { ReactComponent as DEN } from './DEN.svg';
import { ReactComponent as DET } from './DET.svg';
import { ReactComponent as GB } from './GB.svg';
import { ReactComponent as HOU } from './HOU.svg';
import { ReactComponent as IND } from './IND.svg';
import { ReactComponent as JAC } from './JAC.svg';
import { ReactComponent as KC } from './KC.svg';
import { ReactComponent as LAC } from './LAC.svg';
import { ReactComponent as LAR } from './LAR.svg';
import { ReactComponent as MIA } from './MIA.svg';
import { ReactComponent as MIN } from './MIN.svg';
import { ReactComponent as NE } from './NE.svg';
import { ReactComponent as NO } from './NO.svg';
import { ReactComponent as NYG } from './NYG.svg';
import { ReactComponent as NYJ } from './NYJ.svg';
import { ReactComponent as OAK } from './OAK.svg';
import { ReactComponent as PHI } from './PHI.svg';
import { ReactComponent as PIT } from './PIT.svg';
import { ReactComponent as SEA } from './SEA.svg';
import { ReactComponent as SF } from './SF.svg';
import { ReactComponent as TB } from './TB.svg';
import { ReactComponent as TEN } from './TEN.svg';
import { ReactComponent as WAS } from './WAS.svg';

export type INFLTeam =
  | 'ARI'
  | 'ATL'
  | 'BAL'
  | 'BUF'
  | 'CAR'
  | 'CHI'
  | 'CIN'
  | 'CLE'
  | 'DAL'
  | 'DEN'
  | 'DET'
  | 'GB'
  | 'HOU'
  | 'IND'
  | 'JAC'
  | 'KC'
  | 'LAC'
  | 'LAR'
  | 'MIA'
  | 'MIN'
  | 'NE'
  | 'NO'
  | 'NYG'
  | 'NYJ'
  | 'OAK'
  | 'PHI'
  | 'PIT'
  | 'SEA'
  | 'SF'
  | 'TB'
  | 'TEN'
  | 'WAS';

interface IProps {
  team: INFLTeam;
  className?: string;
}

const LOGO_SIZE = 30;

const TeamLogo = ({ team, className }: IProps) => {
  const style = {
    height: `${LOGO_SIZE}px`,
    width: `${LOGO_SIZE}px`,
  };
  const props = {
    className,
    style,
  };
  switch (team) {
    case 'ARI':
      return <ARI {...props} />;
    case 'ATL':
      return <ATL {...props} />;
    case 'BAL':
      return <BAL {...props} />;
    case 'BUF':
      return <BUF {...props} />;
    case 'CAR':
      return <CAR {...props} />;
    case 'CHI':
      return <CHI {...props} />;
    case 'CIN':
      return <CIN {...props} />;
    case 'CLE':
      return <CLE {...props} />;
    case 'DAL':
      return <DAL {...props} />;
    case 'DEN':
      return <DEN {...props} />;
    case 'DET':
      return <DET {...props} />;
    case 'GB':
      return <GB {...props} />;
    case 'HOU':
      return <HOU {...props} />;
    case 'IND':
      return <IND {...props} />;
    case 'JAC':
      return <JAC {...props} />;
    case 'KC':
      return <KC {...props} />;
    case 'LAC':
      return <LAC {...props} />;
    case 'LAR':
      return <LAR {...props} />;
    case 'MIA':
      return <MIA {...props} />;
    case 'MIN':
      return <MIN {...props} />;
    case 'NE':
      return <NE {...props} />;
    case 'NO':
      return <NO {...props} />;
    case 'NYG':
      return <NYG {...props} />;
    case 'NYJ':
      return <NYJ {...props} />;
    case 'OAK':
      return <OAK {...props} />;
    case 'PHI':
      return <PHI {...props} />;
    case 'PIT':
      return <PIT {...props} />;
    case 'SEA':
      return <SEA {...props} />;
    case 'SF':
      return <SF {...props} />;
    case 'TB':
      return <TB {...props} />;
    case 'TEN':
      return <TEN {...props} />;
    case 'WAS':
      return <WAS {...props} />;
    default:
      console.error('No logo found for team', team);
      return <div>No team</div>;
  }
};

export default TeamLogo;
