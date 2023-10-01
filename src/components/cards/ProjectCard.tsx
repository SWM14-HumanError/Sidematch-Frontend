import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Like from '../svgs/Like.tsx';
import HeartCount from '../svgs/HeartCount.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import StackImage from '../StackImage.tsx';
import useLikeQuery from '../../hooks/useLikeQuery.ts';
import {ITeamProjectSummary} from '../../constant/interfaces.ts';
import authControl from '../../constant/authControl.ts';
import Api from '../../constant/Api.ts';
import '../../styles/components/ProjectCard.scss';

interface IProjectCard extends ITeamProjectSummary {
  setLoginDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProjectCard({id, title, description, thumbnailUrl, techStacks, leaderID, leaderName, leaderLevel, setLoginDialog}: IProjectCard) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState<boolean>(false);
  const {like, likeCount, setLike} = useLikeQuery('team', id, liked);
  
  const myID = authControl.getUserIdFromToken();
  
  useEffect(() => {
    if (myID === 0) return;

    Api.fetch(`/api/v1/team/${id}/user/like`)
      .then(res => setLiked(res?.ok as boolean))
      .catch(err => console.error(err));
  }, []);

  function clickLike(e: React.MouseEvent | Event) {
    e.stopPropagation();
    if (myID === 0) setLoginDialog(true);
    else setLike(prev => !prev);

  }

  return (
    <div className='project_card' onClick={() => navigate(`/team/${id}`)}>
      {thumbnailUrl ? (
        <img src={thumbnailUrl} alt='team image'/>
      ) : (
        <div className='no_image'>
          <h2>{title}</h2>
        </div>
      )}


      <div className='info_layout'>
        <div className='project_info_detail_layout'>
          <div className='name_layout'>
            <h3>{title}</h3>
            <button className='image_button' onClick={clickLike}>
              <Like enable={like}/>
            </button>
          </div>

          <p>{description}</p>

          { techStacks.length > 0 && (
            <>
              <h4>프로젝트 스택</h4>
              <ul>
                {techStacks.map((stack, index) => (
                  <li key={index}><StackImage stack={stack}/></li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className='project_user_layout'>
          <div className='user_layout'
               onClick={event => {
                  event.stopPropagation();
                  navigate(`/profile/${leaderID}`);
               }}>
            <TierSvg width={15} height={20} tier={leaderLevel}/>
            <p>{leaderName}</p>
          </div>

          <HeartCount count={likeCount}/>
        </div>

      </div>
    </div>
  );
}

export default ProjectCard;