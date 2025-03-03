import { NavigateFunction, Location } from 'react-router';

interface HistoryT {
  navigate: NavigateFunction | null,
  location: Location | null,
}

export const history: HistoryT = {
  navigate: null,
  location: null
};