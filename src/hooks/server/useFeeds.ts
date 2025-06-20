import { useInfiniteQuery } from '@tanstack/react-query';
import {IMainFeedsList} from '@constant/interfaces.ts';
import Api from '@constant/Api.ts';

export function useFeeds() {
  return useInfiniteQuery<IMainFeedsList>({
    queryKey: ['feeds'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await Api.fetch(`/api/feeds?page=${pageParam}`);
      if (!(response?.ok)) {
        throw new Error('Network response was not ok');
      }
      return await response.json() as IMainFeedsList;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.hasNextSlice ? allPage.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });
}