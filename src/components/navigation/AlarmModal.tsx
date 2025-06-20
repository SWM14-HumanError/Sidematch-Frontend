import {Link} from 'react-router-dom';
import Bell from '../svgs/Bell.tsx';
import Settings from '../svgs/Settings.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import AlarmLayout, {AlarmMenu, useAlarmLayout} from './AlarmLayout.tsx';
import authControl from '@constant/authControl.ts';

interface IAlarmModal {
  setHasAlarm: (hasAlarm: boolean) => void;
  setIsAlarmModalOpened: (isAlarmModalOpened: boolean) => void;
  target: HTMLElement | null;
}

/** 알림 모달 컴포넌트 */
function AlarmModal({setIsAlarmModalOpened, target, setHasAlarm}: Readonly<IAlarmModal>) {
  const {isMenuOpened, setIsMenuOpened, AlarmMenuData, setAlarmMenuData} = useAlarmLayout();

  const rect = target?.getBoundingClientRect();
  const center = rect ? (rect?.left + rect?.right) / 2 : 0;
  const width = 400;
  const x = center - width / 2;
  const adjustedX = window.innerWidth < x + width ? window.innerWidth - width - 16 : x;

  return (
    <>
      {isMenuOpened && <AlarmMenu {...AlarmMenuData} setIsMenuOpened={setIsMenuOpened}/>}
      <div className='modal_background alarm_modal'
           role="none"
           style={{left: adjustedX}}
           onClick={e => e.stopPropagation()}>
        <div className='alarm_header_layout'>
          <div className='header_title_layout'>
            <Bell width={28} height={28} state={0}/>
            <h3>알림</h3>
          </div>

          <div className='header_button_layout'>
            <button className='link' onClick={authControl.logout}>로그아웃</button>
            <Link to='/profile/settings'
                  className='svg_button'
                  aria-label='설정으로 이동'>
              <Settings width={28} height={28}/>
            </Link>
            <button className='svg_button'
                    aria-label='알림 닫기'
                    onClick={() => setIsAlarmModalOpened(false)}>
              <CloseIcon width={28} height={28}/>
            </button>
          </div>
        </div>

        <AlarmLayout setIsAlarmModalOpened={setIsAlarmModalOpened}
                     setIsMenuOpened={setIsMenuOpened}
                     setHasAlarm={setHasAlarm}
                     setAlarmMenuData={setAlarmMenuData}/>
      </div>
    </>
  );
}

export default AlarmModal;