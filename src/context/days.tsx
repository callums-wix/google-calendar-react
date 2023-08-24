import { createContext, useContext, useEffect, useState } from "react";
import { Days } from "../types";
import { Store } from "../services/db";
import { DB } from "../utils/consts";

const db = new Store(DB.URL);
const DaysContext = createContext<Days>([]);
interface DaysProviderProps {
  children: React.ReactNode;
}
export function DaysProvider({ children }: DaysProviderProps) {
  const [days, setDays] = useState<Days>([]);

  useEffect(() => {
    async function fetchDays() {
      const data = await db.get<Days>("days");
      setDays(data);
    }
    fetchDays();
  }, []);

  return <DaysContext.Provider value={days}>{children}</DaysContext.Provider>;
}

export const useDays = () => {
  return useContext(DaysContext);
};
