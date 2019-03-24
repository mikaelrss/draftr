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
}

const LOGO_SIZE = 30;

const TeamLogo = ({ team }: IProps) => {
  const style = {
    height: `${LOGO_SIZE}px`,
    width: `${LOGO_SIZE}px`,
  };
  switch (team) {
    case 'ARI':
      return <ARI style={style} />;
    case 'ATL':
      return <ATL style={style} />;
    case 'BAL':
      return <BAL style={style} />;
    case 'BUF':
      return <BUF style={style} />;
    case 'CAR':
      return <CAR style={style} />;
    case 'CHI':
      return <CHI style={style} />;
    case 'CIN':
      return <CIN style={style} />;
    case 'CLE':
      return <CLE style={style} />;
    case 'DAL':
      return <DAL style={style} />;
    case 'DEN':
      return <DEN style={style} />;
    case 'DET':
      return <DET style={style} />;
    case 'GB':
      return <GB style={style} />;
    case 'HOU':
      return <HOU style={style} />;
    case 'IND':
      return <IND style={style} />;
    case 'JAC':
      return <JAC style={style} />;
    case 'KC':
      return <KC style={style} />;
    case 'LAC':
      return <LAC style={style} />;
    case 'LAR':
      return <LAR style={style} />;
    case 'MIA':
      return <MIA style={style} />;
    case 'MIN':
      return <MIN style={style} />;
    case 'NE':
      return <NE style={style} />;
    case 'NO':
      return <NO style={style} />;
    case 'NYG':
      return <NYG style={style} />;
    case 'NYJ':
      return <NYJ style={style} />;
    case 'OAK':
      return <OAK style={style} />;
    case 'PHI':
      return <PHI style={style} />;
    case 'PIT':
      return <PIT style={style} />;
    case 'SEA':
      return <SEA style={style} />;
    case 'SF':
      return <SF style={style} />;
    case 'TB':
      return <TB style={style} />;
    case 'TEN':
      return <TEN style={style} />;
    case 'WAS':
      return <WAS style={style} />;
    default:
      console.log(team);
      return <div>No team</div>;
  }
};

export default TeamLogo;
