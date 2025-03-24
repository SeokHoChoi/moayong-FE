"use client";

import AttendanceCalendar from "src/_components/AttendanceCalendar";
import React, { useCallback, useEffect, useState } from "react";
import Button from "src/_components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import backbar from "src/assets/appbar.svg";
import megaphone from "src/assets/images/icon-megaphone.png";
import fire from "src/assets/images/icon-fire.png";
import calendar from "src/assets/images/icon-calendar.png";
import deco from "src/assets/images/icon-deco.png";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getAttendanceToday, getConsecutiveAttendance, postAttendance } from "src/_api/api";
import { AxiosError } from "axios";
import { useAuth } from "src/_hooks/auth";
const AttendancePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [attendanceDates, setAttendanceDates] = useState<Date[]>([
    new Date(2025, 4, 5),
    new Date(2025, 4, 7),
    new Date(2025, 4, 8),
  ]);
  const [date, setDate] = useState<Date>(new Date());
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  // 출석 정보 가져오기 (초기 로드)
  const { data: consecutiveAttendance, refetch: refetchConsecutiveAttendance } = useQuery({
    queryKey: ["consecutiveAttendance"],
    queryFn: () => getConsecutiveAttendance(user?.id),
    enabled: !!user,
  });

  const { data: attendanceToday, refetch: refetchAttendanceToday } = useQuery({
    queryKey: ["attendanceToday"],
    queryFn: () => getAttendanceToday(user?.id),
    enabled: !!user,
  });

  useEffect(() => {
    if (attendanceToday) {
      setIsChecked(attendanceToday.attended);
    }
  }, [attendanceToday]);

  // 출석체크 postAttendance
  const {
    mutate: mutatePostAttendance,
    isSuccess: isSuccessPostAttendance,
    isError: isErrorPostAttendance,
    error: errorPostAttendance,
  } = useMutation({
    mutationFn: () => postAttendance(user?.id),
  });

  useEffect(() => {
    if (isSuccessPostAttendance) {
      setShowPopup(true);
      setAttendanceDates((prev) => [...prev, new Date()]);
    }

    if (isErrorPostAttendance) {
      const error = errorPostAttendance as AxiosError<{ code: string }>;
      const errorCode = error.response?.data?.code;

      if (error.response?.status === 409 && errorCode === "ALREADY_ATTENDED_TODAY") {
        setShowPopup(true);
      }
    }
  }, [isSuccessPostAttendance, isErrorPostAttendance]);
  // 출석 체크 버튼 핸들러
  const handleAttendanceCheck = async () => {
    if (isChecked) return;

    await mutatePostAttendance();
    refetchConsecutiveAttendance();
    refetchAttendanceToday();
  };

  // 팝업 닫을 때 출석 체크 확정
  const handleClosePopup = () => {
    setShowPopup(false);
    setIsChecked(true); // 팝업 닫을 때 isChecked 적용
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="h-[50px] w-full flex items-center pl-[9px]">
        <button onClick={() => router.push("/")} className="z-10">
          <Image src={backbar} alt="" />
        </button>
        <p className="title-sm text-gray-80 text-center w-full ml-[-36px]">출석체크</p>
      </div>
      {/* Header */}
      <div className="w-[320px] mb-[14px] caption-md py-[18px] px-[14px] bg-gray-10 rounded-[14px] text-gray-90 flex items-center gap-[10px]">
        <Image src={megaphone} alt="" />
        [리그 공지] 리그 종료까지 2시간 10분 남았어요!
      </div>

      {/* Attendance Info */}
      <div className="flex w-full justify-center gap-[12px] mb-[40px]">
        <div className="flex flex-col items-start justify-end pl-[16px] pb-[25px] w-[154px] h-[100px] bg-gray-5 rounded-[16px]">
          <div className="flex gap-[10px] items-center">
            <Image src={calendar} alt="" />
            <div className="flex flex-col items-start">
              <div className="text-gray-60 caption-md">연속 출석일</div>
              <div className="text-gray-70 title-lg">
                {consecutiveAttendance?.currentConsecutiveDate || 0}일
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-end pl-[16px] pb-[25px] w-[154px] h-[100px] bg-gray-5 rounded-[16px]">
          <div className="flex gap-[10px] items-center">
            <Image src={fire} alt="" />
            <div className="flex flex-col items-start">
              <div className="text-gray-60 caption-md">최대 연속 출석일</div>
              <div className="text-danger title-lg">
                {consecutiveAttendance?.maxConsecutiveDate || 0}일
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="mx-auto flex items-center w-[320px]">
        <AttendanceCalendar
          attendanceDates={attendanceDates}
          currentDate={date}
          setDate={setDate}
        />
      </div>

      <Button.Default
        size={"large"}
        onClick={handleAttendanceCheck}
        className="fixed bottom-[20px]"
        disabled={isChecked} // 팝업 확인을 누르기 전까지 활성화됨
      >
        {isChecked ? "내일 다시 만나요!" : "출석 체크 도장 찍기 +5p"}
      </Button.Default>

      {showPopup && (
        <div className="z-10 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-gray-0 w-[262px] h-[232px] rounded-[16px] flex flex-col items-center justify-end relative">
            <Image src={deco} alt="출석 완료" className="mx-auto mb-4 absolute top-[-43%]" />
            <p className="title-md text-gray-40">출석 체크 완료!</p>
            <p className="title-lg text-gray-80 mt-[14px]">5p를 받았어요</p>
            <button
              onClick={handleClosePopup}
              className="text-green-50 title-xs mb-[25px] mt-[33px]"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendancePage;
