'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "src/_components/Button";
import backbar from 'src/assets/appbar.svg';
import equal from 'src/assets/icon-equal.svg';
import megaphone from 'src/assets/images/megaphone.png';
import laptop from 'src/assets/images/laptop.png';
import verif from 'src/assets/images/verif.png';
import non_verif from 'src/assets/images/non-verif.png';
import { useAtom } from "jotai";
import { isVerifiedAtom } from "src/_store/passbookAtoms";

const VerifPage = () => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useAtom(isVerifiedAtom);

  // 그래프 데이터
  const targetAmount = 200000; // 목표 금액
  const currentAmount = 100000; // 현재 금액
  const percentage = Math.round((currentAmount / targetAmount) * 100); // 퍼센트 계산

  return (
    <div className="bg-gray-5 h-full pb-10">
      <div className='h-[50px] w-full flex items-center pl-[9px] bg-gray-0 mb-4'>
        <button onClick={() => router.push('/')} className='z-10'>
          <Image src={backbar} alt="" />
        </button>
        <p className='title-sm text-gray-80 text-center w-full ml-[-36px]'>저축인증</p>
      </div>
      <div className="px-5">
        <div className="bg-gray-10 rounded-[14px] h-[52px] flex justify-center items-center mx-auto gap-[10px] mb-[30px]">
          <Image src={megaphone} alt="" />
          <p className="caption-md">[리그 공지] 리그 종료까지 2시간 10분 남았어요!</p>
        </div>

        <p className="title-md mb-6 pl-[4px]">김모아님의 저축현황</p>

        {!isVerified &&
          <div className="h-[100px] shadow-[0px_0px_0px_0px_rgba(0,0,0,0),0px_4px_4px_0px_rgba(0,0,0,0)] bg-white rounded-[16px] flex items-center justify-center gap-[27px] mb-4">
            <div className="flex flex-col justify-center items-center gap-[11px]">
              <p className="label-md text-gray-80">누적 저축금액</p>
              <p className="title-xs text-purple-30">2,500,00원</p>
            </div>
            <Image src={equal} alt="=" />
            <div className="flex flex-col justify-center items-center h-full gap-[2px]">
              <p className="label-md text-gray-80 h-[41%] flex flex-col justify-end">아이맥 최신형</p>
              <Image src={laptop} alt="상품 이미지" className="h-[59%] object-contain object-top" />
            </div>
          </div>
        }
        {/* 그래프 섹션 */}
        <div className="h-[284px] shadow-[0px_0px_0px_0px_rgba(0,0,0,0),0px_4px_4px_0px_rgba(0,0,0,0)] bg-white rounded-[16px] flex flex-col items-center mb-6 p-6">
          <div className="flex items-center justify-between w-full mb-[40px]">
            <p className="title-sm text-gray-90">이번 주 저축률</p>
            <p className="body-sm text-gray-90">목표금액:<span>200,000</span>원</p>
          </div>
          {/* 원형 그래프 */}
          <div className="relative w-[170px] h-[170px]">
            {/* 배경 원 */}
            <svg className="absolute top-0 left-0 w-full h-full">
              <circle
                cx="85" cy="85"
                r="72.8" // 크기 조절
                className="stroke-[#E6E8EA]"
                fill="none"
                strokeWidth="23.8"
              />
            </svg>
            {/* 진행 원 */}
            <svg className="absolute top-0 left-0 w-full h-full">
              <circle
                cx="85" cy="85"
                r="72.8"
                className="stroke-green-40"
                fill="none"
                strokeWidth="23.8"
                strokeLinecap="round"
                strokeDasharray={`${Math.PI * 2 * 72.8}`}
                strokeDashoffset={`${Math.PI * 2 * 72.8 - (Math.PI * 2 * 72.8 * percentage) / 100}`}
                style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}
              />
            </svg>
            {/* 중앙 텍스트 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p id="percentage" className="title-xl">{`${percentage}%`}</p>
              <p className="caption-sm text-gray-50 mt-[6px]">현재금액</p>
              <p id="current-amount" className="label-md text-gray-70 text-center">{`${currentAmount.toLocaleString()}원`}</p>
            </div>
            <div className="caption-sm absolute right-[-6px] bottom-2">20만원</div>
          </div>
        </div>


        {/* 인증 버튼 */}
        <div className="w-full mx-auto flex justify-center">
          <Button.Icon onClick={() => router.push('/passbook-verif')} disabled={isVerified}>저축 인증하기</Button.Icon>
        </div>

        {/* 인증 상태 */}
        <div className="
        h-[176px] shadow-[0px_0px_0px_0px_rgba(0,0,0,0),0px_4px_4px_0px_rgba(0,0,0,0)] bg-white rounded-[16px]
        pl-[33px] pt-[35px] pr-[37px] pb-[36px] mt-6 flex gap-[30px]
        ">
          <div className="w-20 h-20">
            {isVerified ? <Image src={verif} alt="" /> : <Image src={non_verif} alt="" />}
          </div>
          <div className="w-[140px] h-[105px]">
            <p className="label-lg mb-1">저축내역</p>
            <p className="caption-md text-gray-40 mb-2">2025.1.1 ~ 2025.1.7</p>
            <p className="caption-md text-gray-70 mb-1">목표금액:<span>100,000</span>원</p>
            <p className="caption-md text-gray-70 mb-1">저축금액:<span>100,000</span>원</p>
            <p className="caption-md text-gray-70">누적금액:<span>100,000</span>원</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifPage;
