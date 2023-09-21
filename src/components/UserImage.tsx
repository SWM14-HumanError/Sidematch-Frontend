import userNone from '../../assets/userNone.svg';

function UserImage({profileImageURL}: {profileImageURL: string|null}) {
  return !!profileImageURL ? (
    <img className='border' src={profileImageURL} alt='user image'/>
  ) : (
    <img src={userNone} alt='user image'/>
  );
}

export default UserImage;