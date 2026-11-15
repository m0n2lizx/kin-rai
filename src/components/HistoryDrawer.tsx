import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useFoodApp } from '../context/FoodContext';
import { MENU_DATA } from '../data/menuData';
import { calculateItemWeight } from '../utils/weightedRandom';

export const HistoryDrawer: React.FC = () => {
  const { eatenHistory, clearHistory } = useFoodApp();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <Text style={styles.titleText}>📔 บันทึกมื้ออร่อยของคุณ</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{eatenHistory.length} มื้อ</Text>
          </View>
        </View>
        {eatenHistory.length > 0 && (
          <TouchableOpacity onPress={clearHistory}>
            <Text style={styles.clearText}>ล้างประวัติ</Text>
          </TouchableOpacity>
        )}
      </View>

      {eatenHistory.length === 0 ? (
        <Text style={styles.emptyText}>
          ยังไม่มีประวัติการกินเลย ลองเปิดจานสุ่มแล้วเลือกดูสิงับ! ✨
        </Text>
      ) : (
        <ScrollView style={styles.listScroll} nestedScrollEnabled>
          {eatenHistory.map((record) => {
            const foodInfo = MENU_DATA.find((m) => m.id === record.foodId);
            const nextChance = foodInfo
              ? Math.round(calculateItemWeight(foodInfo.id, eatenHistory))
              : 100;

            return (
              <View key={record.recordId} style={styles.historyItem}>
                <View style={styles.itemLeft}>
                  <Text style={styles.itemEmoji}>{record.emoji}</Text>
                  <View>
                    <Text style={styles.itemName}>{record.displayName}</Text>
                    <Text style={styles.itemTime}>บันทึกเมื่อ {record.eatenAt} น.</Text>
                  </View>
                </View>
                <View style={styles.chanceBadge}>
                  <Text style={styles.chanceText}>โอกาสออก {nextChance}%</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 24, padding: 16, marginTop: 20, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  titleGroup: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  titleText: { fontWeight: '800', fontSize: 14, color: '#1F2937' },
  badge: { backgroundColor: '#FFEDD5', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  badgeText: { fontSize: 11, color: '#EA580C', fontWeight: 'bold' },
  clearText: { fontSize: 11, color: '#F43F5E', textDecorationLine: 'underline' },
  emptyText: { fontSize: 12, color: '#9CA3AF', textAlign: 'center', paddingVertical: 16 },
  listScroll: { maxHeight: 180 },
  historyItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFBEB', padding: 10, borderRadius: 16, marginBottom: 8 },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  itemEmoji: { fontSize: 24 },
  itemName: { fontWeight: 'bold', fontSize: 13, color: '#374151' },
  itemTime: { fontSize: 10, color: '#9CA3AF' },
  chanceBadge: { backgroundColor: '#FFF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: '#FCE7F3' },
  chanceText: { fontSize: 10, fontWeight: 'bold', color: '#EC4899' },
});