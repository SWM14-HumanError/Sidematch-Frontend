import Navigation from "@components/navigation/Navigation.tsx";
import Footer from "@components/Footer.tsx";

export default function MentorDashboardPage() {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <Navigation/>

      {/* Profile Info */}
      <section className="bg-white shadow px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <img src="/avatar.svg" alt="Mentor" className="w-16 h-16 rounded-full" />
          <div>
            <h2 className="font-semibold text-lg">강멘토</h2>
            <p className="text-sm text-gray-500">소프트웨어 개발 전문가</p>
            <p className="text-yellow-500 text-sm mt-1">★ 4.9 (128회의 리뷰)</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
          <div>이번 달 멘토링 <span className="block text-black font-semibold">32회</span></div>
          <div>총 멘토링 <span className="block text-black font-semibold">263회</span></div>
          <div>평균 만족도 <span className="block text-black font-semibold">4.9/5.0</span></div>
        </div>
      </section>

      {/* KPI Summary */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8">
        <div className="bg-white shadow p-6 rounded-xl">
          <p className="text-sm text-gray-500">오늘의 멘토링</p>
          <p className="text-2xl font-bold">3</p>
          <p className="text-sm mt-1">예정된 세션</p>
        </div>
        <div className="bg-white shadow p-6 rounded-xl">
          <p className="text-sm text-gray-500">새 멘토링 요청</p>
          <p className="text-2xl font-bold">5</p>
          <p className="text-sm mt-1">신규 요청</p>
        </div>
        <div className="bg-white shadow p-6 rounded-xl">
          <p className="text-sm text-gray-500">월간 수익</p>
          <p className="text-2xl font-bold text-green-600">₩2,450,000</p>
          <p className="text-sm mt-1 text-green-600">+15% 전월 대비</p>
        </div>
        <div className="bg-white shadow p-6 rounded-xl">
          <p className="text-sm text-gray-500">멘토링 통계</p>
          <p className="text-2xl font-bold">12회</p>
          <p className="text-sm mt-1">이번 주 세션</p>
        </div>
      </section>

      {/* Chart & Tables (Placeholder) */}
      <section className="p-8">
        <div className="bg-white shadow rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-lg mb-4">멘토링 통계</h3>
          <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            (Chart Placeholder)
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-lg mb-4">진행 중인 멘토링</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="p-2">멘티</th>
                <th className="p-2">주제</th>
                <th className="p-2">일정</th>
                <th className="p-2">상태</th>
                <th className="p-2">액션</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td className="p-2">+2 외</td>
                <td className="p-2">React 프로젝트 구조 설계</td>
                <td className="p-2">오늘 14:00</td>
                <td className="p-2 text-green-600">진행중</td>
                <td className="p-2 text-blue-600">상세보기</td>
              </tr>
              <tr>
                <td className="p-2">김멘티</td>
                <td className="p-2">TypeScript 실전 활용</td>
                <td className="p-2">내일 10:00</td>
                <td className="p-2 text-yellow-500">예정</td>
                <td className="p-2 text-blue-600">상세보기</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-4">최근 리뷰</h3>
          <ul className="space-y-4">
            <li>
              <p className="font-semibold">정학생</p>
              <p className="text-yellow-500">★★★★★</p>
              <p className="text-sm text-gray-600">멘토님께서 실전 위주의 질문을 주셔서 도움이 되었어요...</p>
            </li>
            <li>
              <p className="font-semibold">이개발</p>
              <p className="text-yellow-500">★★★★★</p>
              <p className="text-sm text-gray-600">프로젝트에 바로 적용할 수 있는 내용이라 좋았어요...</p>
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
