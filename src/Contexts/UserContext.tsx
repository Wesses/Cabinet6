import { createContext } from 'react';

interface UserContextType {
  username: string;
  companyName: string;
  handleSetUsername: (name: string) => void;
  handleSetCompanyName: (name: string) => void;
}

const useContextProp: UserContextType = {
  username: "",
  companyName: "",
  handleSetUsername: () => {},
  handleSetCompanyName: () => {},
};

export const UserContext = createContext<UserContextType>(useContextProp);