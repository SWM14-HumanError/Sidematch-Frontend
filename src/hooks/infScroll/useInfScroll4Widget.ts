import React, { useEffect, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from './useInfScroll.ts';
import InfScroll from '@constant/infScroll/InfScroll.ts';
import Api from '@constant/Api.ts';

type ArrayTagTypes = 'userCardResponses' | 'teamSearchResponseList' | 'feedSearchResponses' | 'alertResponseList';

interface InfData<T> {
  size: number;
  hasNextSlice: boolean;
  userCardResponses?: T[];
  teamSearchResponseList?: T[];
  feedSearchResponses?: T[];
  alertResponseList?: T[];
}

const InitialData = {
  size: 0,
  hasNextSlice: true,
};

function useInfScroll4Widget<T>(
  apiUrl: string,
  arrayTag: ArrayTagTypes,
  infScrollLayout: React.RefObject<HTMLDivElement>,
  dummyData: InfData<T>,
  defaultParams: object | undefined
) {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({ page: 0, ...defaultParams });
  const [triggered, setTriggered] = useState(false);
  const [data, setData] = useState<InfData<T>>({ ...InitialData, [arrayTag]: [] });

  useEffect(() => {
    if (!infScrollLayout?.current) return;

    infScrollLayout.current?.addEventListener('scroll', handleScroll);
    return () => {
      infScrollLayout.current?.removeEventListener('scroll', handleScroll);
    };
  }, [infScrollLayout?.current]);

  useEffect(() => {
    handleScroll();
  }, [infScrollLayout?.current?.clientHeight]);

  useEffect(() => {
    if (triggered) loadMoreData();
    else handleScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggered]);

  const handleScroll = () => {
    const container = infScrollLayout.current;
    if (!container) return;

    const parent = container.parentElement;
    const { scrollTop, clientHeight, scrollHeight } = container;
    const scrollThreshold = 32;

    if (
      data.hasNextSlice &&
      (scrollTop + clientHeight >= scrollHeight - scrollThreshold ||
        (parent && scrollHeight < parent.clientHeight + scrollThreshold))
    ) {
      if (!loading) setTriggered(true);
    }
  };

  async function loadMoreData() {
    if (loading) return;
    if (!data.hasNextSlice) {
      setTriggered(false);
      return;
    }

    setLoading(true);
    try {
      const newData: InfData<T> = await Api.fetch2Json(apiUrl + '?' + InfScroll.getParamString(searchParams));
      const startArrIndex = DEFAULT_PAGE_SIZE * searchParams.page;
      const ArrSize = startArrIndex + (newData.size ?? 0);

      setData((prevData) => ({
        ...prevData,
        [arrayTag]: InfScroll.getExpandArray(
          prevData[arrayTag as keyof InfData<T>] as T[] || [],
          newData[arrayTag as keyof InfData<T>] as T[] || [],
          startArrIndex,
          ArrSize
        ),
        size: ArrSize,
        hasNextSlice: newData.hasNextSlice,
      }));
    } catch (e) {
      console.error(e, data.hasNextSlice);

      setData((prevData) => ({
        ...prevData,
        [arrayTag]: getValidData(prevData, arrayTag, dummyData),
        size: prevData.size + 1,
        hasNextSlice: false,
      }));
    } finally {
      setLoading(false);
      setSearchParams((prevParams) => ({ ...prevParams, page: prevParams.page + 1 }));
      setTriggered(false);
    }
  }

  function setReqParams(params: { [key: string]: unknown }) {
    setLoading(false);
    setSearchParams({ ...params, page: 0 });
    setTriggered(true);
    setData({ ...InitialData, [arrayTag]: [] });
  }

  function changeData(index: number, func: (arg0: T) => T) {
    setData((prev) => ({
      ...prev,
      [arrayTag]: (prev[arrayTag as keyof InfData<T>] as T[]).map((v, i) => (i === index ? func(v) : v)),
    }));
  }

  function hideData(index: number) {
    setData((prev) => ({
      ...prev,
      [arrayTag]: (prev[arrayTag as keyof InfData<T>] as T[]).map((v, i) => (i === index ? null : v)),
    }));
  }

  function isEmpty() {
    const arr = data[arrayTag as keyof InfData<T>] as (T | null)[] | undefined;
    return data.size === 0 || !arr || arr.length === 0 || arr.every((v) => !v);
  }

  return { data, loading, setReqParams, changeData, hideData, isEmpty };
}

function getValidData<T>(prev: InfData<T>, arrayTag: ArrayTagTypes, dummies: InfData<T>): T[] {
  const isDataFilled = prev[arrayTag]?.length;

  if (isDataFilled)
    return prev[arrayTag as keyof InfData<T>] as T[] || [];

  return Api.isLocalhost() ? dummies[arrayTag as keyof InfData<T>] as T[] || [] : [];
}

export default useInfScroll4Widget;