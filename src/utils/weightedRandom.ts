import { FoodItem, EatenRecord } from '../types/food';

export const calculateItemWeight = (foodId: string, history: EatenRecord[]): number => {
  const timesEaten = history.filter((record) => record.foodId === foodId).length;
  // ยิ่งกินบ่อย ค่าน้ำหนักยิ่งลดลงแบบ Exponential (ลดลง 60% ต่อการกิน 1 ครั้ง)
  const weight = 100 * Math.pow(0.4, timesEaten);
  return Math.max(weight, 5); // กำหนดค่าต่ำสุดไว้ที่ 5% เพื่อไม่ให้หายไปถาวร
};

export const pickWeightedRandomFood = (
  pool: FoodItem[],
  history: EatenRecord[],
  excludeId?: string
): FoodItem => {
  // กรองเมนูที่เพิ่งปัดข้ามไปเมื่อกี้ (ถ้าในลิสต์มีมากกว่า 1 เมนู)
  const filteredPool =
    pool.length > 1 && excludeId ? pool.filter((item) => item.id !== excludeId) : pool;

  const weightedList = filteredPool.map((item) => ({
    item,
    weight: calculateItemWeight(item.id, history),
  }));

  const totalWeight = weightedList.reduce((sum, entry) => sum + entry.weight, 0);
  let randomValue = Math.random() * totalWeight;

  for (const entry of weightedList) {
    if (randomValue < entry.weight) {
      return entry.item;
    }
    randomValue -= entry.weight;
  }

  return weightedList[0].item;
};