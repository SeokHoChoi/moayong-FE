import React from 'react';
import Image from 'next/image';
import { Button } from 'src/components/ui/button';
import success_dragon from 'src/assets/images/success.png'
import { useRouter } from 'next/navigation';

interface SuccessPopupProps {
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ onClose }) => {
  const router = useRouter();
  const handleSuccessPopup = () => {
    onClose();
    router.push('/verif')
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-[16px] w-[320px] h-[480px] flex flex-col items-center justify-center shadow-lg">
        {/* 이미지 자리 */}
        <div className="w-[170px] h-[170px] mb-[32px]">
          <Image
            src={success_dragon}
            alt="Success"
            className="object-cover"
          />
        </div>
        <p className="title-md text-gray-80 text-center mb-4">저축인증이 완료되었습니다!</p>
        <p className="body-md text-gray-80 text-center mb-6">
          오늘 1,345명의 사람들이
          <br></br>
          저축인증을 했어요!
        </p>
        <Button size="medium" onClick={handleSuccessPopup}>
          인증내역 확인하기
        </Button>
      </div>
    </div>
  );
};

export default SuccessPopup;
