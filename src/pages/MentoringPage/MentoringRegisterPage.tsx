import Navigation from "@components/navigation/Navigation.tsx";
import Footer from "@components/Footer.tsx";

function MentoringRegisterPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col text-gray-800">
      {/* 헤더 */}
      <Navigation/>

      {/* 본문 */}
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold mb-2">멘토링 등록</h1>
          <p className="text-sm text-gray-500 mb-4">* 표시된 항목은 필수 입력 사항입니다.</p>

          {/* 카탈로그 안내 */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm mb-6">
            <p className="text-blue-700 font-medium mb-2">멘토링 카탈로그에서 불러오기</p>
            <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
              <option>멘토링 카탈로그 선택...</option>
            </select>
            <p className="text-gray-500 mt-2">카탈로그를 선택하면 제목, 내용, 기술 스택이 자동으로 입력됩니다.</p>
          </div>

          {/* 입력 폼 */}
          <form className="bg-white rounded-xl shadow-md p-6 space-y-6">
            {/* 제목 */}
            <div>
              <label className="font-medium text-sm">
                멘토링 제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md text-sm"
                placeholder="멘토링 제목을 입력해주세요"
              />
            </div>

            {/* 기술 스택 */}
            <div>
              <label className="font-medium text-sm">
                기술 스택 <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  placeholder="검색"
                  className="w-full p-3 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                {/* 기술 스택 예시 */}
                {["/java.svg", "/spring.svg", "/react.svg", "/ts.svg"].map((src, i) => (
                  <img key={i} src={src} alt={`tech-${i}`} className="w-10 h-10 rounded" />
                ))}
              </div>
            </div>

            {/* 방식 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-medium text-sm">
                  멘토링 방식 <span className="text-red-500">*</span>
                </label>
                <select className="w-full mt-1 p-3 border border-gray-300 rounded-md text-sm">
                  <option>온라인</option>
                  <option>오프라인</option>
                </select>
              </div>
              <div>
                <label className="font-medium text-sm">
                  멘토링 형태 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2 mt-1">
                  <select className="flex-1 p-3 border border-gray-300 rounded-md text-sm">
                    <option>1:N</option>
                  </select>
                  <input
                    type="text"
                    placeholder="최대 인원 입력"
                    className="w-32 p-3 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>

            {/* 상세 내용 */}
            <div>
              <label className="font-medium text-sm">
                상세 내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={6}
                className="w-full mt-1 p-3 border border-gray-300 rounded-md text-sm resize-none"
                placeholder="멘토링 상세 내용을 입력해주세요"
              />
              <div className="text-sm text-gray-400 text-right mt-1">0/2000자</div>
            </div>

            {/* 시간 및 비용 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-medium text-sm">
                  멘토링 시간 <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <input type="time" className="p-3 border border-gray-300 rounded-md text-sm w-32" />
                  <span className="text-gray-500">~</span>
                  <select className="p-3 border border-gray-300 rounded-md text-sm w-32">
                    <option>30분</option>
                    <option>60분</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-medium text-sm">
                  멘토링 비용 <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    className="p-3 border border-gray-300 rounded-md text-sm flex-1"
                    placeholder="비용 입력"
                  />
                  <span className="text-gray-500">원</span>
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                className="px-5 py-2 border border-gray-300 rounded-md text-sm text-gray-700"
              >
                임시저장
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                등록하기
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* 푸터 */}
      <Footer/>
    </div>
  );
};

export default MentoringRegisterPage;