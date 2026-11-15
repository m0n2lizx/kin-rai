import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { useFoodApp } from '../context/FoodContext';

export const DishGachaBox: React.FC = () => {
  const { isBoxOpening, isBoxOpened, triggerGacha } = useFoodApp();

  if (isBoxOpened) return null; // ซ่อนกล่องเมื่อเปิดออกเป็นการ์ดปัด

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={triggerGacha}
        disabled={isBoxOpening}
        style={[styles.boxCard, isBoxOpening && styles.boxShaking]}
      >
        {/* ไอคอนกล่องสุ่มอาหารสุดคิ้วท์ */}
        <Text style={styles.boxEmoji}>🍛✨</Text>
        <Text style={styles.boxTitle}>จานข้าวสุ่มกาชา</Text>
        <Text style={styles.boxSubtitle}>แตะเพื่อเปิดฝาลุ้นเมนูเด็ด!</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={triggerGacha}
        disabled={isBoxOpening}
        style={[styles.gachaButton, isBoxOpening && styles.buttonDisabled]}
      >
        <Text style={styles.gachaButtonText}>
          {isBoxOpening ? '✨ กำลังปรุงเมนู...' : '🍽️ เปิดจานสุ่มเลย!'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  boxCard: {
    width: 220,
    height: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#FDE4CF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F4A261',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
    padding: 16,
  },
  boxShaking: {
    transform: [{ scale: 1.05 }],
    borderColor: '#FB6F92',
  },
  boxEmoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#374151',
    marginBottom: 2,
  },
  boxSubtitle: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  gachaButton: {
    marginTop: 16,
    backgroundColor: '#F97316',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  gachaButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
});