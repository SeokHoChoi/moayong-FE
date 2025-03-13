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

export enum LeagueMemberStatus {
  ACTIVE,
  INACTIVE,
}
