import {useCallback, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import DialogTemplate from './DialogTemplate.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import UserImage from '../UserImage.tsx';
import {useCloseModal} from '@components/dialogLayout/ModalProvider.tsx';
import useUserInfo from '@hooks/useUserInfo.ts';
import {InitRefuseContents} from '@constant/initData.ts';
import {IRefuseContents} from '@constant/interfaces.ts';
import authControl from '@constant/authControl.ts';
import dataGen from '@constant/dateGen.tsx';
import Alert from '@constant/Alert.ts';
import Api from '@constant/Api.ts';

import '@styles/dialogs/ApplyDialog.scss';


function ApplyDenyContentsDialog() {
  const [params] = useSearchParams();
  const refuseId = parseInt(params.get('refuseID') ?? '-1');

  const closeModal = useCloseModal(['refuseID']);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refuseContents, setRefuseContents] = useState<IRefuseContents>(InitRefuseContents);

  const {isAvailableUser, fixedNickname} = useUserInfo(refuseContents.leaderName, null);

  const showError = useCallback((message: string) => {
    Alert.show(message);
    closeModal();
  }, [closeModal]);

  useEffect(() => {
    if (!authControl.isLogin()) {
      showError('로그인 후 이용해주세요');
      return;
    }

    if (refuseId <= 0) {
      showError('거절 이유 지원서를 볼 수 없습니다');
      return;
    }

    setIsLoading(true);
    Api.fetch2Json(`/api/v1/team/refuse/${refuseId}`)
      .then(data => setRefuseContents(data))
      .catch(e => console.error('거절 이유 지원서를 볼 수 없습니다', e))
      .finally(() => setIsLoading(false));
  }, [refuseId]);

  return (
    <DialogTemplate isOpen={true} setIsOpen={closeModal} isLoading={isLoading}>
      <div className='apply_dialog apply_deny_contents_dialog' style={{minWidth: 380}}>
        <div className='dialog_header'>
          <div>
            <span className='type_box'>프로젝트</span>
            <h3>{refuseContents.teamName}</h3>
          </div>
          <div>
            <button className='image_button' aria-label='닫기'
                    onClick={closeModal}>
              <CloseIcon width={28} height={28}/>
            </button>
          </div>
        </div>

        <div className='dialog_content'>
          <div className='user_info_layout'>
            <UserImage profileImageURL={refuseContents.leaderImage} isAvailableUser={isAvailableUser}/>
            <h4>{fixedNickname}</h4>
          </div>

          <p><b>시간:</b> {dataGen.getRelativeDate(refuseContents.refuseDate)}</p>
          <p><b>to</b> {refuseContents.refusedUser}</p>

          <h4>거절 이유</h4>
          <p className='contents_box'>
            {dataGen.string2Html(refuseContents.refuseReason)}
          </p>
        </div>

        <div className='dialog_footer fill'>
          <button className='cancel'
                  onClick={closeModal}>
            확인
          </button>
        </div>
      </div>
    </DialogTemplate>
  );
}

export default ApplyDenyContentsDialog;