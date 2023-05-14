import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { FieldValues } from "react-hook-form";

export interface InputType {
  latitude: number;
  longitude: number;
  distance: number;
}

export interface FormData extends FieldValues {
  PointA: InputType;
  PointB: InputType;
  PointC: InputType;
}

export interface MainState {
  formData: FormData;
  setFormData: (formData: FormData) => void;
  trilaterationResult: { latitude: number; longitude: number };
  setTrilaterationResult: (trilaterationResult: {
    latitude: number;
    longitude: number;
  }) => void;
}

export const useMainStore = create<MainState>()(
  devtools(
    persist(
      (set) => ({
        formData: {
          PointA: {
            latitude: 60.1695,
            longitude: 24.9354,
            distance: 81175,
          },
          PointB: {
            latitude: 58.3806,
            longitude: 26.7251,
            distance: 162311,
          },
          PointC: { latitude: 58.3859, longitude: 24.4971, distance: 116932 },
        },
        setFormData: (formData) => {
          set(() => ({ formData: formData }));
        },

        trilaterationResult: {
          latitude: 59.418775152143,
          longitude: 24.753287172291,
        },
        setTrilaterationResult: (trilaterationResult) => {
          set(() => ({ trilaterationResult: trilaterationResult }));
        },
      }),
      {
        name: "main-storage",
      }
    )
  )
);
