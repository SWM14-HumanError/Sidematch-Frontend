import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '@components/navigation/Navigation.tsx';
import SelectBox from '@components/inputs/SelectBox.tsx';
import MentorCard from '@components/cards/MentorCard.tsx';
import TechStackSelector from '@components/inputs/TechStackSelector.tsx';
import Search from '@components/svgs/Search.tsx';
import MentorDialog from '@components/dialogLayout/MentorDialog.tsx';
import LoadingComponent from '@components/LoadingComponent.tsx';
import LoginRecommendDialog from '@components/dialogLayout/LoginRecommendDialog.tsx';
import Footer from '@components/Footer.tsx';
import useMentoringPopup from '@hooks/useMentoringPopup.ts';
import useInfScroll from '@hooks/useInfScroll.ts';
import useWindowSizeStore from '@/stores/useWindowSizeStore.ts';
import {TechTypeOptions} from '@constant/selectOptions.ts';
import {IMainMentorList, IMentoring, IUser, IUserCardList, SearchParams} from '@constant/interfaces.ts';
import {MenteeAdapter, MentorAdapter} from '@constant/InfScrollAdapter.ts';
import authControl from '@constant/authControl.ts';

import '@styles/MainProjectPage.scss';
import '@styles/MainMentorPage.scss';
import UserCard from '@components/cards/UserCard.tsx';

const SearchTypeOptions = [
  {option: '제목+내용', value: 'TITLE_AND_CONTENT'},
  {option: '작성자', value: 'WRITER'},
];

function MainMentorPage() {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);
  const infScrollLayout = useRef<HTMLDivElement>(null);
  const infScrollMentorLayout = useRef<HTMLDivElement>(null);

  const adapter = useRef(new MentorAdapter());
  const {data, loading, isEnded, isEmpty, setReqParams, hideData}
    = useInfScroll<IMainMentorList, IMentoring>(adapter.current, infScrollLayout);

  const mentorAdapter = useRef(new MenteeAdapter());
  const {data: mentorData, loading: mentorLoading, isEmpty: mentorIsEmpty}
    = useInfScroll<IUserCardList, IUser>(mentorAdapter.current, infScrollMentorLayout);

  const mentoringPopup = useMentoringPopup(data.list as IMentoring[]);

  const token = authControl.getInfoFromToken();
  const isLogin = !!authControl.getUserIdFromToken();
  const UserRole = token ? token.role : '';


  return (
    <div>
      <LoginRecommendDialog isOpen={isLoginDialogOpen} setIsOpen={setIsLoginDialogOpen} />
      <MentorDialog {...mentoringPopup}
                    hideMentorCard={() => hideData(mentoringPopup.selectedCardIndex)}/>

      <Navigation/>
      
      <div className='banner image02'>
        <div>
          <h1>
            전문성을 나누고, <br/>
            커리어를 성장시키는 멘토링
          </h1>
          <p>
            전문가 멘토와 함께하는 맞춤형 프로젝트 코칭, <br/>
            여러분의 성장에 필요한 멘토를 지금 바로 만나보세요
          </p>
        </div>
      </div>

      <div className='main_layout'>
        <br/>

        <MentorSearches setReqParams={setReqParams}/>

        <div className='project'>
          <div className='header_space_between'>
            <div className='header_layout'>
              <h2>추천 멘토</h2>
              <span>나에게 맞는 멘토를 구해보세요 🔥</span>
            </div>
            {/*Fixme: Mentor 대시보드 Page URL 로 바꿔주기*/}
            <div className='header_layout'>
              {isLogin && (UserRole === 'MENTOR' || UserRole === 'ADMIN' ? (
                <Link to='/create/mentoring'>대시보드</Link>
              ) : (
                <Link to='/auth/mentor'>멘토 인증</Link>
              ))}
            </div>
          </div>

          <div className={'card_layout' + (!mentorLoading && mentorIsEmpty ? ' no_contents' : ' user_card_layout')}
               ref={infScrollMentorLayout}>
            <div>
              { !mentorLoading && mentorIsEmpty ? (
                  <div className='list_no_contents'>
                    <p>팀원이 없습니다</p>
                  </div>
                ):
                mentorData.list.slice(0, 3).map((mentee: IUser | null | undefined, index: number) => mentee && (
                  <UserCard key={index} {...mentee} setLoginDialog={setIsLoginDialogOpen}/>
                ))}
            </div>

            <div className='loading_component_div'>
              {loading && <LoadingComponent/>}
            </div>
          </div>
        </div>


        <div className='project'>
          <div className='header_space_between'>
            <div className='header_layout'>
              <h2>멘토링</h2>
              <span>나에게 맞는 멘토를 구해보세요 🔥</span>
            </div>
            {/*Fixme : 멘토링 요청 페이지로 바꾸기*/}
            <div className='header_layout'>
              {isLogin && (UserRole === 'MENTOR' || UserRole === 'ADMIN' ? (
                <Link to='/create/mentoring'>멘토링 만들기</Link>
              ) : (
                <Link to='/auth/mentor'>멘토링 요청</Link>
              ))}
            </div>
          </div>

          <div className={'card_layout' + (!loading && isEmpty ?  ' no_contents' : '')}
               ref={infScrollLayout}>
            <div>
              { !loading && isEmpty ? (
                  <div className='list_no_contents'>
                    <p>멘토가 없습니다</p>
                  </div>
                ):
                data.list.map((mentor: IMentoring | null | undefined) => mentor && (
                  <MentorCard key={mentor.mentoringId}
                              {...mentor}
                              setLoginDialog={setIsLoginDialogOpen} />
                ))}
            </div>

            <div className='loading_component_div'>
              {loading && <LoadingComponent/>}
            </div>
          </div>
        </div>
      </div>
      
      {isEnded && (<Footer/>)}
    </div>
  );
}

function MentorSearches({setReqParams}: {setReqParams: (params: SearchParams) => void}) {
  const [searchType, setSearchType] = useState<string>(SearchTypeOptions[0].value);
  const [searchValue, setSearchValue] = useState<string>('');
  // const [stack, setStack] = useState<string>('스택 전체');
  const [stack, setStack] = useState<string[]>([]);
  const [roleType, setRoleType] = useState<string>(TechTypeOptions[0].value);

  const isMobile = useWindowSizeStore(state => state.isMobile);

  useEffect(() => {
    search();
  }, []);

  function search() {
    let searchObj = {};

    if (searchValue)
      searchObj = {...searchObj, searchType: searchType, searchValue: searchValue};
    if (stack.length)
      searchObj = {...searchObj, stack: stack[0]};
    if (roleType)
      searchObj = {...searchObj, roleType: roleType};

    setReqParams(searchObj);
  }

  return (
    <div className='search_layout'>
      <SelectBox options={TechTypeOptions}
                 hasDefault={roleType !== TechTypeOptions[0].value}
                 value={roleType}
                 onChange={value => setRoleType(value)}/>
      <TechStackSelector value={stack} max={1} placeholder='스택 전체' onChange={setStack}/>
      <SelectBox options={SearchTypeOptions}
                 hasDefault={false}
                 value={searchType}
                 onChange={value => setSearchType(value)}/>

      <div className='search_input_layout'>
        <input type='text'
               placeholder='키워드를 한글자 이상 입력해주세요'
               maxLength={49}
               value={searchValue}
               onChange={e => setSearchValue(e.target.value)}/>

        <button className='search_button' aria-label='검색' onClick={search}>
          <Search width={isMobile ? 48 : 62} height={isMobile ? 48 : 62}/>
        </button>
      </div>
    </div>
  );
}

export default MainMentorPage;