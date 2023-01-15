import userQueries from '@common/queries/userQueries';
import { User } from '@common/types/user';
import { Loader } from '@mantine/core';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useMemo } from 'react';

interface State {
  user?: User | null;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<User | null, unknown>>;
}

const UserContext = createContext<State | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const UserContextProvider = ({ children }: Props) => {
  const { data, isLoading, refetch } = useQuery({
    ...userQueries.getCurrentUser(),
  });

  const contextState: State = useMemo(() => {
    return {
      user: data,
      refetch,
    };
  }, [data, refetch]);

  return (
    <UserContext.Provider value={contextState}>
      {isLoading ? <Loader /> : children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      'useUser must be used within a UserContextProvider further up the component tree',
    );
  }
};
