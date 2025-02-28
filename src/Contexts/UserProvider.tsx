import { useState, ReactNode, useEffect } from "react";
import { localStorages } from '@/utils/constants';
import { UserContext } from './UserContext';

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");

  const saveUserDataToLocalStorage = (data: Record<string, unknown>) => {
    const existingData = localStorage.getItem(localStorages.USER_DATA) || "{}";
    const updatedData = {
      ...JSON.parse(existingData),
      ...data,
    }

    localStorage.setItem(localStorages.USER_DATA, JSON.stringify(updatedData));
  }

  const handleSetUsername = (str: string) => {

    setUsername(str);
    saveUserDataToLocalStorage({username: str});
  }

  const handleSetCompanyName = (str: string) => {

    setCompanyName(str);
    saveUserDataToLocalStorage({companyName: str});
  }

  useEffect(() => {
    const data = localStorage.getItem(localStorages.USER_DATA);
    if (data) {
      const parsedData = JSON.parse(data);
      setUsername(parsedData.username);
      setCompanyName(parsedData.companyName);
    }
  }, []);

  return (
    <UserContext.Provider value={{ username, companyName, handleSetUsername, handleSetCompanyName }}>
      {children}
    </UserContext.Provider>
  );
};