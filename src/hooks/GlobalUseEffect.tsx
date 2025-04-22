import {useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useModalProvider} from "@/components/dialogLayout/ModalProvider.tsx";
import {findRoute, MAP_ROUTE} from '@/constant/Routes.tsx';
import authControl from '@/constant/authControl.ts';
import Alert from '@/constant/Alert.ts';
import useWindowSizeStore, {getWindowSize} from '@/stores/useWindowSizeStore.ts';

function GlobalUseEffect() {
  const location = useLocation();
  const navigate = useNavigate();

  const setWindowSize = useWindowSizeStore(state => state.setWindowSize);

  // WindowSize Store Update
  useEffect(() => {
    const handleResize = () => setWindowSize(getWindowSize());

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  // Only Change location pathname
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // On every route change
  useEffect(() => {
    authControl.signalLoginState();
    // authControl.showAdditionalInfoDialog();

    // 권한 확인
    const routeMapKey = findRoute(MAP_ROUTE, location.pathname);
    const auths = routeMapKey ? routeMapKey.auth : ['ALL'];

    if (!authControl.canAvailableRole(auths)) {
      if (!authControl.isTokenValid()) {
        Alert.show('로그인이 필요합니다');
        authControl.login();
      }
      else {
        Alert.show('접근 권한이 없습니다');
        navigate('/', {replace: true});
      }
    }
    else {
      // Change title
      document.title = '사이드 매치 | ' + (routeMapKey?.title ?? '사이드 프로젝트 매칭 플랫폼');
    }
  }, [location]);


  // Setting Modal
  const {modal} = useModalProvider();

  return (
    <>
      <>{modal?.element}</>
      <Outlet/>
    </>
  );
}

export default GlobalUseEffect;