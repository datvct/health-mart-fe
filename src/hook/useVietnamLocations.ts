// hooks/useVietnamLocations.ts
import axios from 'axios';
import { useEffect, useState } from 'react';

export interface Ward {
  code: number;
  name: string;
}

export interface District {
  code: number;
  name: string;
  wards: Ward[];
}

export interface Province {
  code: number;
  name: string;
  districts: District[];
}

export function useVietnamLocations() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    axios
      .get<Province[]>("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => {
        setProvinces(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching locations");
        setLoading(false);
      });
  }, []);

  return { provinces, loading, error };
}
