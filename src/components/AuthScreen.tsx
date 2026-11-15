import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFoodApp } from '../context/FoodContext';

interface AuthScreenProps {
  onBackToLanding?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onBackToLanding }) => {
  const { login } = useFoodApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuthSubmit = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('อุ๊ย!', 'กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบถ้วนนะงับ 🥺');
      return;
    }

    const success = login(username, password);
    if (!success) {
      Alert.alert('Error!', 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง ลองใหม่อีกครั้งนะงับ ❌');
    }
  };

  return (
    <View style={styles.container}>
      {/* ปุ่มย้อนกลับไปหน้า Landing Page */}
      {onBackToLanding && (
        <TouchableOpacity style={styles.backButton} onPress={onBackToLanding} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>← กลับหน้าแรก</Text>
        </TouchableOpacity>
      )}

      <View style={styles.card}>
        <Text style={styles.emoji}>🔐✨</Text>
        <Text style={styles.title}>เข้าสู่ระบบ / สมัครสมาชิก</Text>
        <Text style={styles.subtitle}>กรอก Username และ Password เพื่อใช้งานแอป</Text>

        <TextInput
          style={styles.input}
          placeholder="Username (ชื่อผู้ใช้)"
          placeholderTextColor="#9CA3AF"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password (รหัสผ่าน)"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleAuthSubmit} activeOpacity={0.85}>
          <Text style={styles.buttonText}>ยืนยันข้อมูล 🚀</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FDE4CF',
    shadowColor: '#F4A261',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  backButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#D97706',
  },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FEF3C7',
    shadowColor: '#F4A261',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFBEB',
    borderWidth: 2,
    borderColor: '#FDE4CF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 12,
  },
  button: {
    width: '100%',
    backgroundColor: '#F97316',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#F97316',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
});