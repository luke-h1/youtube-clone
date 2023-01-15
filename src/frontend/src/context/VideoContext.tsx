import videoQueries from '@common/queries/videoQueries';
import { Video } from '@common/types/video';
import { Loader } from '@mantine/core';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useMemo } from 'react';

interface State {
  videos?: Video[];
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<Video[], unknown>>;
}

const VideoContext = createContext<State | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const VideoContextProvider = ({ children }: Props) => {
  const { data, isLoading, refetch } = useQuery({
    ...videoQueries.getVideos(),
  });

  const contextState: State = useMemo(() => {
    return {
      videos: data,
      refetch,
    };
  }, [data, refetch]);

  return (
    <VideoContext.Provider value={contextState}>
      {isLoading ? <Loader /> : children}
    </VideoContext.Provider>
  );
};
export default VideoContextProvider;

export const useVideos = () => {
  const context = useContext(VideoContext);

  if (!context) {
    throw new Error(
      'useVideos must be used within a VideoContextProvider further up the component tree',
    );
  }

  return context;
};
