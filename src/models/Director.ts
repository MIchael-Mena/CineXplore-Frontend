export interface Member {
  id: number;
  fullName: string;
  birthDate: Date; // ISO string
}

export interface MemberRequest {
  fullName: string;
  birthDate: string; // ISO string
}