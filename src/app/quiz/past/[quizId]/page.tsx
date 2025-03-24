"use client";

import { TopBarWithBackButton } from "src/_components/TopBarWithBackButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSolvedQuiz, showQuiz, submitQuiz } from "src/_api/api";

import deco from "src/assets/images/icon-deco.png";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "src/_lib/utils";
import { useAuth } from "src/_hooks/auth";
import dayjs from "dayjs";

export default function PastQuizDetail() {
  const { quizId } = useParams();

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const router = useRouter();
  const { user } = useAuth();

  const quizIdNumber = Number(quizId);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerDescription, setAnswerDescription] = useState<string>("");

  const { data: quiz } = useQuery({
    queryKey: ["quiz"],
    queryFn: () => getSolvedQuiz(user?.id, quizIdNumber),
    enabled: !!user?.id && !!quizIdNumber,
  });
  console.log(quiz);

  return (
    <div className="flex flex-col min-h-screen">
      <TopBarWithBackButton title="금융퀴즈" />
      <div className="bg-white py-11 px-5  ">
        <div className="flex flex-col gap-2">
          <div className="heading-sm text-gray-80 pb-4 ">{quiz?.financeTitle}</div>

          <div className="flex gap-1 pb-4">
            <div className="label-sm text-gray-50">🗓️</div>
            <div className="label-sm text-gray-50 pr-3">
              {dayjs(quiz?.createdAt).format("YYYY년 M월 D일")}
            </div>
            <div className="label-sm text-gray-50">🕛</div>
            <div className="label-sm text-gray-50">소요시간 3분</div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="body-md text-gray-80 rounded-2xl bg-gray-5 px-6 py-4">
            {quiz?.financeDescription}
          </div>
        </div>
        <div className="px-5 py-5 fixed bottom-0 left-0 right-0 ">
          <div
            onClick={() => router.replace("/quiz")}
            className={cn(
              "flex justify-center py-4 w-full rounded-2xl border border-green-50 text-green-50 cursor-pointer"
            )}
          >
            목록으로 돌아가기
          </div>
        </div>
      </div>
    </div>
  );
}
