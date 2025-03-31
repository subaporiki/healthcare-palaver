
export interface Doctor {
  doctorId: number;
  name: string;
  role: string;
  gender: string;
  description: string;
  experience: number;
  price: number;
  imageURL: string;
  rating?: number;
}

export interface Patient {
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  age?: number;
  gender?: string;
  bloodGroup?: string;
  medicalHistory?: string[];
  appointments?: Appointment[];
  createdAt: Date;
}

export interface Appointment {
  id: string;
  doctorId: number;
  doctorName: string;
  patientId: string;
  patientName: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  type: 'video' | 'clinic';
  paid: boolean;
  amount: number;
}

export interface BloodBank {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  bloodTypes: BloodInventory[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface BloodInventory {
  type: string;
  quantity: number;
  lastUpdated: Date;
}

export interface LabCenter {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  services: string[];
  ratings: number;
  openingHours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
