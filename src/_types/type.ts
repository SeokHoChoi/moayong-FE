export type UserType = {
  username: string;
  password: string;
};

export interface LeagueMemberResponse {
  id: number;
  userId: number;
  username: string;
  leagueId: number;
  status: LeagueMemberStatus;
  totalScore: number;
  goalAmount: number;
}
export interface MemberRankingResponse {
  memberId: number;
  nickname: string;
  promotionStatus: PromotionStatus;
  rank: number;
  rate: number;
  userId: number;
  totalScore: number;
}

export enum LeagueMemberStatus {
  ACTIVE,
  INACTIVE,
}

// Auth Types
export interface OnboardingRequest {
  name: string;
  nickname: string;
  savingsBank: string;
  monthlySalary: number;
  savingsRate: number;
  accountNumber: string;
}

// User Types
export interface UserResponse {
  id: number;
  provider: string;
  email: string;
  name: string;
  nickname: string;
  monthlySalary: number;
  savingsRate: number;
  savingsBank: string;
  accountNumber: number;
}

export interface UserPutRequest {
  nickname: string;
  monthlySalary: number;
  savingsRate: number;
}

export interface UserAccountPutRequest {
  savingsBank: string;
  savingsAmount: number;
  accountNumber: number;
}

// League Types
export interface LeagueResponse {
  id: number;
  seasonId: number;
  level: number;
  name: string;
  imageUrl: string;
  promotionRate: number;
  relegationRate: number;
}

// Verification Types
export interface VerificationRequest {
  bank: string;
}

export interface VerificationStatus {
  status: "PENDING" | "COMPLETED" | "FAILED";
}

export interface VerificationResult {
  success: boolean;
  message: string;
  data: unknown;
}

// Quiz Types
export interface Quiz {
  id: number;
  financeTitle: string;
  financeDescription: string;
  sourceTitle: string;
  sourceLink: string;
  createdAt: string;
}
export interface Problem {
  id: number;
  problemTitle: string;
  problemOptions: string[];
}

// Savings Types
export interface SavingsTransaction {
  id: number;
  type: "DEPOSIT" | "WITHDRAWAL";
  amount: number;
  balance: number;
  datetime: string;
  imageUrl?: string;
}

// Member Types
export interface LeagueMember {
  id: number;
  userId: number;
  leagueId: number;
  username: string;
  totalScore: number;
  rank: number;
}

// Match Types
export interface MatchResponse {
  memberId: number;
  leagueId: number;
  totalScore: number;
  goalAmount: number;
  rank: number;
  rate: number;
  nextLevel: number;
  promotionStatus: PromotionStatus;
}

export enum PromotionStatus {
  PROMOTION = "PROMOTION", // 승급
  RELEGATION = "RELEGATION", // 강등
  SUSPENDED = "SUSPENDED", // 정지
}

export interface AttendanceResponse {
  attended: boolean;
}

export interface QuizSubmissionResponse {
  userAnswer: number;
  status: "CORRECT" | "WRONG";
  answerNumber: number;
  answerDescription: string;
}

export interface QuizKnowledgeResponse {
  id: number;
  financeTitle: string;
  financeDescription: string;
  sourceTitle?: string;
  sourceLink?: string;
}

export interface SeasonResponse {
  id: number;
  status: "OPEN" | "CLOSED";
  startedAt: string;
  endedAt: string;
}

export enum SeasonStatus {
  OPEN,
  CLOSED,
}
