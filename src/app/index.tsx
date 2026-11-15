import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FoodProvider, useFoodApp } from '../context/FoodContext';
import { LandingScreen } from '../components/LandingScreen';
import { AuthScreen } from '../components/AuthScreen';
import { FilterBar } from '../components/FilterBar';
import { DishGachaBox } from '../components/DishGachaBox';
import { SwipeCardDeck } from '../components/SwipeCardDeck';
import { HistoryDrawer } from '../components/HistoryDrawer';

function MainAppContent() {
  const { user, logout } = useFoodApp();
  const [hasStarted, setHasStarted] = useState(false);

  // 1. หน้า Landing Page
  if (!hasStarted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LandingScreen onStartApp={() => setHasStarted(true)} />
      </SafeAreaView>
    );
  }

  // 2. หน้าล็อกอิน / สมัครสมาชิก
if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AuthScreen onBackToLanding={() => setHasStarted(false)} />
      </SafeAreaView>
    );
  }

  // 3. หน้าจอหลักของแอป
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.userBadge}>
            <Text style={styles.welcomeText}>
              ✨ สวัสดีคุณ, <Text style={styles.userName}>{user.name}</Text>
            </Text>
            <TouchableOpacity onPress={logout}>
              <Text style={styles.logoutText}>ออกจากระบบ</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>กินไรดีนะ? 🍱</Text>
          <Text style={styles.subtitle}>
            เปิดจานสุ่มมื้ออร่อย ยิ่งกินบ่อย ยิ่งไม่สุ่มซ้ำ!
          </Text>
        </View>

        <View style={styles.content}>
          <FilterBar />
          <DishGachaBox />
          <SwipeCardDeck />
          <HistoryDrawer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <FoodProvider>
      <MainAppContent />
    </FoodProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFBEB', // สีพื้นหลังกลืนไปกับทุกหน้าจอ
    // ดันลงมาจากขอบ Status Bar เพิ่มอีกนิดสำหรับ Android
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 12 : 12,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFBEB',
    paddingTop: 16, // เพิ่มพื้นที่หายใจด้านบนของเนื้อหา
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FDE4CF',
    gap: 12,
  },
  welcomeText: {
    fontSize: 12,
    color: '#4B5563',
  },
  userName: {
    fontWeight: '900',
    color: '#F97316',
  },
  logoutText: {
    fontSize: 11,
    color: '#EF4444',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#F97316',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#92400E',
    marginTop: 4,
    textAlign: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
});