import React, {useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';
import Image from '@components/Image.tsx';
import TierSvg from '@components/svgs/Tier/TierSvg.tsx';
import UserImage from '@components/UserImage.tsx';
import Like from '@components/svgs/Like.tsx';
import Edit from '@components/svgs/Edit.tsx';
import FeedComment from '@components/feeds/FeedComment.tsx';
import useLikeQuery from '@hooks/useLikeQuery.ts';
import useInfScroll4Widget from '@hooks/useInfScroll4Widget.ts';
import useUserInfo from '@hooks/useUserInfo.ts';
import useWindowSizeStore from '@/stores/useWindowSizeStore.ts';
import {IMainFeedComment, IMainFeeds} from '@constant/interfaces.ts';
import authControl from '@constant/authControl.ts';
import dataGen from '@constant/dateGen.tsx';
import Alert from '@constant/Alert.ts';
import Api from '@constant/Api.ts';

interface IFeedCard extends IMainFeeds{
  setLoginDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const dummy = {
  comments: [],
  size: 0,
  hasNextSlice: false
}

function FeedCard({id, userId, title, content, thumbnailUrl, createdDate, nickname, userPictureUrl, positionLevel, isLiked, setLoginDialog}: IFeedCard) {
  const navigate = useNavigate();
  const infScrollRef = useRef(null);

  const [modifyId, setModifyId] = useState(-1);
  const [chat, setChat] = useState('');
  // const [follow, setFollow] = useState(false);

  const myID = authControl.getUserIdFromToken();
  const myuser = myID === userId;

  // const [likes, setLikes] = useState<number>(0);
  const {like, /*likeCount,*/ setLike} = useLikeQuery(id => `/api/v1/feed/${id}/like`, id, /*likes*/0, isLiked);

  const {data, setReqParams, hideData} = useInfScroll4Widget(`/api/v1/feed/${id}/comment`, 'comments', infScrollRef, dummy, {page: 0});
  const {isAvailableUser, fixedNickname, fixedPositionLevel} = useUserInfo(nickname, positionLevel);
  const isMobile = useWindowSizeStore(state => state.isMobile);

  // useEffect(() => {
  //   Api.fetch(`/api/v1/feed/${id}/like`)
  //     .then(res => res?.text())
  //     .then(count => setLikes(isNaN(Number(count)) ? -1 : Number(count)))
  //     .catch(() => setLikes(-1));
  // }, [id]);


  function clickLike() {
    if (myID === 0)
      return setLoginDialog(true);
    if (myuser)
      return Alert.show('자신의 글에는 좋아요를 누를 수 없습니다');
    
    setLike(prev => !prev);
  }

  function addComment(chatString: string, setChat: React.Dispatch<React.SetStateAction<string>>) {
    if (myID === 0) {
      setLoginDialog(true);
      return;
    }

    (modifyId <= 0 ?
      Api.fetch(`/api/v1/feed/${id}/comment`, 'POST', {content: chatString}) :
      Api.fetch(`/api/v1/feed/${id}/comment/${modifyId}`, 'PUT', {content: chatString})
    )
      .then(res => res?.text())
      .then(() => {
        setChat('');
        setModifyId(-1);
        Api.fetch2Json(`/api/v1/feed/${id}/comment`)
          .then(() => refresh())
          .catch(() => console.error('댓글 불러오기 실패'));
      })
      .catch(() => {
        Alert.show('댓글 작성에 실패했습니다');
        console.error('댓글 작성 실패');
      });
  }

  function refresh() {
    setReqParams({page:0});
  }

  function setEditMode(commentId: number) {
    setModifyId(commentId);
    const comment = data.comments.find((item: { commentId: number; }) => item.commentId === commentId);
    if (comment) setChat(comment.content);
  }

  function cancelEditMode() {
    setModifyId(-1);
    setChat('');
  }

  return (
    <div className='feed_card'>
      <div className='feed_header'>
        <div className='feed_title_layout'>
          <UserImage profileImageURL={userPictureUrl} isAvailableUser={isAvailableUser}/>

          <div>
            <Link to={`/feed/${id}`}>
              <h3>{title}</h3>
            </Link>
            <div className='user_info_layout'>
              <TierSvg width={isMobile ? 16 : 20} height={isMobile ? 16 : 20} tier={fixedPositionLevel}/>
              <span><Link to={isAvailableUser ? `/profile/${userId}` : ''}>{fixedNickname}</Link> ・ {createdDate}</span>
            </div>
          </div>
        </div>
        <div className='image_button_layout'>
          {myuser && (
            <button className='image_button'
                    onClick={() => navigate(`/update/feed/${id}?title=${title}&content=${encodeURI(content)}&imageUrl=${thumbnailUrl}`)}>
              <Edit width={24} height={24}/>
              수정하기
            </button>
          )}
          <button className='image_button' aria-label={like ? '좋아요 취소' : '좋아요'}
                  onClick={clickLike}>
            <Like enable={like} width={24} height={24}/>
            {!isMobile && (
              <>
                {/*<span className=''>*/}
                {/*  {likeCount}*/}
                {/*</span>*/}
                좋아요
              </>
            )}
          </button>

          {/*<button className='image_button'*/}
          {/*        onClick={handleShareClick}>*/}
          {/*  <Sharing width={24} height={24}/>*/}
          {/*  공유하기*/}
          {/*</button>*/}
        </div>
      </div>

      <div className='card_body_layout'>
        <div className='card_paragraph_layout'>
          {thumbnailUrl && (
            <Image src={thumbnailUrl} dummyTitle={title}/>
          )}
          <p className='card_text'>{dataGen.text2Dom(content)}</p>
        </div>

        <div className='card_comment_layout'>
          <div className='comment_header'>
            <h5>댓글</h5>
            {/*<button className='link'>댓글 더보기</button>*/}
          </div>
          <ul className='comment_layout' ref={infScrollRef}>
            {data.comments.length === 0 && (
              <li className='card_comment'>
                <p>댓글이 없습니다</p>
              </li>

            )}
            {data.comments.map((item: JSX.IntrinsicAttributes & IMainFeedComment, index: number) => item && (
              <FeedComment key={index}
                           {...item}
                           feedId={id}
                           setEditMode={setEditMode}
                           refresh={() => hideData(index)}/>
            ))}
          </ul>

          <div className='comment_input_layout'>
            <input type='text'
                   placeholder='댓글을 입력해주세요'
                   maxLength={49}
                   value={chat}
                   onChange={e => setChat(e.target.value)}/>

            <button disabled={!chat.length}
                    onClick={() => addComment(chat, setChat)}>
              {modifyId > 0 ? '댓글 수정' : '댓글 작성'}
            </button>

            {modifyId > 0 && (
              <button className='cancel' onClick={cancelEditMode}>취소</button>
            )}

            {/*<button className={follow ? 'following' : 'follow'}*/}
            {/*        onClick={()=> setFollow(prev => !prev)}>*/}
            {/*  {follow ? '구독 중' : '구독 하기'}*/}
            {/*</button>*/}
          </div>
        </div>

      </div>
    </div>
  );
}

export default FeedCard;