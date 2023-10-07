import Navigation from '../../components/navigation/Navigation.tsx';
import Footer from '../../components/Footer.tsx';
import Alert from '../../constant/Alert.ts';
import authControl from '../../constant/authControl.ts';
import Api from '../../constant/Api.ts';

import '../../styles/MainProjectPage.scss';

function ProfileSetting() {
  function saveSettings() {
    Api.fetch('/api/v1//profile/feedbacks/hide', 'PUT')
      .then(async res => {
        if (res?.status === 200) {
          const msg = await res.text();
          Alert.show(msg);
        } else {
          Alert.show('저장에 실패했습니다.');
        }
      });
  }
  
  function deleteAccount() {
    if (!confirm('정말로 회원 탈퇴를 하시겠습니까?'))
      return;

    const token = authControl.getInfoFromToken();
    const userID = token ? token.id : 0;
    
    Api.fetch2Json(`/api/v1/profile/${userID}`, 'DELETE')
      .then(res => {
        console.log(res);
        authControl.logout();
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <Navigation/>
      <div className='main_layout'>
        <h1>프로필 설정</h1>

        <h2>피드백 공개</h2>
        <label>
          <input type='checkbox'/>
          <span>피드백 숨기기</span>
        </label>

        {Array.from({length: 10}).map((_, i) => (<br key={i}/>))}

        <div className='submit_button_layout'>
          <button onClick={saveSettings}>저장하기</button>
          <button className='danger' onClick={deleteAccount}>회원 탈퇴</button>
        </div>
      </div>

      <Footer/>
    </>
  );
}

export default ProfileSetting;