import AsyncStorage from "@react-native-async-storage/async-storage";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

// AsyncStorage 어댑터 생성
const asyncStorageAdapter = {
  getItem: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (key: string, value: unknown) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
};

// Jotai에서 사용할 스토리지 생성
export const atomWithAsyncStorage = <T>(key: string, initialValue: T) => {
  return atomWithStorage(
    key,
    initialValue,
    createJSONStorage(() => asyncStorageAdapter),
  );
};
