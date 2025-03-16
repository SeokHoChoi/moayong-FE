// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import onboarding1 from 'src/assets/images/onboarding1.png';
// import onboarding2 from 'src/assets/images/onboarding2.png';
// import onboarding3 from 'src/assets/images/onboarding3.png';

// const OnboardingSlider = () => {
//   const router = useRouter();
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const images = [
//     onboarding1,
//     onboarding2,
//     onboarding3,
//   ]; // 온보딩 이미지 경로

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 2000); // 2초마다 이미지 변경

//     // 마지막 이미지 후 메인 페이지로 리다이렉트
//     if (currentImageIndex === images.length - 1) {
//       clearInterval(timer);
//       setTimeout(() => {
//         router.push('/');
//       }, 2000);
//     }

//     return () => clearInterval(timer);
//   }, [currentImageIndex, images.length, router]);

//   return (
//     <div className="w-full h-screen flex items-center justify-center">
//       <Image
//         src={images[currentImageIndex]}
//         alt={`Onboarding ${currentImageIndex + 1}`}
//         width={300} // 적절한 width 값 설정
//         height={400} // 적절한 height 값 설정
//       />
//     </div>
//   );
// };

// export default OnboardingSlider;
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import onboarding1 from 'src/assets/images/onboarding1.png';
import onboarding2 from 'src/assets/images/onboarding2.png';
import onboarding3 from 'src/assets/images/onboarding3.png';

const OnboardingSlider = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [onboarding1, onboarding2, onboarding3];

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % images.length;
      if (nextIndex === 0) {
        router.push('/');
      }
      return nextIndex;
    });
  };

  const handleSkipClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    router.push('/');
  };

  return (
    <div className="w-[360px] h-screen flex items-center justify-center relative">
      <button
        onClick={handleSkipClick}
        className="absolute top-8 right-4 text-white w-10 h-10 rounded flex items-center justify-center z-10 opacity-0"
      >
        X
      </button>
      <div onClick={handleImageClick} className="cursor-pointer">
        <Image
          src={images[currentImageIndex]}
          alt={`Onboarding ${currentImageIndex + 1}`}
        />
      </div>
    </div>
  );
};

export default OnboardingSlider;
