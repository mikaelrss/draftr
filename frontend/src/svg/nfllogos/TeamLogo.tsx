import React from 'react';
import { ReactComponent as ARIComp } from './ARI.svg';
import { ReactComponent as ATLComp } from './ATL.svg';
import { ReactComponent as BALComp } from './BAL.svg';
import { ReactComponent as BUFComp } from './BUF.svg';
import { ReactComponent as CARComp } from './CAR.svg';
import { ReactComponent as CHIComp } from './CHI.svg';
import { ReactComponent as CINComp } from './CIN.svg';
import { ReactComponent as CLEComp } from './CLE.svg';
import { ReactComponent as DALComp } from './DAL.svg';
import { ReactComponent as DENComp } from './DEN.svg';
import { ReactComponent as DETComp } from './DET.svg';
import { ReactComponent as GBComp } from './GB.svg';
import { ReactComponent as HOUComp } from './HOU.svg';
import { ReactComponent as INDComp } from './IND.svg';
import { ReactComponent as JACComp } from './JAC.svg';
import { ReactComponent as KCComp } from './KC.svg';
import { ReactComponent as LACComp } from './LAC.svg';
import { ReactComponent as LARComp } from './LAR.svg';
import { ReactComponent as MIAComp } from './MIA.svg';
import { ReactComponent as MINComp } from './MIN.svg';
import { ReactComponent as NEComp } from './NE.svg';
import { ReactComponent as NOComp } from './NO.svg';
import { ReactComponent as NYGComp } from './NYG.svg';
import { ReactComponent as NYJComp } from './NYJ.svg';
import { ReactComponent as OAKComp } from './OAK.svg';
import { ReactComponent as PHIComp } from './PHI.svg';
import { ReactComponent as PITComp } from './PIT.svg';
import { ReactComponent as SEAComp } from './SEA.svg';
import { ReactComponent as SFComp } from './SF.svg';
import { ReactComponent as TBComp } from './TB.svg';
import { ReactComponent as TENComp } from './TEN.svg';
import { ReactComponent as WASComp } from './WAS.svg';
import { NFLTeam } from '../../types/graphqltypes';

const {
  ARI,
  ATL,
  BAL,
  BUF,
  CAR,
  CHI,
  CIN,
  CLE,
  DAL,
  DEN,
  DET,
  GB,
  HOU,
  IND,
  JAC,
  KC,
  LAC,
  LAR,
  MIA,
  MIN,
  NE,
  NO,
  NYG,
  NYJ,
  OAK,
  PHI,
  PIT,
  SEA,
  SF,
  TB,
  TEN,
  WAS,
} = NFLTeam;

interface IProps {
  team: NFLTeam;
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
    case ARI:
      return <ARIComp {...props} />;
    case ATL:
      return <ATLComp {...props} />;
    case BAL:
      return <BALComp {...props} />;
    case BUF:
      return <BUFComp {...props} />;
    case CAR:
      return <CARComp {...props} />;
    case CHI:
      return <CHIComp {...props} />;
    case CIN:
      return <CINComp {...props} />;
    case CLE:
      return <CLEComp {...props} />;
    case DAL:
      return <DALComp {...props} />;
    case DEN:
      return <DENComp {...props} />;
    case DET:
      return <DETComp {...props} />;
    case GB:
      return <GBComp {...props} />;
    case HOU:
      return <HOUComp {...props} />;
    case IND:
      return <INDComp {...props} />;
    case JAC:
      return <JACComp {...props} />;
    case KC:
      return <KCComp {...props} />;
    case LAC:
      return <LACComp {...props} />;
    case LAR:
      return <LARComp {...props} />;
    case MIA:
      return <MIAComp {...props} />;
    case MIN:
      return <MINComp {...props} />;
    case NE:
      return <NEComp {...props} />;
    case NO:
      return <NOComp {...props} />;
    case NYG:
      return <NYGComp {...props} />;
    case NYJ:
      return <NYJComp {...props} />;
    case OAK:
      return <OAKComp {...props} />;
    case PHI:
      return <PHIComp {...props} />;
    case PIT:
      return <PITComp {...props} />;
    case SEA:
      return <SEAComp {...props} />;
    case SF:
      return <SFComp {...props} />;
    case TB:
      return <TBComp {...props} />;
    case TEN:
      return <TENComp {...props} />;
    case WAS:
      return <WASComp {...props} />;
    default:
      return <div>No team</div>;
  }
};

export default TeamLogo;
