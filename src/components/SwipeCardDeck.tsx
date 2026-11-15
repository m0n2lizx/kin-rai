import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, PanResponder } from 'react-native';
import { useFoodApp } from '../context/FoodContext';
import { calculateItemWeight } from '../utils/weightedRandom';

export const SwipeCardDeck: React.FC = () => {
  const {
    currentFood,
    currentDisplayName,
    isBoxOpened,
    eatenHistory,
    acceptCurrentFood,
    rejectCurrentFood,
  } = useFoodApp();

  const [dragX, setDragX] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);

  if (!isBoxOpened || !currentFood) return null;

  const currentWeight = Math.round(calculateItemWeight(currentFood.id, eatenHistory));

  // รองรับการสัมผัสและลากบนมือถือ
  const handleTouchStart = (e: any) => {
    setStartX(e.nativeEvent.pageX);
  };

  const handleTouchMove = (e: any) => {
    if (startX === null) return;
    setDragX(e.nativeEvent.pageX - startX);
  };

  const handleTouchEnd = () => {
    if (dragX > 80) {
      acceptCurrentFood();
    } else if (dragX < -80) {
      rejectCurrentFood();
    }
    setDragX(0);
    setStartX(null);
  };

  return (
    <View style={styles.container}>
      {/* การ์ดเมนูอาหาร */}
      <View
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={[
          styles.card,
          {
            transform: [
              { translateX: dragX },
              { rotate: `${dragX * 0.05}deg` },
            ],
          },
        ]}
      >
        {/* แสตมป์ตอนกำลังปัด */}
        {dragX > 30 && (
          <View style={[styles.stamp, styles.stampRight]}>
            <Text style={styles.stampTextRight}>กินอันนี้! 💖</Text>
          </View>
        )}
        {dragX < -30 && (
          <View style={[styles.stamp, styles.stampLeft]}>
            <Text style={styles.stampTextLeft}>ข้ามไปก่อน 🙅‍♀️</Text>
          </View>
        )}

        {/* ข้อมูลหัวการ์ด */}
        <View style={styles.cardHeader}>
          <Text style={styles.cardCategory}>
            {currentFood.baseType === 'rice' ? '🍚 เมนูข้าว' : '🍜 เมนูเส้น'}
          </Text>
          <Text style={styles.cardChance}>โอกาสออก: {currentWeight}%</Text>
        </View>

        <Text style={styles.emoji}>{currentFood.emoji}</Text>

        <Text style={styles.foodName}>{currentDisplayName}</Text>

        <Text style={styles.foodDesc} numberOfLines={2}>
          {currentFood.description}
        </Text>

        <View style={styles.tagContainer}>
          <View style={styles.kcalBadge}>
            <Text style={styles.kcalText}>🔥 {currentFood.calories} kcal</Text>
          </View>
          {currentFood.tags.map((tag) => (
            <View key={tag} style={styles.tagBadge}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ปุ่มกดจำลองการปัด */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={rejectCurrentFood}
          style={[styles.actionButton, styles.rejectButton]}
        >
          <Text style={styles.actionButtonText}>✖️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={acceptCurrentFood}
          style={[styles.actionButton, styles.acceptButton]}
        >
          <Text style={styles.actionButtonText}>💖</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.hintText}>ปัดขวาเพื่อเลือก • ปัดซ้ายเพื่อสุ่มใหม่</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  card: {
    width: 290,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    borderWidth: 4,
    borderColor: '#FCE7F3',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    alignItems: 'center',
  },
  stamp: {
    position: 'absolute',
    top: 20,
    zIndex: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 3,
  },
  stampRight: {
    left: 20,
    borderColor: '#10B981',
    transform: [{ rotate: '-12deg' }],
  },
  stampTextRight: {
    color: '#10B981',
    fontWeight: '900',
    fontSize: 14,
  },
  stampLeft: {
    right: 20,
    borderColor: '#EF4444',
    transform: [{ rotate: '12deg' }],
  },
  stampTextLeft: {
    color: '#EF4444',
    fontWeight: '900',
    fontSize: 14,
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardCategory: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#92400E',
  },
  cardChance: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#D97706',
  },
  emoji: {
    fontSize: 56,
    marginVertical: 8,
  },
  foodName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 6,
  },
  foodDesc: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
  },
  kcalBadge: {
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  kcalText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#C2410C',
  },
  tagBadge: {
    backgroundColor: '#FDF2F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#DB2777',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 30,
    marginTop: 18,
  },
  actionButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 3,
    backgroundColor: '#FFFFFF',
  },
  rejectButton: {
    borderWidth: 2,
    borderColor: '#FECDD3',
  },
  acceptButton: {
    backgroundColor: '#10B981',
  },
  actionButtonText: {
    fontSize: 20,
  },
  hintText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 8,
  },
});