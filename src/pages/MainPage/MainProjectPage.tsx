import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '../../components/Navigation.tsx';
import ProjectCard from '../../components/cards/ProjectCard.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import Search from '../../components/svgs/Search.tsx';
import '../../styles/MainProjectPage.scss';

import {IProjectList} from '../../constant/interfaces.ts';
import {InitProject} from '../../constant/initData.ts';
import {projects as projectsDummy} from '../../dummies/dummyData.ts';
import {ProjectFields, ProjectSubFields} from '../../constant/selectOptions.ts';

function MainProjectPage() {
  const [projects, setProjects] = useState<IProjectList>(InitProject);
  const [selectedField, setSelectedField] = useState<string>(ProjectFields[0]);
  const [selectedSubField, setSelectedSubField] = useState<string>(ProjectSubFields[0]);

  useEffect(() => {
    search(0);
  }, []);

  function search(page: number, field?: string, subField?: string) {
    let url = `/api/v1/list/team?type=0&page=${page}`;
    if (field) url += `&field=${field}`;
    if (subField) url += `&subField=${subField}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (page === 0) setProjects(data);
        else setProjects(prevData => ({
          teamSearchResponseList: [...prevData.teamSearchResponseList, ...data.teamSearchResponseList],
          size: data.size,
          hasNextSlice: data.hasNextSlice
        }));
      }).catch((err) => {
      console.log(err);
      setProjects(projectsDummy);
    });
  }

  return (
    <>
      <Navigation/>
      <div className='banner'>
        <div>
          <h1>
            우리 스터디 진행합니다! <br/>
            멘티 ・ 멘토분 모여주세요
          </h1>
          <p>
            MatchUp은 프로젝트/스터디의 멘티과 멘토를 구하는 매칭 서비스입니다. <br/>
            하고 싶은 프로젝트/스터디를 정해서 멘티와 멘토를 구해보세요!
          </p>
          <div className='banner_button_layout'>
            <Link className='button' to='/mentee'>
              팀원 구하기
            </Link>
            <Link className='button' to='/mentor'>
              멘토 구하기
            </Link>
          </div>
        </div>
      </div>

      <div className='main_layout'>
        <div className='project'>
          <div className='header_layout'>
            <h2>프로젝트</h2>
            <span>지금 새로 생긴 핫한 프로젝트에요 🔥</span>
          </div>
          <div className='search_layout'>
            <SelectBox options={ProjectFields}
                       value={selectedField}
                       onChange={value => setSelectedField(value)}/>
            <SelectBox options={ProjectSubFields}
                       value={selectedSubField}
                       onChange={value => setSelectedSubField(value)}/>
            <button onClick={() =>
              search(
                0,
                selectedField !== ProjectFields[0] ? selectedField : undefined,
                selectedSubField !== ProjectSubFields[0] ? selectedSubField : undefined)
            }>
              <Search/>
            </button>
          </div>

          <div className='card_layout'>
            {projects.teamSearchResponseList.map((project) => (
              <ProjectCard key={project.id} {...project}/>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

export default MainProjectPage;