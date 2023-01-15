import { User } from '@common/types/user';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from '@tanstack/react-query';
import { createContext, ReactNode } from 'react';

interface State {
  user?: User;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<User, unknown>>;
}

const UserContext = createContext<State | undefined>(undefined);

interface Props {
  children: ReactNode;
}

// const UserContextProvider = ({ children }: Props) => {
//   const {} = useQuery({});
