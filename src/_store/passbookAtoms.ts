import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const selectedImageAtom = atom<string | null>(null);
export const accountNumberAtom = atom<string>('');
export const balanceAtom = atom<number>(0);
export const isLoadingAtom = atom<boolean>(false);
export const isVerifiedAtom = atomWithStorage<boolean>('isVerified', false);
export const ocrResultAtom = atom<{
  accountNumber: string;
  bankBalance: string;
  transactionDate: string | number;
  transactionAmount: string | number;
  senderName: string;
  highlightBoxes: Array<{ x: number; y: number; width: number; height: number }>;
} | null>(null);

// 파생 원자 (읽기 전용)
export const formattedBalanceAtom = atom((get) => {
  const balance = get(balanceAtom);
  return balance.toLocaleString() + ' 원';
});

export const formattedTransactionAmountAtom = atom((get) => {
  const result = get(ocrResultAtom);
  if (!result?.transactionAmount) return '0 원';
  return Number(result.transactionAmount).toLocaleString() + ' 원';
});

export const formattedTransactionDateAtom = atom((get) => {
  const result = get(ocrResultAtom);
  if (!result?.transactionDate) return '';

  const formattedDate = new Date(result.transactionDate).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return formattedDate;
});

// 업데이트를 위한 원자 (쓰기 가능)
export const updatePassbookDataAtom: any = atom(
  null,
  (get, set, data: { imageDataURL: string; ocrResult: any; isVerified: boolean }) => {
    const { imageDataURL, ocrResult, isVerified } = data;
    set(selectedImageAtom, imageDataURL);
    set(ocrResultAtom, {
      accountNumber: ocrResult.accountNumber,
      bankBalance: ocrResult.bankBalance,
      transactionDate: ocrResult.transactionDate || '',
      transactionAmount: ocrResult.transactionAmount || '',
      senderName: ocrResult.senderName || '',
      highlightBoxes: ocrResult.highlightBoxes || [],
    });
    set(accountNumberAtom, ocrResult.accountNumber);
    set(balanceAtom, parseInt(ocrResult.bankBalance));
    set(isVerifiedAtom, isVerified); // 인증 완료 상태 업데이트
  }
);
