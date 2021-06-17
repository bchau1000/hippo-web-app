import { createContext } from 'react';

const UserContext = createContext(null);
const HistoryContext = createContext(null);
const NotificationContext = createContext(null);

export { UserContext, HistoryContext, NotificationContext };