import React, { createContext, useContext, useState, useMemo } from 'react';
import { CarbType, NoodleSubType, FoodItem, EatenRecord, UserProfile } from '../types/food';
import { MENU_DATA } from '../data/menuData';
import { pickWeightedRandomFood } from '../utils/weightedRandom';
import { soundFX } from '../utils/soundEffects';

interface FoodContextType {
  user: UserProfile | null;
  login: (name: string, pass: string) => boolean;
  logout: () => void;
  carbType: CarbType;
  setCarbType: (type: CarbType) => void;
  noodleType: NoodleSubType;
  setNoodleType: (type: NoodleSubType) => void;
  currentFood: FoodItem | null;
  currentDisplayName: string;
  isBoxOpening: boolean;
  isBoxOpened: boolean;
  eatenHistory: EatenRecord[];
  triggerGacha: () => void;
  acceptCurrentFood: () => void;
  rejectCurrentFood: () => void;
  resetBox: () => void;
  clearHistory: () => void;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // เก็บข้อมูลผู้ใช้ที่เคยสมัครไว้ในเซสชันนี้ (จำลองแบบ Local State)
  const [registeredUser, setRegisteredUser] = useState<UserProfile | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = (name: string, pass: string): boolean => {
    const trimmedName = name.trim();
    const trimmedPass = pass.trim();

    if (!trimmedName || !trimmedPass) return false;

    // ถ้ายังไม่เคยมีบัญชีในระบบ ให้ถือเป็นการสมัครสมาชิกและเข้าสู่ระบบทันที
    if (!registeredUser) {
      const newUser = { name: trimmedName, password: trimmedPass };
      setRegisteredUser(newUser);
      setUser(newUser);
      soundFX.playPop(600);
      return true;
    }

    // ถ้ามีบัญชีแล้ว ให้ตรวจสอบ Username และ Password
    if (registeredUser.name === trimmedName && registeredUser.password === trimmedPass) {
      setUser(registeredUser);
      soundFX.playPop(600);
      return true;
    }

    soundFX.playPop(300);
    return false; // รหัสผ่านหรือชื่อไม่ถูกต้อง
  };

  const logout = () => {
    soundFX.playPop(300);
    setUser(null);
  };

  const [carbType, setCarbType] = useState<CarbType>('all');
  const [noodleType, setNoodleType] = useState<NoodleSubType>('all');
  const [currentFood, setCurrentFood] = useState<FoodItem | null>(null);
  const [isBoxOpening, setIsBoxOpening] = useState(false);
  const [isBoxOpened, setIsBoxOpened] = useState(false);
  const [eatenHistory, setEatenHistory] = useState<EatenRecord[]>([]);

  const availablePool = useMemo(() => {
    if (carbType === 'all') return MENU_DATA;
    return MENU_DATA.filter((item) => item.baseType === carbType);
  }, [carbType]);

  const currentDisplayName = useMemo(() => {
    if (!currentFood) return '';
    if (currentFood.baseType === 'noodle' && noodleType !== 'all') {
      return `${currentFood.name} (${noodleType})`;
    }
    if (currentFood.baseType === 'noodle' && noodleType === 'all') {
      const randomSub = ['เส้นเล็ก', 'เส้นใหญ่', 'บะหมี่', 'วุ้นเส้น'][Math.floor(Math.random() * 4)];
      return `${currentFood.name} (${randomSub})`;
    }
    return currentFood.name;
  }, [currentFood, noodleType]);

  const triggerGacha = () => {
    if (isBoxOpening) return;
    soundFX.playPop(400);
    setIsBoxOpened(false);
    setIsBoxOpening(true);

    const chosen = pickWeightedRandomFood(availablePool, eatenHistory, currentFood?.id);

    setTimeout(() => {
      setCurrentFood(chosen);
      setIsBoxOpening(false);
      setIsBoxOpened(true);
      soundFX.playGachaOpen();
    }, 900);
  };

  const acceptCurrentFood = () => {
    if (!currentFood) return;
    soundFX.playPop(680);

    const newRecord: EatenRecord = {
      recordId: Date.now().toString(),
      foodId: currentFood.id,
      displayName: currentDisplayName,
      emoji: currentFood.emoji,
      eatenAt: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
    };

    setEatenHistory((prev) => [newRecord, ...prev]);
    setIsBoxOpened(false);
    setCurrentFood(null);
  };

  const rejectCurrentFood = () => {
    soundFX.playPop(300);
    triggerGacha();
  };

  const resetBox = () => {
    setIsBoxOpened(false);
    setCurrentFood(null);
  };

  const clearHistory = () => {
    setEatenHistory([]);
  };

  return (
    <FoodContext.Provider
      value={{
        user,
        login,
        logout,
        carbType,
        setCarbType,
        noodleType,
        setNoodleType,
        currentFood,
        currentDisplayName,
        isBoxOpening,
        isBoxOpened,
        eatenHistory,
        triggerGacha,
        acceptCurrentFood,
        rejectCurrentFood,
        resetBox,
        clearHistory,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFoodApp = () => {
  const ctx = useContext(FoodContext);
  if (!ctx) throw new Error('useFoodApp must be used within a FoodProvider');
  return ctx;
};