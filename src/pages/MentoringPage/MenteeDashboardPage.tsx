import Navigation from "@components/navigation/Navigation.tsx";
import Footer from "@components/Footer.tsx";

const MenteeDashboardPage = () => {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800">
      {/* 상단 헤더 */}
      <Navigation/>

      {/* 배너 */}
      <section className="relative w-full h-56 bg-cover bg-center rounded-md overflow-hidden mx-auto mt-4 px-6" style={{ backgroundImage: `url('/images/mentor_banner.jpg')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center px-8">
          <h2 className="text-white text-2xl font-bold">성공적인 멘토링 사례</h2>
          <p className="text-white mt-1 text-sm">실제 멘토링을 통해 성장한 멘티들의 이야기</p>
        </div>
      </section>

      {/* 지표 카드 */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 mt-6">
        <InfoCard icon="/icons/calendar.svg" title="신청한 세션" value="5" />
        <InfoCard icon="/icons/mail.svg" title="받은 제안" value="3" />
        <InfoCard icon="/icons/play.svg" title="진행중" value="2" />
        <div className="hidden md:block" />
      </section>

      {/* 주요 액션 */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4 px-6 mt-4">
        <ActionButton icon="/icons/search.svg" label="멘토링 찾기" />
        <ActionButton icon="/icons/plus.svg" label="요청 등록" />
        <ActionButton icon="/icons/list.svg" label="내 요청" />
      </section>

      {/* 등록한 멘토링 요청 */}
      <section className="px-6 mt-8">
        <SectionTitle title="등록한 멘토링 요청" />
        <div className="space-y-4 mt-4">
          <MentoringRequestCard
            title="DevOps 자동화 멘토링 요청"
            date="2024.03.15 · 2개월"
            status="활성"
            icon="/icons/devops.svg"
          />
          <MentoringRequestCard
            title="React Native 앱 개발 멘토링 요청"
            date="2024.03.12 · 3개월"
            status="활성"
            icon="/icons/code.svg"
            mentor={{
              name: '박성호',
              role: '카카오 팀 리더',
              rating: 4.8,
              reviews: 89,
              tags: ['MSA', 'DevOps', 'Cloud'],
            }}
          />
        </div>
      </section>

      {/* 신청한 멘토링 세션 */}
      <section className="px-6 mt-10">
        <SectionTitle title="신청한 멘토링 세션" />
        <SessionRequestCard name="백엔드 개발 멘토링" date="2024.03.10" status="검토중" />
        <SessionRequestCard name="Java 프로그래밍 기초" date="2024.03.08" status="대기중" />
      </section>

      {/* 진행 중인 멘토링 */}
      <section className="px-6 mt-10">
        <SectionTitle title="진행 중인 멘토링" />
        <SessionRequestCard name="프론트엔드 개발 멘토링" date="2024.03.15" status="진행중" />
        <SessionRequestCard name="UX/UI 디자인 기초" date="2024.03.18" status="예정" />
      </section>

      {/* 최근 알림 */}
      <section className="px-6 mt-10 mb-16">
        <SectionTitle title="최근 알림" />
        <div className="bg-white shadow-sm rounded-lg p-4 mt-4 space-y-3">
          <AlertCard text="새로운 멘토링 제안이 도착했습니다" time="30분 전" />
          <AlertCard text="다음 멘토링 세션이 내일 예정되어 있습니다" time="2시간 전" />
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default MenteeDashboardPage;

// 하위 컴포넌트들
const InfoCard = ({ icon, title, value }: { icon: string, title: string, value: string }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
    <img src={icon} className="w-6 h-6" alt="" />
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  </div>
);

const ActionButton = ({ icon, label }: { icon: string, label: string }) => (
  <button className="bg-white w-full rounded-xl shadow-sm p-4 flex flex-col items-center gap-2 hover:bg-gray-50 transition">
    <img src={icon} className="w-6 h-6" alt="" />
    <span className="text-sm">{label}</span>
  </button>
);

const SectionTitle = ({ title }: { title: string }) => (
  <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
);

interface IMentoringRequestCard {
  icon: string;
  title: string;
  date: string;
  status: string;
  mentor?: {
    name: string;
    role: string;
    rating: number;
    reviews: number;
    tags: string[];
  };
}

const MentoringRequestCard = ({ icon, title, date, status, mentor }: Readonly<IMentoringRequestCard>) => (
  <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div className="flex items-center gap-3">
      <img src={icon} className="w-8 h-8" alt="" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500 mt-1">{date}</p>
      </div>
    </div>
    {mentor && (
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <div>
          <p className="font-semibold">{mentor.name}</p>
          <p className="text-sm text-gray-500">{mentor.role}</p>
          <div className="text-yellow-500 text-sm mt-1">⭐ {mentor.rating} ({mentor.reviews}개 리뷰)</div>
          <div className="flex gap-2 mt-1">
            {mentor.tags.map((tag: string) => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <button className="px-4 py-1 rounded bg-blue-100 text-blue-600 text-sm">수락</button>
          <button className="px-4 py-1 rounded bg-red-100 text-red-600 text-sm">거절</button>
        </div>
      </div>
    )}
    <div className="text-sm text-green-600 font-medium">{status}</div>
  </div>
);

const SessionRequestCard = ({ name, date, status }: { name: string, date: string, status: string }) => {
  const statusColor = getStatusColor(status);

  return (
    <div className="bg-white p-4 mt-2 rounded-xl shadow-sm flex justify-between items-center">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">신청일 · {date}</p>
      </div>
      <span className={`text-sm px-3 py-1 rounded ${statusColor}`}>{status}</span>
    </div>
  );
};

const AlertCard = ({ text, time }: { text: string, time: string }) => (
  <div className="flex justify-between items-center">
    <p className="text-sm">{text}</p>
    <span className="text-xs text-gray-500">{time}</span>
  </div>
);

const getStatusColor = (status: string) => {
  switch (status) {
    case '검토중':
      return 'bg-blue-100 text-blue-600';
    case '대기중':
      return 'bg-gray-100 text-gray-600';
    case '진행중':
      return 'bg-green-100 text-green-600';
    case '예정':
      return 'bg-yellow-100 text-yellow-600';
    default:
      return 'bg-gray-200 text-gray-600';
  }
}