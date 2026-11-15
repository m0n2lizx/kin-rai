import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFoodApp } from '../context/FoodContext';
import { CarbType, NoodleSubType } from '../types/food';
import { soundFX } from '../utils/soundEffects';

const NOODLE_TYPES: NoodleSubType[] = ['all', 'เส้นใหญ่', 'เส้นเล็ก', 'บะหมี่', 'วุ้นเส้น', 'เส้นหมี่'];

export const FilterBar: React.FC = () => {
  const { carbType, setCarbType, noodleType, setNoodleType, resetBox } = useFoodApp();

  const handleCarbChange = (type: CarbType) => {
    soundFX.playPop(480);
    setCarbType(type);
    resetBox();
  };

  const handleNoodleChange = (sub: NoodleSubType) => {
    soundFX.playPop(540);
    setNoodleType(sub);
  };

  return (
    <View style={styles.wrapper}>
      {/* แท็บเลือกประเภทหลัก */}
      <View style={styles.tabContainer}>
        {[
          { id: 'all', label: '🍱 อะไรก็ได้' },
          { id: 'rice', label: '🍚 เมนูข้าว' },
          { id: 'noodle', label: '🍜 เมนูเส้น' },
        ].map((tab) => {
          const isActive = carbType === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => handleCarbChange(tab.id as CarbType)}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* แท็บเลือกชนิดเส้นย่อย */}
      {carbType === 'noodle' && (
        <View style={styles.subFilterContainer}>
          {NOODLE_TYPES.map((sub) => {
            const isActive = noodleType === sub;
            return (
              <TouchableOpacity
                key={sub}
                onPress={() => handleNoodleChange(sub)}
                style={[styles.subButton, isActive && styles.activeSubButton]}
              >
                <Text style={[styles.subText, isActive && styles.activeSubText]}>
                  {sub === 'all' ? '✨ สุ่มเส้นให้หน่อย' : sub}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { width: '100%', marginBottom: 16 },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    padding: 4,
    borderRadius: 16,
  },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
  activeTabButton: { backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  tabText: { fontSize: 13, fontWeight: 'bold', color: '#92400E' },
  activeTabText: { color: '#EA580C' },
  subFilterContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6, marginTop: 10 },
  subButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#FBCFE8', backgroundColor: '#FFF' },
  activeSubButton: { backgroundColor: '#F472B6', borderColor: '#F472B6' },
  subText: { fontSize: 11, fontWeight: '600', color: '#DB2777' },
  activeSubText: { color: '#FFF' },
});