"use client";

import { TopBarWithBackButton } from "src/_components/TopBarWithBackButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { showQuiz, submitQuiz } from "src/_api/api";
import check from "src/assets/icon-check-green.svg";
import close from "src/assets/icon-close.svg";
import deco from "src/assets/images/icon-deco.png";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "src/_lib/utils";
import { useAuth } from "src/_hooks/auth";
import { use } from "chai";
import { AxiosError } from "axios";

export default function ProblemDetail() {
  const { problemId } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const router = useRouter();
  const { user } = useAuth();

  const problemIdNumber = Number(problemId);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerDescription, setAnswerDescription] = useState<string>(
    "분산 투자는 투자 금액을 여러 종목이나 자산에 나누어 투자하는 방법입니다. 예를 들어, 100만원을 한 회사에 투자하면 그 회사에 문제가 생길 경우 큰 손실을 입을 수 있습니다. 반면, 100만원을 5개 회사에 나누어 투자하면 한 회사에서 손실이 발생해도 다른 회사에서 이익을 얻어 전체 손실을 줄일 수 있습니다. 이를 통해 한 곳의 부정적 상황이 전체 투자에 미치는 영향을 낮출 수 있습니다."
  );

  const { data: problem } = useQuery({
    queryKey: ["problem"],
    queryFn: () => showQuiz(user?.id, problemIdNumber),
    enabled: !!user?.id && !!problemId,
  });

  const {
    mutate: mutateSubmitQuiz,
    data: submitQuizData,
    isSuccess,
    error,
    isError,
  } = useMutation({
    mutationFn: (answer: number) => submitQuiz(user?.id, problemIdNumber, answer),
  });

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    mutateSubmitQuiz(selectedAnswer + 1);
  };

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        if (error.response?.data.code === "ALREADY_SUBMITTED") {
          alert("이미 제출한 문제입니다.");
          router.replace("/quiz");
        }
      }
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      if (submitQuizData.status === "CORRECT") {
        setPopupMessage("정답이에요!");
        setShowPopup(true);
        setSelectedAnswer(submitQuizData.answerNumber);
        setAnswerDescription(submitQuizData.answerDescription);
      } else {
        setPopupMessage("아쉬워요\n내일 기회가 또 있어요!!");
        setShowPopup(true);
      }
    }
  }, [isSuccess]);

  return (
    <div className="flex flex-col min-h-screen">
      <TopBarWithBackButton title="금융퀴즈" />
      <div className="bg-white py-11 px-5  ">
        <div className="flex flex-col gap-2">
          <div className="heading-sm text-gray-80 pb-20">{problem?.problemTitle}</div>
        </div>

        <div className="flex flex-col gap-3">
          {problem?.problemOptions.map((option, index) => {
            const isAnswer = submitQuizData?.answerNumber === index;
            const isSelectedBeforeSubmit = !submitQuizData && selectedAnswer === index;
            const isWrongSelected = submitQuizData && !isAnswer && selectedAnswer === index;
            return (
              <button
                className={cn(
                  "py-5 px-5 rounded-2xl bg-gray-5 border-gray-10 border text-left",
                  isAnswer && "bg-green-5 border-green-50",
                  isSelectedBeforeSubmit && "bg-green-5 border-green-50",
                  isWrongSelected && "bg-red-5 border-danger bg-[#FFE4E0]"
                )}
                onClick={() => setSelectedAnswer(index)}
              >
                <div className="text-[16px] text-gray-90 font-medium flex justify-between items-center">
                  <div>{option}</div>
                  <div>
                    {isAnswer && <Image width={32} height={32} src={check} alt="check" />}
                    {isWrongSelected && (
                      <Image className="mr-2" width={16} height={16} src={close} alt="close" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {answerDescription !== "" && (
          <div className="pt-6 pb-20">
            <div className="body-md text-gray-80 rounded-2xl bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.08)] px-6 py-4">
              {answerDescription}
            </div>
          </div>
        )}
      </div>

      <div className="px-5 py-5 fixed bottom-0 left-0 right-0 ">
        {/* buttons */}
        {!submitQuizData ? (
          <div
            onClick={handleSubmit}
            className={cn(
              "flex justify-center py-4 w-full rounded-2xl bg-green-50 cursor-pointer",
              selectedAnswer === null ? "bg-gray-10" : "bg-green-50"
            )}
          >
            <div
              className={cn(
                "btn-primary label-lg text-white",
                selectedAnswer === null ? "bg-gray-60" : "bg-green-50"
              )}
            >
              제출하기
            </div>
          </div>
        ) : (
          <div
            onClick={() => router.replace("/quiz")}
            className={cn(
              "flex justify-center py-4 w-full rounded-2xl border border-green-50 text-green-50 cursor-pointer"
            )}
          >
            목록으로 돌아가기
          </div>
        )}
      </div>

      {showPopup && (
        <div className="z-10 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-gray-0 w-[262px] h-[232px] rounded-[16px] flex flex-col items-center justify-end relative">
            <Image src={deco} alt="출석 완료" className="mx-auto mb-4 absolute top-[-43%]" />
            <p className="title-md text-gray-40 whitespace-pre-line">{popupMessage}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="text-green-50 title-xs mb-[25px] mt-[33px]"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
