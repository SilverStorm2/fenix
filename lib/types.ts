export interface User {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

export interface Training {
  id: string;
  token: string;
  trainingDate: string;
  trainingTime: string;
  groupId: string;
  notes?: string;
  group: {
    name: string;
  };
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  jerseyNumber?: number;
}

export interface AttendanceRecord {
  id: string;
  status: "will_attend" | "will_not_attend";
  respondedAt: Date;
}
