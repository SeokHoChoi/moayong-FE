"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import backbar from "src/assets/appbar.svg";
import Image from "next/image";
import { GoogleIcon } from "src/components/common/Icons";
import { useRouter } from "next/navigation";
import Button from "src/_components/Button";

import { cn } from "src/_lib/utils";
import { useAuth } from "src/_hooks/auth";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "src/_api/api";
import { UserPutRequest } from "src/_types/type";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [savingsRate, setSavingsRate] = useState<string>("0");
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setMonthlyIncome(user.monthlySalary);
      setSavingsRate(String(user.savingsRate));
    }
  }, [user]);

  const {
    mutate: mutateUpdateUser,
    isSuccess: isSuccessUpdateUser,
    isPending: isMutateLoading,
  } = useMutation({
    mutationFn: (data: UserPutRequest) => updateUser(user?.id, data),
  });

  const handleSubmit = () => {
    if (isEditing) {
      mutateUpdateUser({
        nickname,
        monthlySalary: monthlyIncome,
        savingsRate: Number(savingsRate),
      });
    } else {
      setIsEditing(true);
    }
  };
  useEffect(() => {
    if (isSuccessUpdateUser) {
      setIsEditing(false);
    }
  }, [isSuccessUpdateUser]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    setNicknameError(value.length > 0 ? null : "닉네임을 입력해주세요.");
  };

  const handleMonthlyIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value === "" || (Number(value) >= 0 && Number(value) <= 100000)) {
      setMonthlyIncome(Number(value));
    }
  };

  const handleSavingsRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
      setSavingsRate(value);
    }
  };

  const handleWithdraw = () => {
    router.push("/withdraw");
  };

  const labelClassName = "label-sm text-gray-50 block";
  const inputClassName = cn(
    "outline-none py-2.5 title-md w-full",
    isEditing ? "text-gray-40 border-b border-gray-30" : "text-gray-50 rounded-lg",
    "placeholder:text-gray-50 focus:text-gray-80"
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center px-4 h-14 ">
        <div className="h-[50px] w-full flex items-center pl-[9px]">
          <button onClick={() => router.push("/")} className="z-10">
            <Image src={backbar} alt="" />
          </button>
          <p className="title-sm text-gray-80 text-center w-full ml-[-36px]">나의 정보 수정</p>
        </div>
      </header>

      <div className="flex-1 px-5">
        {/* Login Info Section */}
        <section className="mt-6">
          <h2 className="title-sm mb-4">로그인 정보</h2>
          <div className="flex items-center gap-2 bg-gray-10 px-5 py-3.5 rounded-lg">
            <GoogleIcon />
            <span className="text-gray-50 label-md">Kimmoa@gmail.com</span>
          </div>
        </section>

        {/* Member Info Section */}
        <section className="mt-8">
          <h2 className="title-sm mb-6">회원 정보</h2>

          <div className="flex flex-col gap-8">
            {/* Name Input */}
            <div>
              <label className={labelClassName}>이름</label>
              <input
                type="text"
                value={user?.name}
                readOnly={!isEditing}
                className={inputClassName}
              />
            </div>

            {/* Nickname Input */}
            <div>
              <label className={labelClassName}>닉네임</label>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                  readOnly={!isEditing}
                  className={inputClassName}
                />
                {isEditing && (
                  <button
                    onClick={() => setNickname("")}
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>
              {nicknameError && <p className="text-red-500 text-sm mt-1">{nicknameError}</p>}
            </div>

            {/* Monthly Income */}
            <div>
              <label className={labelClassName}>월 급여</label>
              <div className="flex items-center relative">
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={handleMonthlyIncomeChange}
                  readOnly={!isEditing}
                  className={inputClassName}
                />
                <span className="ml-2 text-gray-600 absolute right-0">만원</span>
              </div>
            </div>

            {/* Monthly Savings Target */}
            <div>
              <label className={labelClassName}>월 저축 목표</label>

              {isEditing ? (
                <div className="flex items-center relative">
                  <input
                    type="text"
                    value={savingsRate}
                    onChange={handleSavingsRateChange}
                    readOnly={!isEditing}
                    className={`${inputClassName} w-full`}
                  />
                  <span className="ml-2 text-gray-600 absolute right-0">%</span>
                </div>
              ) : (
                <div className="outline-none py-2.5 title-md w-full text-gray-50 rounded-lg placeholder:text-gray-50 focus:text-gray-80">
                  월 급여의 {savingsRate}% ·{" "}
                  {Number(monthlyIncome * 100 * Number(savingsRate)).toLocaleString()} 원
                </div>
              )}
            </div>
            {isEditing && (
              <p className="caption-md mt-2 text-gray-50">
                · 월 60만원 저축을 목표로 <span className="text-green-500">매주 15만원</span> 저축
                해야해요.
                <br />· 다음 리그부터 수정한 저축액이 반영돼요.
              </p>
            )}
          </div>
        </section>

        {/* Withdraw Section */}
        {!isEditing ? (
          <div className="mt-8 pb-8" onClick={handleWithdraw}>
            <button className=" label-md text-gray-70 underline">회원 탈퇴하기</button>
          </div>
        ) : null}
      </div>

      {/* Submit Button */}
      <div className="px-5 py-4">
        <Button.Default
          disabled={(isEditing && Boolean(nicknameError)) || isMutateLoading}
          onClick={handleSubmit}
          className="w-full"
        >
          {isMutateLoading ? "수정중..." : isEditing ? "수정완료" : "수정하기"}
        </Button.Default>
      </div>
    </div>
  );
}
