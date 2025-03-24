"use client";

import { Callout } from "src/_components/Callout";
import { QuizListItem } from "./_components/QuizListItem";
import { useRouter } from "next/navigation";
import { TopBarWithBackButton } from "src/_components/TopBarWithBackButton";
import Button from "src/_components/Button";
import { useQuery } from "@tanstack/react-query";
import { getDailyQuizByMemberId, getAllSolvedQuizzesByUserId } from "src/_api/api";
import { useAuth } from "src/_hooks/auth";

export default function Quiz() {
  const router = useRouter();
  const { user } = useAuth();

  const { data: quiz } = useQuery({
    queryKey: ["quiz"],
    queryFn: () => getDailyQuizByMemberId(user?.id),
    enabled: !!user?.id,
  });

  const { data: solvedQuizzes } = useQuery({
    queryKey: ["solvedQuiz"],
    queryFn: () => getAllSolvedQuizzesByUserId(user?.id),
    enabled: !!user?.id,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <TopBarWithBackButton title="금융 지식" onClick={() => router.push("/")} />
      <div className="bg-white py-6 px-5 ">
        <section className="pb-8">
          <div className="flex flex-col gap-2">
            {/* -- Callout --- */}
            <Callout variant="warning">
              <div>
                <p>퀴즈를 응시하면 티어 점수가 올라가요.</p>
                <p>퀴즈는 하루에 5번까지 응시가 가능해요.</p>
              </div>
            </Callout>
            <Callout variant="info">
              <div>[리그 공지] 승급심사까지 2시간 30분 남았어요!</div>
            </Callout>
          </div>
        </section>
        <section>
          <h3 className="title-sm text-gray-90 pb-4">하루 3분 금융지식 알아가기</h3>
          <ul className="flex flex-col gap-2">
            {solvedQuizzes?.map((quiz) => (
              <QuizListItem
                text={quiz.financeTitle}
                onClick={() => {
                  router.push(`/quiz/past/${quiz.id}`);
                }}
              />
            ))}
          </ul>
        </section>
      </div>
      <div className="px-5 py-5 fixed bottom-0 left-0 right-0">
        {quiz ? (
          <Button.Default onClick={() => router.push(`/quiz/today/${quiz?.id}`)} className="w-full">
            퀴즈 도전하기
          </Button.Default>
        ) : (
          <Button.Default className="bg-gray-10 text-gray-60 w-full" disabled>
            다음 퀴즈는 내일 9시에 공개돼요 🔒
          </Button.Default>
        )}
      </div>
    </div>
  );
}
