import {IAdditionalInfo, IEditFeedInfo, IEditProjectInfo, IProjectDetail} from './interfaces.ts';
import {ProjectSubFields} from "./selectOptions.ts";

export const InitProject = {
  teamSearchResponseList: [],
  size: -1,
  hasNextSlice: true
}

export const InitUser = {
  userCardResponses: [],
  size: 0,
  hasNextSlice: true,
}

export const InitProjectDetail:IProjectDetail = {
  info: {
    teamID: 1,
    title: 'Team Example',
    description: 'This is a sample team.',
    thumbnailUrl: '',
    leaderID: 1,
  },
  members: [],
  spot: {
    onOffline: 'Offline init',
    city: 'Seoul init',
    detailSpot: 'Central Park init'
  },
  mentoring: [],
  stacks: [],
}

export const InitEditProjectInfo: IEditProjectInfo = {
  info: {
    title: '',
    description: '',
    thumbnailUrl: '',
    leaderID: 1,
  },
  type: {
    teamType: 0,
    detailType: '기타',
  },
  spot: {
    onOffline: 'Online',
    city: '',
    detailSpot: ''
  },
  recruitMemberInfo: {
    state: false,
    memberList: [],
  }
}

export const InitAdditionalInfo: IAdditionalInfo = {
  name: '',
  nickname: '',
  positionLevel: 1,
  userBirthdayYear: 1982,
  userBirthdayMonth: 3,
  userBirthdayDay: 10,
  address: '서울',
  expYear: 2,
  expertize: [
    '스프링'
  ],
  meetingType: 'ONLINE',
  position: 'Back-end'
}

export const InitFeedInfo: IEditFeedInfo = {
  title: '',
  content: '',
  imageUrl: '',
  type: 0,
  domain: ProjectSubFields[0],
}