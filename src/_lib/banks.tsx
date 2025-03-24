// 모든 은행 이미지 불러오기
import ibk from "src/assets/images/banks/ibk.png";
import hana from "src/assets/images/banks/hana.png";
import toss from "src/assets/images/banks/toss.png";
import kbank from "src/assets/images/banks/kbank.png";
import kakaobank from "src/assets/images/banks/kakaobank.png";
import woori from "src/assets/images/banks/woori.png";
import shinhan from "src/assets/images/banks/shinhan.png";
import kb from "src/assets/images/banks/kb.png";

export const BANKS = [
  {
    name: "국민은행",
    image: kb,
    code: "KB",
  },
  {
    name: "신한은행",
    image: shinhan,
    code: "SHINHAN",
  },
  {
    name: "우리은행",
    image: woori,
    code: "WOORI",
  },
  {
    name: "하나은행",
    image: hana,
    code: "HANA",
  },
  {
    name: "카카오뱅크",
    image: kakaobank,
    code: "KAKAO_BANK",
  },
  {
    name: "케이뱅크",
    image: kbank,
    code: "K_BANK",
  },
  {
    name: "토스뱅크",
    image: toss,
    code: "TOSS_BANK",
  },
  {
    name: "IBK기업은행",
    image: ibk,
    code: "IBK",
  },
];
