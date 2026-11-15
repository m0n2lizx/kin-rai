export type CarbType = 'all' | 'rice' | 'noodle';

export type NoodleSubType = 'all' | 'เส้นใหญ่' | 'เส้นเล็ก' | 'บะหมี่' | 'วุ้นเส้น' | 'เส้นหมี่';

export interface FoodItem {
  id: string;
  name: string;
  baseType: 'rice' | 'noodle';
  emoji: string;
  calories: number;
  tags: string[];
  description: string;
}

export interface EatenRecord {
  recordId: string;
  foodId: string;
  displayName: string; // เก็บชื่อเต็มรวมชนิดเส้น เช่น "ก๋วยเตี๋ยวต้มยำ (เส้นเล็ก)"
  emoji: string;
  eatenAt: string;     // เวลาที่กดเลือกกิน
}
export interface UserProfile {
  name: string;
  password?: string;
}