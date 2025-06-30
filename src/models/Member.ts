export interface Member {
  id?: number;
  fullName: string;
  birthDate: string | null; // ISO string
}

/* export interface MemberRequest {
  fullName: string;
  birthDate: string | null; // ISO string
}
 */

export interface Actor {
  actorId?: number;
  fullName: string;
  birthDate: string | null; // ISO string
}

export interface Director {
  directorId?: number;
  fullName: string;
  birthDate: string | null; // ISO string
}
