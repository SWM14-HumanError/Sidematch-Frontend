import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import CircleHamburger from '../svgs/CircleHamburger.tsx';
import useInfScroll4Widget from '@hooks/infScroll/useInfScroll4Widget.ts';
import {IAlarmData, IAlarmList} from '@constant/interfaces.ts';
import dataGen from '@constant/dateGen.tsx';
import Api from '@constant/Api.ts';

//PROJECT, STUDY, FEED, MENTORING, ETC
const AlarmCategories = [
  {
    name: '전체',
    path: undefined,
  },
  {
    name: '기업 프로젝트',
    path: 'PROJECT',
  },
  {
    name: '개인 프로젝트',
    path: 'STUDY',
  },
  {
    name: '피드',
    path: 'FEED',
  },
  {
    name: '멘토링',
    path: 'MENTORING',
  },
  {
    name: '기타',
    path: 'ETC',
  },
];

const InitialAlarmData: IAlarmList = {
  alertResponseList: [],
  size: 0,
  hasNextSlice: false,
}

interface IAlarmLayout {
  setIsAlarmModalOpened: (isAlarmModalOpened: boolean) => void;
  setIsMenuOpened: (isMenuOpened: boolean) => void;
  setHasAlarm: (hasAlarm: boolean) => void;
  setAlarmMenuData: (alarmMenuData: IAlarmMenu) => void;
}

