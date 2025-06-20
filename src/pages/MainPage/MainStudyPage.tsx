import {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '@components/navigation/Navigation.tsx';
import ProjectCard from '@components/cards/ProjectCard.tsx';
import SelectBox from '@components/inputs/SelectBox.tsx';
import Search from '@components/svgs/Search.tsx';
import LoadingComponent from '@components/LoadingComponent.tsx';
import LoginRecommendDialog from '@components/dialogLayout/LoginRecommendDialog.tsx';
import Footer from '@components/Footer.tsx';
import useWindowSizeStore from '@/stores/useWindowSizeStore.ts';
import useInfScroll from '@hooks/infScroll/useInfScroll.ts';
import {useMainScrollTrigger} from '@constant/infScroll/useScrollTrigger.ts';
import {IProjectList, ITeamProjectSummary} from '@constant/interfaces.ts';
import {StudyAdapter} from '@constant/infScroll/InfScrollAdapter.ts';
import {ProjectFields} from '@constant/selectOptions.ts';
import authControl from '@constant/authControl.ts';

import '@styles/MainProjectPage.scss';


function MainProjectPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>(ProjectFields[0]);
  const [searchString, setSearchString] = useState<string>('');
  const infScrollLayout = useRef<HTMLDivElement>(null);

  const isMobile = useWindowSizeStore(state => state.isMobile);

  const trigger = useMainScrollTrigger(infScrollLayout);
  const {data, loading, isEmpty, isEnded, setReqParams}
    = useInfScroll<IProjectList, ITeamProjectSummary>(new StudyAdapter(), trigger);

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);

  const tokenData = authControl.getInfoFromToken();
  const login = !!tokenData;

  function search(category?: string, search?: string) {
    let paramObj: Record<string, number|string> = {type: 1};

    if (category)
      paramObj = {
        ...paramObj,
        category: category
      }

    if (search)
      paramObj = {
        ...paramObj,
        search: search
      }

    setReqParams(paramObj);
  }

  return (
    <>
      <LoginRecommendDialog isOpen={isLoginDialogOpen} setIsOpen={setIsLoginDialogOpen} />
      <Navigation/>
      
      <div className='banner'>
        <div>
          <h1>
            아이디어 구현부터 <br/>
            팀원과 멘토 매칭까지
          </h1>
          <p>
            SideMatch는 여러분의 프로젝트 성공을 응원합니다 <br/>
            여러분을 도와 줄 인재와 멘토가 기다리고 있습니다
          </p>
          <div className='banner_button_layout'>
            <Link className='button' to='/mentee'>
              팀원 구하기
            </Link>
            <Link className='button' to='/mentor'>
              멘토 구하기
            </Link>
          </div>
        </div>
      </div>

      <div className='main_layout'>
        <div className='study'>
          <div className='header_space_between'>
            <div className='header_layout'>
              <h2>개인 프로젝트</h2>
              <span>지금 새로 생긴 핫한 개인 프로젝트에요 🔥</span>
            </div>
            <div className='header_layout'>
              {login && (
                <Link to='/create/team?teamType=1'>개인 프로젝트 만들기</Link>
              )}
            </div>
          </div>

          <div className='header_flex'>
            <div className='search_layout'>
              <SelectBox options={ProjectFields}
                         value={selectedCategory}
                         onChange={value => setSelectedCategory(value)}/>

              <div className='search_input_layout'>
                <input type='text'
                       placeholder='프로젝트 이름을 입력해주세요'
                       maxLength={49}
                       value={searchString}
                       onChange={e => setSearchString(e.target.value)}/>

                <button className='search_button'
                        aria-label='검색'
                        onClick={() => search(
                          selectedCategory !== ProjectFields[0] ? selectedCategory : undefined,
                          searchString ? searchString : undefined)
                        }>
                  <Search width={isMobile ? 48 : 62} height={isMobile ? 48 : 62}/>
                </button>
              </div>
            </div>
          </div>

          <div className={'card_layout' + (!loading && isEmpty ? ' no_contents' : '')}
               ref={infScrollLayout}>
            <div>
              { !loading && isEmpty ? (
                <div className='list_no_contents'>
                  <p>프로젝트가 없습니다</p>
                </div>
                ) :
              data.list.map((study) => study && (
                <ProjectCard key={study.id} {...study} setLoginDialog={setIsLoginDialogOpen}/>
              ))}
            </div>
            
            <div className='loading_component_div'>
              {loading && <LoadingComponent/>}
            </div>
          </div>
        </div>
      </div>

      {isEnded && (<Footer/>)}
    </>
  );
}

export default MainProjectPage;