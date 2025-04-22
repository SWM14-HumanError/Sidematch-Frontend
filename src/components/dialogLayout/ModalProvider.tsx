import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {MODAL_ROUTE, ModalName, ModalRoute} from '@constant/Routes.tsx';

export function useModalProvider() {
  const [searchParams] = useSearchParams();
  const [matchedRoute, setMatchedRoute] = useState<ModalRoute | null>(null);

  // Check if the current location matches any of the modal routes
  useEffect(() => {
    if (!searchParams.has('modal')) {
      setMatchedRoute(null);
      return;
    }

    const modalName = searchParams.get('modal');
    const foundRoute = MODAL_ROUTE.find(({modal}) => modal === modalName);

    setMatchedRoute(foundRoute || null);
  }, [searchParams]);


  return { modal: matchedRoute };
}

export function useNavigateToModal() {
  const [, setSearchParams] = useSearchParams();

  return (modalName: string | ModalName, params: Record<string, string|number>) => {
    setSearchParams(prev => ({...prev, ...params, modal: modalName as string}));
  };
}

export function useCloseModal(stringParams: string[] = []) {
  const [searchParams, setSearchParams] = useSearchParams();

  return () => {
    stringParams.push("modal");
    for (const param of stringParams) {
      searchParams.delete(param);
    }

    setSearchParams(searchParams);
  };
}