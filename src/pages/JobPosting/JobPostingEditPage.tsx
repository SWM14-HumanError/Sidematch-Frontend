import {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from '@components/navigation/Navigation.tsx';
import SelectBox from '@components/inputs/SelectBox.tsx';
import ImgUpload from '@components/inputs/ImgUpload.tsx';
import Footer from '@components/Footer.tsx';
import {IJobPosting, IJobPostingEdit} from '@constant/interfaces.ts';
import {JobPositionOptions, JobTypeOptions} from '@constant/selectOptions.ts';
import {IJobEdit} from '@constant/initData.ts';
import authControl from '@constant/authControl.ts';
import Alert from '@constant/Alert.ts';
import Api from '@constant/Api.ts';

import '@styles/MainProjectPage.scss';


function JobPostingEditPage() {
  const {id} = useParams();
  const navigate = useNavigate();

  const teamNameRef = useRef<HTMLInputElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const teamDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const jobTypeRef = useRef<HTMLSelectElement>(null);
  const jobPositionRef = useRef<HTMLSelectElement>(null);
  const deadLineRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const [base64, setBase64] = useState<string | null>(null);
  const [base64FileName, setBase64FileName] = useState<string>('');
  const [jobPosting, setJobPosting] = useState<IJobPostingEdit>(IJobEdit);

  const token = authControl.getInfoFromToken();
  const role = token.role;
  const isAdmin = ['ADMIN'].includes(role);

  if (!token) {
    window.location.href = '/login';
    Alert.show('로그인 후 이용해주세요.');
  }
  if (!isAdmin) {
    navigate('/');
    Alert.show('권한이 없습니다.');
  }

  useEffect(() => {
    if (!id) {
      setJobPosting(IJobEdit);
      return;
    }

    Api.fetch2Json(`/api/v1/job-posting/${id}`)
      .then(data => setJobPosting(data))
      .catch(() => setJobPosting(IJobEdit));
  }, [id]);

  function getNormalizedProjectData(data: IJobPostingEdit) {
    const essentialArray = [
      {key: 'title', ref: teamNameRef, message: '채용공고 제목을 입력해주세요.'},
      {key: 'companyName', ref: companyNameRef, message: '기업명을 입력해주세요.'},
      {key: 'description', ref: teamDescriptionRef, message: '채용공고 설명을 입력해주세요.'},
      {key: 'jobType', ref: jobTypeRef, message: '모집 연차를 선택해주세요.'},
      {key: 'jobPosition', ref: jobPositionRef, message: '모집 분야를 선택해주세요.'},
      {key: 'deadLine', ref: deadLineRef, message: '채용공고 마감 날짜를 입력해주세요.'},
    ];

    for (const {key, ref, message} of essentialArray) {
      if (!data[key as keyof IJobPostingEdit]) {
        ref.current?.focus();
        Alert.show(message);
        return;
      }
    }

    // 이미지 base64로 변환
    const normalize: IJobPostingEdit = {
      ...data,
      applyLink: data.applyLink ?? null,
      imageBase64: base64 ?? null,
      imageName: base64FileName ?? null,
    };

    return normalize;
  }

  function submitJobPost() {
    const NormalizedProjectData = getNormalizedProjectData(jobPosting);
    if (!NormalizedProjectData) return;

    ( id ? // 프로젝트 수정 시
        Api.fetch(`/api/v1/job-posting/${id}`,  'PUT', NormalizedProjectData) : // 프로젝트 생성 시
        Api.fetch(`/api/v1/job-posting`, 'POST', NormalizedProjectData)
    )
      .then(async res => {
        if (!res || res.status >= 400)
          throw new Error('채용 공고 생성/수정 API 요청 실패\n' + await res?.text());
        else if (res.ok && !!id)
          navigate(`/job/${id}`);
        else { // id 값 없을 때
          const data = await res.text();

          const num = data.match(/\d+/g)?.[0];
          const teamIdString = !num || isNaN(parseInt(num)) ? '0' : num;
          navigate(`/job/${teamIdString}`);
        }
      })
      .catch(e => {
        Alert.show('채용 공고 생성/수정에 실패했습니다.');
        console.error('채용 공고 생성/수정 API 요청 :', e)
      });
  }

  return (
    <>
      <Navigation/>

      <div className='main_layout'>
        <h1>
          {id ? `채용공고 수정하기` : `채용공고 만들기`}
        </h1>

        <div className='team_update_layout'>
          <div className='team_title_layout'>
            <div>
              <h2>기업 대표 이미지</h2>
              <ImgUpload prevImgUrl={jobPosting.imgUrl}
                         messageStart='기업 로고에'
                         setFileName={setBase64FileName}
                         setBase64={setBase64}/>
            </div>

            <div>
              <h2 className='essential'>채용공고 제목</h2>
              <div className='inputs_layout'>
                <input type='text'
                       ref={teamNameRef}
                       maxLength={29}
                       placeholder='채용공고 제목을 입력해주세요'
                       value={jobPosting.title}
                       onChange={e =>
                         setJobPosting(prev => (
                           {...prev, title: e.target.value}
                         ))}/>
              </div>

              <h2 className='essential'>기업명</h2>
              <div className='inputs_layout'>
                <input type='text'
                       ref={companyNameRef}
                       maxLength={29}
                       placeholder='기업명을 입력해주세요'
                       value={jobPosting.companyName}
                       onChange={e =>
                         setJobPosting(prev => (
                           {...prev, companyName: e.target.value}
                         ))}/>
              </div>
            </div>
          </div>


          <h2 className='essential'>채용공고 설명</h2>
          <textarea placeholder='내용을 작성해 주세요'
                    ref={teamDescriptionRef}
                    maxLength={4999}
                    value={jobPosting.description}
                    onChange={e =>
                      setJobPosting(prev => (
                        {...prev, description: e.target.value}
                      ))}/>


          <h2 className='essential'>모집 연차</h2>
          <SelectBox options={JobTypeOptions}
                     value={jobPosting.jobType}
                     selectRef={jobTypeRef}
                     onChange={value =>
                       setJobPosting(prev => (
                         {...prev, jobType: value as IJobPosting['jobType']}
                       ))}/>


          <h2 className='essential'>모집 분야</h2>
          <SelectBox options={JobPositionOptions}
                     hasDefault={false}
                     selectRef={jobPositionRef}
                     value={jobPosting.jobPosition}
                     onChange={value => setJobPosting(prev => (
                       {...prev, jobPosition: value as IJobPosting['jobPosition']}
                     ))}/>

          <h2 className='essential'>마감일</h2>
          <input type='datetime-local'
                 ref={deadLineRef}
                 maxLength={29}
                 placeholder='마감일을 입력해주세요'
                 value={jobPosting.deadLine}
                 onChange={e =>
                   setJobPosting(prev => (
                     {...prev, deadLine: e.target.value}
                   ))}/>

          <h2>채용공고 링크</h2>
          <input type='url'
                 ref={linkRef}
                 placeholder='채용정보 링크를 입력해주세요'
                 value={jobPosting.applyLink}
                 onChange={e =>
                   setJobPosting(prev => (
                     {...prev, applyLink: e.target.value}
                   ))}/>


          <div className='submit_button_layout'>
            <button onClick={submitJobPost}>
              저장하기
            </button>

            <button className='cancel'
                    onClick={() => {
                      const confirm = window.confirm('작성한 내용이 저장되지 않습니다. \n정말로 취소하시겠습니까?');
                      if (!confirm) return;

                      if (id)
                        return navigate(`/job/${id}`, {replace: true});
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

export default JobPostingEditPage;