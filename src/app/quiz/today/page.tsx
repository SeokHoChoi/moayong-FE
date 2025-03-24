"use client";

import Link from "next/link";
import { TopBarWithBackButton } from "src/_components/TopBarWithBackButton";
import { useQuery } from "@tanstack/react-query";
import { getDailyQuizByMemberId } from "src/_api/api";
import { ChevronRightIcon } from "lucide-react";
import coinIcon from "src/assets/icon-coin.svg";
import Image from "next/image";
import { useAuth } from "src/_hooks/auth";

export default function QuizDetail() {
  const { user } = useAuth();

  const { data: quiz } = useQuery({
    queryKey: ["dailyQuiz"],
    queryFn: () => getDailyQuizByMemberId(user?.id),
    enabled: !!user?.id,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <TopBarWithBackButton title="오늘의 금융 지식" />
      <div className="bg-white py-6 px-5  ">
        <div className="flex flex-col gap-2">
          <div className="flex items-center pb-1">
            <div className="title-xs text-gray-80">금융지식</div>
            <ChevronRightIcon />
          </div>
          <div className="heading-sm text-gray-80 pb-4">{quiz?.financeTitle}</div>
          {/* 이것이 제목 샘플입니다. 30바이트 */}
          <div className="flex gap-1 pb-4">
            <div className="label-sm text-gray-50">🗓️</div>
            <div className="label-sm text-gray-50 pr-3">2025년 3월 1일</div>
            <div className="label-sm text-gray-50">🕛</div>
            <div className="label-sm text-gray-50">소요시간 3분</div>
          </div>
        </div>
        <div className="py-8 px-6 rounded-2xl bg-gray-5">
          <div className="text-[16px] text-gray-90  font-medium">{quiz?.financeDescription}</div>
        </div>
      </div>
      <div className="px-5 py-5 fixed bottom-0 left-0 right-0 bg-white">
        <div className="flex justify-center py-4 w-full rounded-2xl bg-gray-10">
          <div className=" text-gray-90 font-medium">+25</div>
        </div>
      </div>

      <div>
        {quiz ? (
          <div className="px-5 py-5 fixed bottom-0 left-0 right-0 ">
            <Link
              href={`/quiz/today/${quiz.id}`}
              className="flex justify-center py-4 w-full rounded-2xl bg-green-50"
            >
              <button className="btn-primary label-lg text-white">정답 도전하기</button>
            </Link>
            <div className="absolute left-1/2 -top-1 transform -translate-x-1/2">
              <div className="flex items-center gap-1 bg-[#3D6CC8] text-white w-[116px] h-[32px] rounded-md justify-center">
                <Image src={coinIcon} alt="coin" width={16} height={16} />
                <span className="label-sm">+25p 얻기</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                className="absolute left-1/2 -bottom-2 transform -translate-x-1/2"
              >
                <path d="M16 0.543945H0L8 9.54395L16 0.543945Z" fill="#3D6CC8" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="px-5 py-5 fixed bottom-0 left-0 right-0 bg-white">
            <div className="flex justify-center py-4 w-full rounded-2xl bg-gray-10">
              <button className="btn-primary label-lg">다음 퀴즈는 내일 9시에 공개돼요 🔒</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
