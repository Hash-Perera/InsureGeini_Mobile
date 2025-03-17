export interface Location {
  latitude: number;
  longitude: number;
}

export interface Claim {
  _id?: string;
  insuranceId?: string;
  nicNo?: string;
  drivingLicenseNo?: string;
  damagedAreas?: string[];
  location?: Location;
  userId?: string;
  status?: "Pending" | "Approved" | "Rejected";
  insuranceFront?: string;
  insuranceBack?: string;
  nicFront?: string;
  nicBack?: string;
  drivingLicenseFront?: string;
  drivingLicenseBack?: string;
  driverFace?: string;
  frontLicencePlate?: string;
  backLicencePlate?: string;
  damageImages?: string[];
  createdAt?: string;
}

export interface Report {
  userId: string;
  claimId: string;
  audioToTextConvertedContext: string;
  status: "Approved" | "Pending" | "Rejected"; // Adjust as needed
  createdAt: Date;
  __v: number;
  decisionReport: string;
  estimation_approved: number;
  estimation_requested: number;
  incidentReport: string;
  reason: string;
}
