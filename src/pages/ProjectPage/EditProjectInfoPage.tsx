import {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Navigation from '@components/navigation/Navigation.tsx';
import SelectBox from '@components/inputs/SelectBox.tsx';
import ImgUpload from '@components/inputs/ImgUpload.tsx';
import SelectTeamMemberList from '@components/inputs/SelectTeamMemberList.tsx';
import LocationSelector from '@components/inputs/LocationSelector.tsx';
import Footer from '@components/Footer.tsx';
import {IEditProjectInfo, IEditProjectRequest} from '@constant/interfaces.ts';
import {InitEditProjectInfo, InitProjectDescription, InitStudyDescription} from '@constant/initData.ts';
import {ProjectFields} from '@constant/selectOptions.ts';
import {TechListEng} from '@components/inputs/SelectStackLevel.tsx';
import authControl from '@constant/authControl.ts';
import Alert from '@constant/Alert.ts';
import Api from '@constant/Api.ts';

import '@styles/MainProjectPage.scss';


const ProjectTypeOptions = [
  {option: '기업 프로젝트', value: 0},
  {option: '개인 프로젝트', value: 1},
]
// const ProjectRecruitArr = ['모집중', '모집완료'];

function EditProjectInfoPage() {
  const teamId = useParams().teamId;
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const teamNameRef = useRef<HTMLInputElement>(null);
  const teamDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const teamMemberRef = useRef<HTMLSelectElement>(null);
  
  const [base64, setBase64] = useState<string | null>(null);
  const [base64FileName, setBase64FileName] = useState<string>('');
  const [projectData, setProjectData] = useState<IEditProjectInfo>(InitEditProjectInfo);

  const token = authControl.getInfoFromToken();
  if (!token) {
    window.location.href = '/login';
    Alert.show('로그인 후 이용해주세요.');
  }

  const role = token.role;
  const isEnterprise = ['ENTERPRISE', 'ADMIN'].includes(role);

  useEffect(() => {
    const teamType = params.has('teamType') ? Number(params.get('teamType')) : 0;
    // console.log('teamType :', teamType);
    if (!teamId) {
      setProjectData(prev => ({
        ...prev,
        info: {
          ...prev.info,
          description:
            teamType === 0 ? InitProjectDescription :
            teamType === 1 ? InitStudyDescription : '',
          thumbnailUrl: getRandomDummyImageUrl()
        },
        type: {...prev.type, teamType: teamType}
      }));
      return;
    }

    Api.fetch2Json(`/api/v1/team/${teamId}/info`)
      .then(data => setProjectData(prev => ({...prev, info: data})))
      .catch(() => setProjectData(prev => ({...prev, info: InitEditProjectInfo.info})));

    Api.fetch2Json(`/api/v1/team/${teamId}/spot`)
      .then(data => setProjectData(prev => ({...prev, spot: data})))
      .catch(() => setProjectData(prev => ({...prev, spot: InitEditProjectInfo.spot})));

    Api.fetch2Json(`/api/v1/team/${teamId}/type`)
      .then(data => setProjectData(prev => ({...prev, type: {...data, teamType: teamType}})))
      .catch(() => setProjectData(prev => ({...prev, type: {...InitEditProjectInfo.type, teamType: teamType}})));

    Api.fetch2Json(`/api/v1/team/${teamId}/recruitInfo`)
      .then(data => setProjectData(prev => ({...prev, recruitMemberInfo: data})))
      .catch(() => setProjectData(prev => ({...prev, recruitMemberInfo: InitEditProjectInfo.recruitMemberInfo})));
  }, [teamId]);

  function getRandomDummyImageUrl() {
    const randomNum = Math.floor(Math.random() * 8) + 1;
    return `https://match-up-142023.s3.ap-northeast-2.amazonaws.com/${randomNum}.jpeg`;
  }

  function getNormalizedProjectData(data: IEditProjectInfo) {
    if (!projectData.info.title) {
      teamNameRef.current?.focus();
      Alert.show('프로젝트명을 입력해주세요.');
      return;
    }

    if (!projectData.info.description) {
      teamDescriptionRef.current?.focus();
      Alert.show('프로젝트 설명을 입력해주세요.');
      return;
    }

    const MemberList = data.recruitMemberInfo.memberList
      .filter(member => member.role !== TechListEng[0])
      .map(member => ({
        role: member.role,
        stacks: member.stacks.map(stack => stack),
        maxCount: member.maxCount,
      }));

    if (!MemberList.length) {
      teamMemberRef.current?.focus();
      Alert.show('모집 팀원을 선택해주세요.');
      return;
    }

    // 이미지 base64로 변환
    const normalize: IEditProjectRequest = {
      name: data.info.title,
      description: data.info.description,
      imageBase64: base64,
      imageName: base64FileName,

      type: {
        ...data.type,
        teamType: isEnterprise ? data.type.teamType : 1
      },
      meetingSpot: data.spot,
      meetingDate: data.info.meetingTime,
      memberList: MemberList,
    };

    return normalize;
  }

  function submitProjectInfo() {
    const NormalizedProjectData = getNormalizedProjectData(projectData);
    if (!NormalizedProjectData) return;

    ( teamId ? // 프로젝트 수정 시
      Api.fetch(`/api/v1/team/${teamId}`,  'PUT', NormalizedProjectData) : // 프로젝트 생성 시
      Api.fetch(`/api/v1/team`, 'POST', NormalizedProjectData)
    )
      .then(async res => {
        if (!res || res.status >= 400)
          throw new Error('프로젝트 생성/수정 API 요청 실패\n' + await res?.text());
        else if (res.ok && !!teamId)
          navigate(`/team/${teamId}`);
        else {
          const data = await res.text();
          const teamIdString = isNaN(parseInt(data)) ? '0' : data;
          navigate(`/team/${teamIdString}`);
        }
      })
      .catch(e => console.error('프로젝트 생성/수정 API 요청 :', e));
  }

  return (
    <>
      <Navigation/>

      <div className='main_layout'>
        <h1>
          {teamId ? `프로젝트 수정하기` : `프로젝트 만들기`}
        </h1>

        <div className='team_update_layout'>
          <div className='team_title_layout'>
            <div>
              <h2>프로젝트 대표 이미지</h2>
              <ImgUpload prevImgUrl={projectData.info.thumbnailUrl}
                         setFileName={setBase64FileName}
                         setBase64={setBase64}/>
            </div>

            <div>
              <h2 className='essential'>프로젝트명</h2>
              <div className='inputs_layout'>
                <input type='text'
                       ref={teamNameRef}
                       maxLength={29}
                       placeholder='프로젝트명을 입력해주세요'
                       value={projectData.info.title}
                       onChange={e =>
                         setProjectData(prev => (
                           {...prev, info: {...prev.info, title: e.target.value}}
                         ))}/>
              </div>

              <h2>프로젝트 유형</h2>
              <div className='inputs_layout'>
                {isEnterprise && (
                  <SelectBox options={ProjectTypeOptions}
                             hasDefault={false}
                             value={projectData.type.teamType}
                             onChange={value =>
                               setProjectData(prev => ({
                                 ...prev, type: {...prev.type, teamType: Number(value)}
                               }))}/>
                )}

                <SelectBox options={ProjectFields}
                           hasDefault={projectData.type.detailType === ProjectFields[0]}
                           value={projectData.type.detailType}
                           onChange={value =>
                             setProjectData(prev => ({
                                ...prev, type: {...prev.type, detailType: value}
                             }))}/>
              </div>
            </div>
          </div>


          <h2 className='essential'>프로젝트 설명</h2>
          <textarea placeholder='내용을 작성해 주세요'
                    ref={teamDescriptionRef}
                    maxLength={4999}
                    value={projectData.info.description}
                    onChange={e =>
                      setProjectData(prev => ({
                        ...prev, info: {...prev.info, description: e.target.value}
                      }))}/>


          <h2 className='essential'>모집 팀원</h2>
          {/*<SelectBox options={ProjectRecruitArr}*/}
          {/*           value={ProjectRecruitArr[projectData.recruitMemberInfo.state ? 1 : 0]}*/}
          {/*           onChange={value =>*/}
          {/*             setProjectData(prev => ({*/}
          {/*                ...prev, members: {...prev.recruitMemberInfo, state: ProjectRecruitArr.indexOf(value) === 1}*/}
          {/*             }))}/>*/}

          <SelectTeamMemberList value={projectData.recruitMemberInfo.memberList}
                                onChange={setProjectData}
                                teamMemberRef={teamMemberRef}/>
          <p>* 인원수가 불명확하거나 모집 직무를 선택하기 어려운 경우에는 기타로 두고, 스택 입력 없이 인원수만 지정해주세요</p>


          <h2>협업 방식</h2>
          <div className='inputs_layout'>
            <SelectBox options={['온라인', '오프라인']}
                       hasDefault={false}
                       value={projectData.spot.onOffline}
                       onChange={value => setProjectData(prev => ({
                          ...prev, spot: {...prev.spot, onOffline: value}
                       }))}/>

            {projectData.spot.onOffline === '오프라인' && (
              <>
                <LocationSelector value={projectData.spot.city}
                                  onChange={value =>
                                    setProjectData(prev => ({
                                      ...prev, spot: {...prev.spot, city: value}
                                  }))}/>
                
                <input type='text'
                       placeholder='세부 주소를 입력해주세요'
                       maxLength={49}
                       value={projectData.spot.detailSpot}
                       onChange={e =>
                         setProjectData(prev => ({
                           ...prev, spot: {...prev.spot, detailSpot: e.target.value}
                         }))}/>
              </>
            )}
          </div>
          <p>* 온오프라인을 병행하거나, 추후 변경되는 경우 오프라인 선택 후, 세부 주소에 기재해주세요</p>


          <h2>모임 시간</h2>
          <input type='text'
                 placeholder='모임 시간을 입력 해 주세요'
                 maxLength={49}
                 value={projectData.info.meetingTime}
                 onChange={e => setProjectData(prev => ({
                    ...prev, info: {...prev.info, meetingTime: e.target.value}
                 }))}/>


          <div className='submit_button_layout'>
            <button onClick={submitProjectInfo}>
              저장하기
            </button>

            <button className='cancel'
                    onClick={() => {
                      const confirm = window.confirm('작성한 내용이 저장되지 않습니다. \n정말로 취소하시겠습니까?');
                      if (!confirm) return;

                      if (teamId)
                        return navigate(`/team/${teamId}`, {replace: true});
                      return navigate(-1);
                    }}>
              취소하기
            </button>
          </div>
        </div>

      </div>

      <Footer/>
    </>
  );
}

export default EditProjectInfoPage;