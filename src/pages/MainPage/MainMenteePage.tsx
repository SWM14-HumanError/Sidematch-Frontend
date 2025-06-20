import {useRef, useState} from 'react';
import Navigation from '@components/navigation/Navigation.tsx';
import SelectBox from '@components/inputs/SelectBox.tsx';
import Search from '@components/svgs/Search.tsx';
import UserCard from '@components/cards/UserCard.tsx';
import LoginRecommendDialog from '@components/dialogLayout/LoginRecommendDialog.tsx';
import LoadingComponent from '@components/LoadingComponent.tsx';
import Footer from '@components/Footer.tsx';
import useInfScroll from '@hooks/infScroll/useInfScroll.ts';
import useWindowSizeStore from '@/stores/useWindowSizeStore.ts';
import {MapLocationName} from '@components/svgs/maps/MapRouter.tsx';
import {useMainScrollTrigger} from '@constant/infScroll/useScrollTrigger.ts';
import {MeetingTypes, TechTypeOptions} from '@constant/selectOptions.ts';
import {MenteeAdapter} from '@constant/infScroll/InfScrollAdapter.ts';
import {IUser, IUserCardList} from '@constant/interfaces.ts';
import '@styles/MainProjectPage.scss';

const SortOptions = [
  {option: '가입순', value: ''},
  {option: '온도순', value: 'reviewScore'},
  {option: '좋아요순', value: 'likes'}
];
const MeetingTypeOptions = [
  {option: '전체', value: ''},
  ...MeetingTypes
];
const LocationOptions = ['전체', ...MapLocationName];

function MainMenteePage() {
  const [isAdvancedSearchOpened, setIsAdvancedSearchOpened] = useState<boolean>(false);
  const [selectedUserStack, setSelectedUserStack] = useState<string>(TechTypeOptions[0].value);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>(SortOptions[0].value);
  const [selectedMeetingType, setSelectedMeetingType] = useState<string>(MeetingTypeOptions[0].value);
  const [selectedLocation, setSelectedLocation] = useState<string>(LocationOptions[0]);

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);
  const isMobile = useWindowSizeStore(state => state.isMobile);

  const infScrollLayout = useRef<HTMLDivElement>(null);

  const trigger = useMainScrollTrigger(infScrollLayout);
  const {data, loading, isEmpty, isEnded, setReqParams}
    = useInfScroll<IUserCardList, IUser>(new MenteeAdapter(), trigger);

  function search() {
    let searchObj = {};

    if (selectedUserStack)
      searchObj = {...searchObj, position: selectedUserStack};
    if (searchKeyword)
      searchObj = {...searchObj, search: searchKeyword};

    if (isAdvancedSearchOpened) {
      if (selectedSort)
        searchObj = {...searchObj, orderBy: selectedSort};
      if (selectedMeetingType)
        searchObj = {...searchObj, meetingType: selectedMeetingType};
      if (selectedMeetingType === 'OFFLINE' && selectedLocation !== LocationOptions[0])
        searchObj = {...searchObj, place: selectedLocation};
    }

    setReqParams(searchObj);
  }

  return (
    <div>
      <Navigation/>
      <LoginRecommendDialog isOpen={isLoginDialogOpen} setIsOpen={setIsLoginDialogOpen} />

      <div className='banner'>
        <div>
          <h1>
            우리의 프로젝트와 함께 할 <br/>
            인재분들을 구해요
          </h1>
          <p>
            SideMatch는 프로젝트의 팀원과 멘토를 구하는 매칭 서비스입니다 <br/>
            여러분과 함께 할 인재를 SideMatch에서 찾아보세요
          </p>
        </div>
      </div>

      <div className='main_layout'>
        <div className='project'>
          <div className='header_layout'>
            <h2>인재풀</h2>
            <span>나에게 맞는 인재를 구해보세요 🔥</span>
          </div>
          <div className='header_flex'>
            <div>
              <div className='search_layout'>
                <SelectBox options={TechTypeOptions}
                           value={selectedUserStack}
                           onChange={value => setSelectedUserStack(value)}/>
                <div className='search_input_layout'>
                  <input type='text'
                         placeholder='키워드를 한글자 이상 입력해주세요'
                         maxLength={49}
                         value={searchKeyword}
                         onChange={e => setSearchKeyword(e.target.value)}/>

                  {!isAdvancedSearchOpened && (
                    <button className='search_button' aria-label='검색' onClick={search}>
                      <Search width={isMobile ? 48 : 62} height={isMobile ? 48 : 62}/>
                    </button>
                  )}
                </div>
              </div>

              {isAdvancedSearchOpened && (
                <div className='search_detail_layout'>
                  <div>
                    <h3>정렬</h3>
                    <SelectBox options={SortOptions}
                               value={selectedSort}
                               onChange={v => setSelectedSort(v)}/>
                  </div>

                  <div>
                    <h3>미팅 선호 타입</h3>
                    <div className='search_layout'>
                        <SelectBox options={MeetingTypeOptions}
                                   value={selectedMeetingType}
                                   onChange={v => setSelectedMeetingType(v)}/>

                      {selectedMeetingType === 'OFFLINE' && (
                        <SelectBox options={LocationOptions}
                                   value={selectedLocation}
                                   onChange={v => setSelectedLocation(v)}/>
                      )}
                        <button onClick={search}>
                          <Search width={isMobile ? 48 : 62} height={isMobile ? 48 : 62}/>
                        </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className='link'
                    onClick={() => setIsAdvancedSearchOpened(prev => !prev)}>
              고급 검색
            </button>
          </div>

          <div className={'card_layout' + (!loading && isEmpty ? ' no_contents' : ' user_card_layout')}
               ref={infScrollLayout}>
            <div>
              { !loading && isEmpty ? (
                <div className='list_no_contents'>
                  <p>팀원이 없습니다</p>
                </div>
              ):
              data.list.map((mentee: IUser | null | undefined) => mentee && (
                <UserCard key={mentee.userID} {...mentee} setLoginDialog={setIsLoginDialogOpen}/>
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

export default MainMenteePage;