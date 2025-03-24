import Image from "next/image";
import dragon2 from "src/assets/images/dragon2.gif";
import { Button } from "src/components/ui/button";
export default function WithdrawPopup({
  handleClosePopup,
  handleConfirm,
}: {
  handleClosePopup: () => void;
  handleConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-[16px] w-[320px] h-[480px] flex flex-col items-center justify-center shadow-lg">
        {/* 이미지 자리 */}
        <div className="w-[170px] h-[170px] mb-[32px]">
          <Image src={dragon2} alt="Success" className="object-cover" />
        </div>
        <p className="title-md text-gray-80 text-center mb-4">정말 탈퇴하시겠어요?</p>
        <p className="body-md text-gray-70 text-center mb-6">
          탈퇴 후 계정은 삭제되며
          <br />
          복구할 수 없어요.
        </p>
        <div className="flex gap-2 flex-col ">
          <Button size="medium" onClick={handleConfirm}>
            그래토 탈퇴할래요
          </Button>
          <Button size="medium" onClick={handleClosePopup} variant="secondary">
            더 써볼래요
          </Button>
        </div>
      </div>
    </div>
  );
}
