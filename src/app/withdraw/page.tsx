"use client";
import { TopBarWithCloseButton } from "src/_components/TopBarWithCloseButton";
import { cn } from "src/_lib/utils";
import { useState } from "react";
import { Checkbox, CheckboxIndicator } from "@radix-ui/react-checkbox";
import { CheckCheckIcon, CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Popup from "./WithdrawPopup";
import WithdrawPopup from "./WithdrawPopup";

function WithdrawPage() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const onClickWithdrawButton = () => {
    setShowPopup(true);
  };

  // TODO:구현
  // const { mutate: mutateWithdraw } = useMutation({
  //   mutationFn: () => {
  //     return withdraw();
  //   },
  // });
  const handleWithdraw = () => {
    alert("탈퇴 처리가 완료되었어요");
    router.push("/login");
  };

  return (
    <div className="flex flex-col gap-4">
      <TopBarWithCloseButton title="회원 탈퇴" />
      <div className="flex flex-col gap-4 px-5">
        <h3 className="pt-6 pb-4 title-sm">회원 탈퇴 신청 시 아래 내용을 반드시 확인해주세요.</h3>

        <section className="flex flex-col gap-2 bg-gray-5 rounded-lg px-5 py-4">
          <h3 className="title-xs text-gray-80 pb-4">탈퇴 시 삭제되는 내용</h3>
          <div className="body-sm text-gray-80">
            <p>(샘플)회원탈퇴를 진행하면 아래 데이터가 영구적으로 삭제됩니다.</p>
            <br />
            <div className="font-medium">계정 정보</div>
            <ul className="list-disc list-inside ml-1">
              <li>프로필 정보 (이름, 이메일, 연락처 등)</li>
              <li>로그인 기록 및 인증 정보</li>
            </ul>
            <br />
            <div className="font-medium">이용 내역 및 데이터</div>
            <ul className="list-disc list-inside ml-1">
              <li>서비스 이용 기록 (설정, 맞춤 추천 정보 등)</li>
              <li>
                결제 및 주문 내역 (법적 보관 기간이 필요한 경우 일부 데이터는 일정 기간 보관될 수
                있음)
              </li>
            </ul>
          </div>
        </section>

        <section className="flex flex-col gap-2 bg-gray-5 rounded-lg px-5 py-4">
          <h3 className="title-xs text-gray-80">탈퇴 시 보관 또는 유지되는 항목</h3>

          <div className="body-sm text-gray-80">
            <div>(샘플)회원탈퇴를 진행하면 아래 데이터가 영구적으로 삭제됩니다.</div>
            <br />
            <div className="font-medium">계정 정보</div>
            <ul className="list-disc list-inside ml-1">
              <li>프로필 정보 (이름, 이메일, 연락처 등)</li>
              <li>로그인 기록 및 인증 정보</li>
            </ul>
            <br />
            <div className="font-medium">이용 내역 및 데이터</div>
            <ul className="list-disc list-inside ml-1">
              <li>서비스 이용 기록 (설정, 맞춤 추천 정보 등)</li>
              <li>
                결제 및 주문 내역 (법적 보관 기간이 필요한 경우 일부 데이터는 일정 기간 보관될 수
                있음)
              </li>
            </ul>
          </div>
        </section>
        <section className="pb-7">
          <div
            className={cn(
              "border-radius-16 border  p-4 rounded-2xl cursor-pointer",
              isChecked ? "border-green-50" : "border-[#CDD1D5]"
            )}
            onClick={() => setIsChecked(!isChecked)}
          >
            <div className="body-sm text-gray-80 flex justify-between items-center ">
              <p>(필수) 위 내용을 모두 확인했습니다.</p>
              <div className="flex justify-center items-center">
                <Checkbox
                  className={cn("w-5 h-5 rounded-[4px]", isChecked ? "bg-green-50" : "bg-gray-10")}
                >
                  <CheckIcon className="w-5 h-5" color={isChecked ? "white" : "transparent"} />
                </Checkbox>
              </div>
            </div>
          </div>

          <div className="body-sm text-gray-80 pt-3">
            <div className="border-radius-16 border p-4 rounded-2xl bg-gray-5 body-sm text-gray-80">
              <div className="border-b border-[#CDD1D5] pb-4">아이디</div>
              <div className="body-sm text-gray-80 pt-4">이 메 일 kimmoa@gmail.com</div>
            </div>
          </div>
        </section>
        <div className="flex  gap-2 pb-8">
          <div
            className="flex-1 border-radius-16 border p-4 rounded-2xl body-sm text-green-70 text-center border-green-60 cursor-pointer"
            onClick={() => router.back()}
          >
            취소하기
          </div>

          <div
            onClick={onClickWithdrawButton}
            className={cn(
              "flex-1 border-radius-16 border p-4 rounded-2xl bg-gray-5 body-sm text-gray-80 text-center",
              isChecked
                ? "bg-green-50 text-white cursor-pointer"
                : "bg-gray-5 text-gray-60 cursor-not-allowed"
            )}
          >
            탈퇴하기
          </div>
        </div>
      </div>
      {showPopup && (
        <WithdrawPopup
          handleClosePopup={() => setShowPopup(false)}
          handleConfirm={handleWithdraw}
        />
      )}
    </div>
  );
}

export default WithdrawPage;
