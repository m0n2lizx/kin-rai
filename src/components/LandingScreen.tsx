import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

interface LandingScreenProps {
  onStartApp: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStartApp }) => {
  return (
    <View style={styles.container}>
      {/* โลโก้แอป (ดึงไฟล์ PNG มาแสดง) */}
      <View style={styles.logoWrapper}>
        <View style={styles.iconCircle}>
          {/* แทนที่ 'path_to_your_logo.png' ด้วยที่อยู่ไฟล์ PNG จริงในโปรเจกต์ เช่น require('../../assets/images/logo.png') */}
          <Image
            source={require('../../assets/images/logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.appName}>กินไรดีนะ?</Text>
      </View>

      {/* ปุ่มกดเริ่ม */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={onStartApp}
        activeOpacity={0.85}
      >
        <Text style={styles.startButtonText}>เริ่มต้นใช้งาน ✨</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#FDE4CF',
    shadowColor: '#F4A261',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
    overflow: 'hidden',
  },
  logoImage: {
    width: '75%',
    height: '75%',
  },
  appName: {
    fontSize: 34,
    fontWeight: '900',
    color: '#F97316',
    letterSpacing: 0.5,
  },
  startButton: {
    width: '100%',
    maxWidth: 260,
    backgroundColor: '#F97316',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
});