import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import SelectStackLevelList from '../../components/inputs/SelectStackLevelList.tsx';
import useUniqueNickname, {FetchStatus} from '../../hooks/useUniqueNickname.ts';
import ImgUpload from '../../components/inputs/ImgUpload.tsx';
import Footer from '../../components/Footer.tsx';
import {userPositionsToUserPositionLevels} from '../ProfilePage/EditProfileInfoPage.tsx';
// import {LocationNames} from '../../constant/selectOptions.ts';
import {IAdditionalInfoRequest, IMyPageDetail} from '../../constant/interfaces.ts';
import {InitAdditionalInfo} from '../../constant/initData.ts';
import Alert from '../../constant/Alert.ts';
import authControl from '../../constant/authControl.ts';
import Api from '../../constant/Api.ts';

import '../../styles/SigninTerms.scss';

function UserAdditionalInfo() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [base64, setBase64] = useState<string | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<IAdditionalInfoRequest>(InitAdditionalInfo);
  const [birthday, setBirthday] = useState({
    year: 2000, month: 3, day: 1,
  });
  
  const nicknameAvailable = useUniqueNickname(additionalInfo.nickname, '');

  const token = authControl.getInfoFromToken();
  const userID = token ? token.id : 0;

  useEffect(() => {
    Api.fetch2Json(`/api/v1/profile/${userID}`)
      .then((res) => {
        const user: IMyPageDetail = res;
        setAdditionalInfo({
          nickname: initializeData(user.nickname, ''),
          pictureUrl: user.pictureUrl,
          birthDay: '2000-03-02',
          expYear: 0,
          userPositionLevels: userPositionsToUserPositionLevels(user.userPositions),
        })
      })
      .catch((err) => console.log(err));
  }, []);

  function initializeData(data: any, init: any) {
    return data ? data : init;
  }

  function saveAdditionalInfo() {
    if (!additionalInfo.nickname) {
      Alert.show('닉네임을 입력해주세요.');
      return;
    }
    else if (nicknameAvailable !== FetchStatus.SUCCESS) {
      Alert.show('닉네임 중복확인을 해주세요.');
      return;
    }

    setIsSubmitting(true);
    Api.fetch('/api/v1/login/user/info', 'PUT', {
      ...additionalInfo,
      birthDay: getNormalizedBirthday(birthday.year, birthday.month, birthday.day),
      pictureUrl: base64,
    })
      .then(res => {
        if (!!res && res.status < 300)
          navigate(authControl.getRedirectUrl());
        else
          Alert.show('회원가입에 실패했습니다. 다시 시도해주세요.');
      })
      .finally(() => setIsSubmitting(false));
  }

  function getNormalizedBirthday(y: number, m: number, d: number) {
    const normalize = (n: number) => n < 10 ? '0' + n : n;

    return `${y}-${normalize(m)}-${normalize(d)}`;
  }

  // function getNormalizeMeetingType() {
  //   switch (additionalInfo.meetingType) {
  //     case '온라인':
  //       return 'ONLINE';
  //     case '오프라인':
  //       return 'OFFLINE';
  //     case '상관없음':
  //       return 'FREE';
  //     default:
  //       return 'FREE';
  //   }
  // }

  return (
    <>
      <div className='main_layout'>
        <h1>추가 정보 입력</h1>

        <div className='additional_info_layout'>
          <h2>프로필 사진</h2>
          <ImgUpload prevImgUrl={additionalInfo.pictureUrl}
                     base64Img={base64}
                     setBase64={setBase64}/>

          <h2>닉네임</h2>
          <div className='inputs_layout'>
            <input type='text'
                   value={additionalInfo.nickname}
                   onChange={e => setAdditionalInfo(prev => ({...prev, nickname: e.target.value}))}/>

            { nicknameAvailable === FetchStatus.LOADING ? (
              <span className='fetch_box loading'>중복확인 중...</span>
            ) : nicknameAvailable === FetchStatus.SUCCESS ? (
              <span className='fetch_box success'>사용 가능한 닉네임입니다.</span>
            ) : nicknameAvailable === FetchStatus.FAILURE ? (
              <span className='fetch_box failure'>이미 사용중인 닉네임입니다.</span>
            ) : null}
          </div>

          <h2>생일</h2>
          <div className='inputs_layout'>
            <SelectBox options={Array.from({length:70}, (_, i) => (i+1960).toString())}
                       value={birthday.year.toString()}
                       onChange={value => setBirthday(prev => ({...prev, year: parseInt(value)}))}
                       hasDefault={false}/>
            <SelectBox options={Array.from({length:12}, (_, i) => (i+1).toString())}
                       value={birthday.month.toString()}
                       onChange={value => setBirthday(prev => ({...prev, month: parseInt(value)}))}
                       hasDefault={false}/>
            <SelectBox options={Array.from({length:31}, (_, i) => (i+1).toString())}
                       value={birthday.day.toString()}
                       onChange={value => setBirthday(prev => ({...prev, day: parseInt(value)}))}
                       hasDefault={false}/>
          </div>

          <h2>개발 연차</h2>
          <label>
            <input type='number'
                   min={0}
                   value={additionalInfo.expYear.toString()}
                   onChange={e => setAdditionalInfo(prev => ({...prev, expYear: parseInt(e.target.value)}))}/>
            &nbsp; 년
          </label>

          {/*<h2>거주지 주소</h2>*/}
          {/*<div className='inputs_layout'>*/}
          {/*  <SelectBox options={LocationNames}*/}
          {/*             value={additionalInfo.address}*/}
          {/*             onChange={value => setAdditionalInfo(prev => ({...prev, address: value}))}*/}
          {/*             hasDefault={false}/>*/}
          {/*</div>*/}

          {/*<h2>미팅 선호 타입</h2>*/}
          {/*<SelectBox options={['온라인', '오프라인', '상관없음']}*/}
          {/*           value={additionalInfo.meetingType}*/}
          {/*           onChange={value => setAdditionalInfo(prev => ({...prev, meetingType: value}))}*/}
          {/*           hasDefault={false}/>*/}

          {/*<h2>position</h2>*/}
          {/*<input type='text'*/}
          {/*       value={additionalInfo.position}*/}
          {/*       onChange={e => setAdditionalInfo(prev => ({...prev, position: e.target.value}))}/>*/}


          <h2>개발 능력</h2>
          <SelectStackLevelList className='member_selector_layout'
                                value={additionalInfo.userPositionLevels}
                                setData={data => setAdditionalInfo(prev => ({
                                  ...prev,
                                  userPositionLevels: data,
                                }))}/>

          <div className='submit_button_layout'>
            <button onClick={saveAdditionalInfo}
                    disabled={isSubmitting}>
              저장하기
            </button>

            <button className='cancel'
                    onClick={() => navigate(authControl.getRedirectUrl())}>
              나중에입력
            </button>
          </div>
        </div>
      </div>
      
      <Footer/>
    </>
  )
}

export default UserAdditionalInfo;