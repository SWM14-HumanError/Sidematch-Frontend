import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import Sharing from '../svgs/Sharing.tsx';
import Like from '../svgs/Like.tsx';
import Edit from '../svgs/Edit.tsx';
import authControl from '../../constant/authControl.ts';
import {IMainFeeds} from "../../constant/interfaces.ts";

function FeedCard({title, content, thumbnailUrl, createdDate, userName, userPictureUrl, positionLevel}: IMainFeeds) {
  const navigate = useNavigate();

  const [chat, setChat] = useState('');
  const [like, setLike] = useState(false);
  const [follow, setFollow] = useState(false);

  const tokenData = authControl.getInfoFromToken();
  const myID = tokenData ? tokenData.id : 0;
  const myuser = myID === 1;

  return (
    <div className='feed_card'>
      <div className='feed_header'>
        <div className='feed_title_layout'>
          <img src={userPictureUrl} alt='user image'/>

          <div>
            <h3>{title}</h3>
            <TierSvg width={15} height={19.446} tier={positionLevel} />
            <span>{userName} ・ {createdDate}</span>
          </div>
        </div>
        <div className='image_button_layout'>
          <button className='image_button'>
            <Sharing width={24} height={24}/>
            공유하기
          </button>
          {myuser ? (
            <button className='image_button'
                    onClick={() => navigate('/update/feed/2')}>
              <Edit width={24} height={24}/>
              수정하기
            </button>
          ) : (
            <button className='image_button'
                    onClick={() => setLike(prev => !prev)}>
              <Like enable={like} width={24} height={24}/>
              좋아요
            </button>
          )}
        </div>
      </div>

      <div className='card_body_layout'>
        <img src={thumbnailUrl} alt='feed_img'/>

        <div className='card_body'>
          <p className='card_text'>{content}</p>

          <div className='comment_header'>
            <h5>댓글 ({3})</h5>
            <button className='link'>댓글 더보기</button>
          </div>
          <ul className='comment_layout'>

            <li className='card_comment'>
              <div className='card_comment_header'>
                <TierSvg width={15} height={20} tier={3}/>
                <h6>작성자 ・ 작성일</h6>
              </div>
              <p>댓글 내용</p>
            </li>

            <li className='card_comment'>
              <div className='card_comment_header'>
                <TierSvg width={15} height={20} tier={3}/>
                <h6>작성자 ・ 작성일</h6>
              </div>
              <p>댓글 내용</p>
            </li>

          </ul>
        </div>
      </div>

      <div className='card_comment_layout'>
        <input type='text'
               value={chat}
               onChange={e => setChat(e.target.value)}/>

        <button disabled={!chat.length}>
          댓글 작성
        </button>

        <button className={follow ? 'following' : 'follow'}
                onClick={()=> setFollow(prev => !prev)}>
          {follow ? '구독 중' : '구독 하기'}
        </button>
      </div>

    </div>
  );
}

export default FeedCard;