interface Hospital {
  id: number;
  name: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

interface HospitalData {
  id: number;
  hospital_id: number;
  cumulative_local: number;
  cumulative_foreign: number;
  treatment_local: number;
  treatment_foreign: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  cumulative_total: number;
  treatment_total: number;
  hospital: Hospital;
}

export interface PCRData {
  date: string;
  count: number;
}

export interface JSONInput {
  success: boolean;
  message: string;
  data: {
    update_date_time: string;
    local_new_cases: number;
    local_total_cases: number;
    local_total_number_of_individuals_in_hospitals: number;
    local_deaths: number;
    global_new_cases: number;
    global_total_cases: number;
    global_deaths: number;
    global_recovered: number;
    hospital_data: HospitalData[];
    total_pcr_testing_count: number;
    daily_pcr_testing_data: PCRData[];
    local_recovered: number;
  };
}
