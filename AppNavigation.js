// AppNavigation.js - Complete Bottom Navigation & Router Setup
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

// اسکرینز کے امپورٹس (ہم اگلی فائلوں میں بنائیں گے)
import HomeAndShortsScreen from './HomeAndShortsScreen';
import UploadScreen from './UploadScreen';
import LiveStreamingPK from './LiveStreamingPK';
import MonetizationPortal from './MonetizationPortal';
import ChannelStudio from './ChannelStudio';

export default function AppNavigation() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeAndShortsScreen />;
      case 'Upload':
        return <UploadScreen navigation={setCurrentScreen} />;
      case 'Live':
        return <LiveStreamingPK />;
      case 'Monetization':
        return <MonetizationPortal />;
      case 'Profile':
        return <ChannelStudio />;
      default:
        return <HomeAndShortsScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* مرکزی اسکرین باڈی */}
      <View style={styles.body}>{renderScreen()}</View>

      {/* 5-آئیکن نچلی نیویگیشن بار (Bottom Bar) */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => setCurrentScreen('Home')}>
          <Text style={currentScreen === 'Home' ? styles.activeTab : styles.tab}>🏠 Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCurrentScreen('Live')}>
          <Text style={currentScreen === 'Live' ? styles.activeTab : styles.tab}>🔴 Live PK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadBtn} onPress={() => setCurrentScreen('Upload')}>
          <Text style={styles.uploadBtnText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCurrentScreen('Monetization')}>
          <Text style={currentScreen === 'Monetization' ? styles.activeTab : styles.tab}>💰 Earn</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCurrentScreen('Profile')}>
          <Text style={currentScreen === 'Profile' ? styles.activeTab : styles.tab}>👤 Studio</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  body: { flex: 1 },
  bottomBar: { 
    flexDirection: 'row', 
    justify: 'space-around', 
    alignItems: 'center', 
    height: 60, 
    backgroundColor: '#111', 
    borderTopWidth: 1, 
    borderColor: '#222' 
  },
  tab: { color: '#888', fontSize: 12 },
  activeTab: { color: '#ff0000', fontSize: 12, fontWeight: 'bold' },
  uploadBtn: { 
    backgroundColor: '#ff0000', 
    width: 42, 
    height: 42, 
    borderRadius: 21, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  uploadBtnText: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: -3 }
});