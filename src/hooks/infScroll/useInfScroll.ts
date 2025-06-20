import {useEffect, useMemo, useRef} from 'react';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {InfScrollAdapter} from '@constant/infScroll/InfScrollAdapter.ts';
import {IScrollTriggerReturn} from '@constant/infScroll/useScrollTrigger.ts';
import {InfList, SearchParams} from '@constant/interfaces.ts';
import InfScroll from '@constant/infScroll/InfScroll.ts';
import Api from '@constant/Api.ts';

const InitialData = {
  list: [],
  size: 0,
  hasNextSlice: true,
}

export const DEFAULT_PAGE_SIZE = 20; // 한 페이지에 보여줄 데이터 개수

// page 관리, 데이터 관리 등등을 수행해주면 될 것 같아요, 마치 react-query 같은 느낌으로요
// Todo: infinite scroll 파일 통합하기 (useInfScroll4Widget.ts, useRevInfScroll4Widget.ts)
// useInfScroll4Widget.ts -> 스크롤 하는 컴포넌트가 window가 아닌 경우
// Todo: DOM 최적화 하기 - react window 사용하기
function useInfScroll<U, T>(
  adapter: InfScrollAdapter<U, T>,
  trigger: IScrollTriggerReturn,
) {
  const queryClient = useQueryClient();
  const searchParams = useRef<SearchParams>(adapter.DefaultParams);

  const query = useInfiniteQuery<InfList<T>>({
    queryKey: [adapter.ApiUrl, searchParams.current],
    queryFn: async ({ pageParam = 0 }) => {
      const params = {...searchParams.current, page: pageParam};

      // Todo: 실패 시 DummyData 사용하기 - Dev 환경에서만
      const data = adapter.transform(
        await Api.fetch2Json(adapter.ApiUrl + '?' + InfScroll.getParamString(params))
      );

      const list = data.list.filter(v => v !== null && v !== undefined);
      const size = list.length;
      const hasNextSlice = data.hasNextSlice;

      return {
        list,
        size,
        hasNextSlice,
      };
    },
    // throwOnError: (error) => {
    //   console.error('Error fetching data:', error);
    //   if (process.env.NODE_ENV === 'development') {
    //     // 개발 환경에서만 더미 데이터를 사용하도록 설정
    //     return {list: adapter.DummyData, size: adapter.DummyData.length, hasNextSlice: true};
    //   }
    // },
    initialPageParam: 0,
    initialData: {
      pages: [InitialData],
      pageParams: [0],
    },
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.hasNextSlice ? allPage.length : undefined;
    },
    refetchOnWindowFocus: false,
  });

  const list = useMemo(() => query.data?.pages.flatMap(({list}) => list), [query.data])
  const isEmpty = useMemo(() => !list?.length || !list.some((v) => v), [list]);
  const isEnded = !query.hasNextPage;

  useEffect(() => {
    if (!query.isFetching && !isEnded) {
      query.fetchNextPage().then()
    }
  }, [trigger.triggered]);


  const setSearchParams = (params: SearchParams) => {
    searchParams.current = {...adapter.DefaultParams, ...params};
  }

  // 데이터 변경
  function changeData(index: number, newData: T) {
    const {page, idx} = findPageIndex(query.data?.pages || [], index);

    if (idx < 0) return;

    queryClient.setQueryData([adapter.ApiUrl, searchParams.current], (oldData: InfList<T> | undefined) => {
      if (!oldData) return;

      const newPages = [...query.data?.pages || []];
      const pageData = newPages[page] || {list: [], size: 0, hasNextSlice: true};

      if (idx >= 0 && idx < pageData.list.length) {
        pageData.list[idx] = newData;
      }

      newPages[page] = pageData;

      return {
        ...oldData,
        pages: newPages,
        pageParams: query.data?.pageParams || [],
      };
    });
  }

  // 데이터 제거
  function hideData(index: number) {
    const {page, idx} = findPageIndex(query.data?.pages || [], index);

    if (idx < 0) return;

    queryClient.setQueryData([adapter.ApiUrl, searchParams.current], (oldData: InfList<T> | undefined) => {
      if (!oldData) return;

      const newPages = [...query.data?.pages || []];
      const pageData = newPages[page] || {list: [], size: 0, hasNextSlice: true};
      const list = pageData.list.filter((_, i) => i !== idx);

      pageData.list = list;
      pageData.size = list.length;

      const pages = newPages.map((p, i) => i === page ? pageData : p);

      return {
        ...oldData,
        pages,
        pageParams: query.data?.pageParams || [],
      };
    });
  }

  function setReqParams(params: SearchParams) {
    setSearchParams(params);
    query.fetchNextPage().then();
  }

  return {...query, data: {list:list}, loading:query.isLoading, isEnded, isEmpty, setReqParams, changeData, hideData};
}

// InfList 배열에서 특정 인덱스에 해당하는 페이지와 인덱스를 찾습니다.
function findPageIndex<T>(data: InfList<T>[], index: number) {
  if (!data || index < 0)
    return {page: 0, idx: -1};

  const {page, idx} = data.reduce((prev, current) => {
    const startIdx = prev._idx;
    const endIdx = startIdx + current.size;
    const next_page = prev._page + 1;
    const next_idx = endIdx;

    if (startIdx <= index && index < endIdx) {
      return {page: prev._page, idx: index - startIdx, _page: next_page, _idx: next_idx};
    }

    if (prev.idx != -1)
      return prev;

    return {page: prev.page + 1, idx: -1, _page: next_page, _idx: next_idx};
  }, {page: 0, idx: -1, _page: 0, _idx: 0});

  return {page, idx};
}

export default useInfScroll;