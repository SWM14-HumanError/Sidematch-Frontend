import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import useInfScroll from '@hooks/infScroll/useInfScroll.ts';
import useWindowSizeStore from '@/stores/useWindowSizeStore.ts';
import Navigation from '@components/navigation/Navigation.tsx';
import SelectBox from '@components/inputs/SelectBox.tsx';
import FeedCard from '@components/feeds/FeedCard.tsx';
import Search from '@components/svgs/Search.tsx';
import LoadingComponent from '@components/LoadingComponent.tsx';
import LoginRecommendDialog from '@components/dialogLayout/LoginRecommendDialog.tsx';
import Footer from '@components/Footer.tsx';
import {IMainFeeds, IMainFeedsList, SearchParams} from '@constant/interfaces.ts';
import {useMainScrollTrigger} from '@constant/infScroll/useScrollTrigger.ts';
import {FeedAdapter} from '@constant/infScroll/InfScrollAdapter.ts';
import {option2Record} from '@constant/selectOptions.ts';
import authControl from '@constant/authControl.ts';
import {josa} from 'es-hangul';
import '@styles/MainProjectPage.scss';

const SEARCH_TYPE = [
  {option: '제목', value: 'TITLE'},
  {option: '작성자', value: 'WRITER'},
];
const SearchTypeRecord = option2Record(SEARCH_TYPE);

function MainFeedPage() {
  const infScrollLayout = useRef<HTMLDivElement>(null);

  const trigger = useMainScrollTrigger(infScrollLayout);
  const {data, loading, isEmpty, isEnded, setReqParams}
    = useInfScroll<IMainFeedsList ,IMainFeeds>(new FeedAdapter(), trigger);

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);

  const login = authControl.isLogin();

  return (
    <div>
      <LoginRecommendDialog isOpen={isLoginDialogOpen} setIsOpen={setIsLoginDialogOpen} />
      <Navigation/>

      <div className='main_layout'>
        <div className='project feed_layout_header'>
          <h1>피드</h1>
          <div className='header_flex'>
            <FeedSearches setReqParams={setReqParams}/>

            {login && (
              <Link to='/create/feed'>피드 만들기</Link>
            )}
          </div>

        </div>
      </div>

      <div className='feed_background'
           ref={infScrollLayout}>
        <div className='feed_layout'>
          { !loading && isEmpty ? (
            <div className='list_no_contents'>
              <p>피드가 없습니다</p>
            </div>
          ) :
          data.list.map((feed) => feed && (
            <FeedCard key={feed.id} {...feed} setLoginDialog={setIsLoginDialogOpen}/>
          ))}
        </div>
        
        <div className='loading_component_div'>
          {loading && <LoadingComponent/>}
        </div>
      </div>
      
      {isEnded && (<Footer/>)}
    </div>
  );
}

interface ISearches {
  setReqParams: (params: SearchParams) => void;
}

const initSearches = {
  searchType: SEARCH_TYPE[0].value, // 초기 검색 타입은 '제목'
  searchValue: '' // 초기 검색 값은 빈 문자열
}

function FeedSearches({setReqParams}: Readonly<ISearches>) {
  const [searches, setSearches] = useState<Record<string, string>>(initSearches);
  const searchFieldHangul = SearchTypeRecord[searches.searchType];
  const isMobile = useWindowSizeStore(state => state.isMobile);

  function search() {
    setReqParams(searches.searchValue ? searches : {});
  }

  function updateSearches(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    setSearches(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className='search_layout'>
      <SelectBox options={SEARCH_TYPE}
                 value={searches.searchType}
                 onChange={searchType => setSearches(prev => ({...prev, searchType}))}
                 hasDefault={false}/>
      <div className='search_input_layout'>
        <input type='text'
               name='searchValue'
               placeholder={`${searchFieldHangul}${josa.pick(searchFieldHangul, '을/를')} 입력해주세요`}
               maxLength={49}
               value={searches.searchValue}
               onChange={updateSearches}/>

        <button className='search_button'
                aria-label='피드 검색'
                onClick={search}>
          <Search width={isMobile ? 48 : 62} height={isMobile ? 48 : 62}/>
        </button>
      </div>
    </div>
  )
}

export default MainFeedPage;