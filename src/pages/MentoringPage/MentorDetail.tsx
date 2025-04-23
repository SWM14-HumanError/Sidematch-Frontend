import React from "react";
import Navigation from "@components/navigation/Navigation.tsx";
import Footer from "@components/Footer.tsx";

function MentorProfilePage() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800">
      {/* Header */}
      <Navigation/>

      {/* Main Profile Section */}
      <main className="max-w-screen-xl mx-auto px-6 py-10">
        {/* Top profile area */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-6">
            <img
              src="/uxui.jpeg"
              alt="mentor"
              className="w-28 h-28 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">김지훈</h2>
              <p className="text-gray-500">네이버 시니어 백엔드 개발자</p>
              <div className="mt-1 text-sm text-gray-600">
                ⭐ 4.9 (123건 리뷰) · 진행 8건 · 응답률 99%
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Java", "Spring", "MSA", "Backend", "Cloud"].map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button className="mt-6 md:mt-0 px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700">
            멘토링 신청
          </button>
        </div>

        {/* 소개 & 수치 */}
        <div className="mt-10">
          <h3 className="font-semibold mb-3">멘토 소개</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            10년차 백엔드 개발자로서 대규모 트래픽 처리와 시스템 아키텍처 설계에 전문성을 가지고 있습니다. 네이버에서 전체 서비스 개발을 담당하고 있으며, MSA 환경에서의 개발 경험이 풍부합니다. 주니어 개발자들의 성장을 돕는 것을 보람 있게 생각하며, 실무에서의 문제를 함께 해결해나가는 과정을 통해 멘티들이 한 단계 성장할 수 있도록 돕고자 합니다.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-5 bg-gray-50 rounded-lg">
            <div className="text-blue-600 font-bold text-xl">152</div>
            <div className="text-gray-500 text-sm">총 멘토링 회차</div>
          </div>
          <div className="p-5 bg-gray-50 rounded-lg">
            <div className="text-blue-600 font-bold text-xl">89%</div>
            <div className="text-gray-500 text-sm">재신청률</div>
          </div>
          <div className="p-5 bg-gray-50 rounded-lg">
            <div className="text-blue-600 font-bold text-xl">4.9</div>
            <div className="text-gray-500 text-sm">평균 평점</div>
          </div>
        </div>

        {/* 멘토링 리스트 */}
        <div className="mt-12">
          <h3 className="font-semibold mb-4">멘토링</h3>
          <div className="space-y-4">
            {[
              {
                title: "1:1 코드 리뷰",
                desc: "현업 시니어의 꼼꼼한 코드 리뷰를 통해 클린 코드 작성법을 배웁니다.",
                tags: ["TS", "Next.js"],
                price: "120,000원",
                rating: 4.8,
              },
              {
                title: "대규모 시스템 설계",
                desc: "대규모 서비스의 아키텍처를 분석하고 설계하는 방법을 학습합니다.",
                tags: ["AWS", "Kafka", "Docker"],
                price: "200,000원",
                rating: 4.9,
              },
              {
                title: "Spring 마이크로서비스",
                desc: "Spring Boot를 활용한 마이크로서비스 아키텍처 구현을 배웁니다.",
                tags: ["Spring", "JPA"],
                price: "150,000원",
                rating: 4.7,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="border rounded-xl p-4 flex justify-between items-start"
              >
                <div>
                  <h4 className="font-semibold text-base">{item.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right whitespace-nowrap text-sm">
                  ⭐ {item.rating.toFixed(1)}
                  <br />
                  <span className="text-blue-600 font-bold">{item.price}</span>/회
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 진행중인 멘토링 */}
        <div className="mt-12">
          <h3 className="font-semibold mb-4">진행중인 멘토링</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border p-4 rounded-xl">
              <div className="text-sm font-semibold">실전 Spring Boot 마이크로서비스 개발</div>
              <div className="text-xs text-green-600 font-medium mt-1">진행중</div>
              <div className="bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full w-[75%]" />
              </div>
            </div>
            <div className="border p-4 rounded-xl">
              <div className="text-sm font-semibold">대규모 서비스 설계와 운영</div>
              <div className="text-xs text-yellow-600 font-medium mt-1">모집중</div>
              <div className="bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-500 h-2 rounded-full w-[50%]" />
              </div>
              <div className="text-xs text-right mt-1 text-gray-500">2/4명</div>
            </div>
          </div>
        </div>

        {/* 멘티 후기 */}
        <div className="mt-12">
          <h3 className="font-semibold mb-4">멘티 후기</h3>
          <div className="space-y-4">
            {[
              {
                name: "익명1",
                time: "3일 전",
                content:
                  "세부적으로 분석할 수 있는 다양한 문제 상황들을 예시로 들어가며 설명해주셔서 매우 도움이 되었습니다.",
              },
              {
                name: "익명2",
                time: "1일 전",
                content:
                  "체계적인 커리큘럼과 실습 위주의 학습 방식이 매우 효과적이었습니다. 특히 코드 리뷰를 통해 개선이 필요한 부분을 상세히 피드백 받을 수 있어서 큰 도움이 되었습니다.",
              },
            ].map((review, i) => (
              <div key={i} className="border p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <img
                    src="/uxui.jpeg"
                    className="w-8 h-8 rounded-full"
                    alt={review.name}
                  />
                  <div>
                    <div className="text-sm font-semibold">{review.name}</div>
                    <div className="text-xs text-gray-500">{review.time}</div>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">{review.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 추천 멘토 */}
        <div className="mt-12">
          <h3 className="font-semibold mb-4">추천 멘토</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "박성진", job: "카카오 클라우드 리더", rating: 4.8, skills: "MSA / DevOps / Cloud" },
              { name: "최민준", job: "네이버 시니어 개발자", rating: 4.9, skills: "Spring / JPA / Backend" },
              { name: "이재진", job: "쿠팡 엔터 엔지니어", rating: 4.7, skills: "System Design / Architecture" },
            ].map((mentor, i) => (
              <div key={i} className="border p-4 rounded-xl flex items-start space-x-3">
                <img src="/uxui.jpeg" className="w-10 h-10 rounded-full" alt=''/>
                <div>
                  <div className="font-semibold text-sm">{mentor.name}</div>
                  <div className="text-xs text-gray-500">{mentor.job}</div>
                  <div className="text-xs mt-1">⭐ {mentor.rating} ({mentor.skills})</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default MentorProfilePage;