function AlarmLayout({setIsAlarmModalOpened, setHasAlarm, setIsMenuOpened, setAlarmMenuData}: Readonly<IAlarmLayout>) {
  const infScrollRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const {data, setReqParams, changeData, hideData}
    = useInfScroll4Widget<IAlarmData>('/api/v1/alert', 'alertResponseList', infScrollRef, InitialAlarmData, {page: 0});
  const alerts = data.alertResponseList ?? [];

  useEffect(() => {
    setReqParams({
      alertType: AlarmCategories[selectedCategory].path,
      page: 0,
    });
  }, [selectedCategory]);

  useEffect(() => {
    if (alerts.length && !alerts.some((v) => !!v)) {
      setHasAlarm(alerts.slice(10).some((alert) => !!alert && !alert.read));
    }
  }, [data]);

  function dataIsEmpty(data: IAlarmList): boolean {
    return !data.alertResponseList.length || !data.alertResponseList.some((v) => !!v);
  }

  return (
    <div className='alarm_content_layout'>
      <div className='category_layout_container'>
        <ul className='category_layout'>
          {AlarmCategories.map((category, index) => (
            <li key={category.name}>
              <button className={selectedCategory === index ? 'selected' : ''}
                      onClick={() => setSelectedCategory(index)}>{category.name}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className='alarm_contents_container'>
        <ul className='alarm_contents'>
          {dataIsEmpty(data as IAlarmList) ? (
            <li>
              <div className='alarm_content read'><p>알림이 없습니다</p></div>
            </li>
          ) :
          alerts.map((alert, index: number) => alert && (
            <AlarmContent key={alert.id}
                          {...alert}
                          setIsAlarmModalOpened={setIsAlarmModalOpened}
                          setIsMenuOpened={setIsMenuOpened}
                          setAlarmMenuData={setAlarmMenuData}
                          changeData={data => changeData(index, data)}
                          deleteData={() => hideData(index)}/>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function useAlarmLayout() {
  const [AlarmMenuData, setAlarmMenuData] = useState<IAlarmMenu>(InitAlarmMenu);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  return {
    AlarmMenuData,
    setAlarmMenuData,
    isMenuOpened,
    setIsMenuOpened,
  }
}

interface IAlarmMenu {
  read: boolean;
  readAlarm: () => void;
  deleteAlarm: () => void;
  target: HTMLElement | null;
  setIsMenuOpened?: (isMenuOpened: boolean) => void;
}

interface IAlarmContent extends IAlarmData {
  setIsAlarmModalOpened: (isAlarmModalOpened: boolean) => void;
  setIsMenuOpened: (isMenuOpened: boolean) => void;
  setAlarmMenuData: (alarmMenuData: IAlarmMenu) => void;
  changeData: (func: (prev: IAlarmData) => IAlarmData) => void;
  deleteData: () => void;
}

function AlarmContent({
                        id,
                        title,
                        createdDate,
                        content,
                        redirectUrl,
                        read,
                        setIsAlarmModalOpened,
                        setIsMenuOpened,
                        setAlarmMenuData,
                        changeData,
                        deleteData
                      }: Readonly<IAlarmContent>) {
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  function readAlarm() {
    if (!read)
      Api.fetch(`/api/v1/alert/read/${id}`, 'POST')
        .then(() => changeData((prev) => ({...prev, read: true})))
        .catch(err => console.error(err));
  }

  function readAlarmAndClose() {
    readAlarm();
    navigate(redirectUrl);
    setIsAlarmModalOpened(false);
  }

  function deleteAlarm() {
    Api.fetch(`/api/v1/alert/delete/${id}`, 'POST')
      .then(() => deleteData())
      .catch(err => console.error(err));
  }

  function openAlarmMenuKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openAlarmMenu();
    }
  }

  function openAlarmMenu(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (e) e.stopPropagation();

    setAlarmMenuData({
      read,
      readAlarm,
      deleteAlarm,
      target: buttonRef.current,
    });
    setIsMenuOpened(true);
  }

  // Todo: aria 설정 다시 할 것
  return (
    <li>
      <div className={'alarm_content' + (read ? ' read' : '')}
           role='menu'
           tabIndex={0}
           onKeyDown={openAlarmMenuKey}
           onClick={readAlarmAndClose}>
        <div className='alarm_content_header'>
          <div>
            <h4>{title}</h4>
            <p>{dataGen.getRelativeDate(createdDate)}</p>
          </div>
          <button className='image_button' aria-label='알림 상태 변경' onClick={openAlarmMenu} ref={buttonRef}>
            <CircleHamburger width={16} height={16}/>
          </button>

        </div>
        <p>{dataGen.string2Html(content)}</p>
      </div>
    </li>
  );
}

interface IAlarmMenu {
  read: boolean;
  readAlarm: () => void;
  deleteAlarm: () => void;
  target: HTMLElement | null;
  setIsMenuOpened?: (isMenuOpened: boolean) => void;
}

const InitAlarmMenu: IAlarmMenu = {
  read: false,
  readAlarm: () => {},
  deleteAlarm: () => {},
  target: null,
}

export function AlarmMenu({read, readAlarm, target, setIsMenuOpened, deleteAlarm}: Readonly<IAlarmMenu>) {
  const rect = target?.getBoundingClientRect();
  const center = rect ? (rect?.left + rect?.right) / 2 : 0;
  const width = 128;
  const height = rect ? rect.height : 0;
  const buttonWidth = rect ? rect.width : 0;
  const x = center - width + buttonWidth / 2;
  const y = rect ? rect.bottom - height : 0;

  function clickOutside(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    if (setIsMenuOpened)
      setIsMenuOpened(false);
  }
  function closeMenuByKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape' && setIsMenuOpened) {
      setIsMenuOpened(false);
    }
  }

  return (
    <div className='modal_menu_background' role="none" onClick={clickOutside}>
      <div className='alarm_content_menu'
           role='menu'
           tabIndex={-1}
           aria-label="알림 메뉴"
           style={{top: y, left: x}}
           onKeyDown={closeMenuByKey}
           onClick={e => e.stopPropagation()}>
        {!read && (
          <button role="menuitem" onClick={() => {
            if (setIsMenuOpened) setIsMenuOpened(false);
            readAlarm();
          }}>
            읽음으로 표시
          </button>
        )}
        <button role="menuitem" onClick={() => {
          if (setIsMenuOpened) setIsMenuOpened(false);
          deleteAlarm();
        }}>
          알림 삭제
        </button>
      </div>
    </div>
  )
}

export default AlarmLayout;