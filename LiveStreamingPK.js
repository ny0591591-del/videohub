// LiveStreamingPK.js - ZEGOCLOUD Global Ultra-Low Latency Live & PK Battle Engine
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList, Alert, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function LiveStreamingPK() {
  const [isPkMode, setIsPkMode] = useState(true); // PK Battle Mode Toggle
  const [userCoins, setUserCoins] = useState(5000);
  const [host1Points, setHost1Points] = useState(1200);
  const [host2Points, setHost2Points] = useState(980);
  const [showGiftMenu, setShowGiftMenu] = useState(false);
  const [activeGiftAnim, setActiveGiftAnim] = useState(null);

  // عالمی اینیمیٹڈ گفٹس کی فہرست
  const gifts = [
    { id: 'g1', name: '🌹 Rose', cost: 10, anim: '🌹 FLOATING ROSES' },
    { id: 'g2', name: '🏎️ Ferrari', cost: 500, anim: '🏎️ SUPERCAR DRIVE' },
    { id: 'g3', name: '🚀 Rocket', cost: 2000, anim: '🚀 ROCKET LAUNCH' }
  ];

  // گفٹ بھیجنے اور پوائنٹس اپ ڈیٹ کرنے کی لاجک
  const handleSendGift = (gift) => {
    if (userCoins < gift.cost) {
      Alert.alert('Low Coins', 'Please recharge your global coin wallet.');
      return;
    }
    setUserCoins(userCoins - gift.cost);
    setHost1Points(host1Points + gift.cost);
    setActiveGiftAnim(gift.anim);
    setShowGiftMenu(false);

    // 3 سیکنڈ بعد گفٹ اینیمیشن ختم ہو جائے گی
    setTimeout(() => setActiveGiftAnim(null), 3000);
  };

  return (
    <View style={styles.container}>
      {/* 1. لائیو اسٹریمنگ اسکرین (Single Host یا PK Battle) */}
      <View style={styles.streamArea}>
        {isPkMode ? (
          /* PK Battle Mode (دو ہوسٹس کی سائیڈ بائی سائیڈ اسٹریمنگ) */
          <View style={styles.pkContainer}>
            <View style={styles.hostBox}>
              <Text style={styles.hostBadge}>🔴 Host 1 (You)</Text>
              <Text style={styles.scoreBadge}>⭐ {host1Points}</Text>
            </View>

            <View style={styles.vsDivider}>
              <Text style={styles.vsText}>VS</Text>
            </View>

            <View style={[styles.hostBox, styles.host2Box]}>
              <Text style={styles.hostBadge}>🔴 Host 2 (Global)</Text>
              <Text style={styles.scoreBadge}>⭐ {host2Points}</Text>
            </View>
          </View>
        ) : (
          /* Single Global Live Stream */
          <View style={styles.singleHostBox}>
            <Text style={styles.liveTag}>🔴 GLOBAL LIVE</Text>
          </View>
        )}

        {/* اسکرین پر گفٹ کا اینیمیشن ڈسپلے */}
        {activeGiftAnim && (
          <View style={styles.giftOverlay}>
            <Text style={styles.giftAnimText}>{activeGiftAnim}</Text>
          </View>
        )}
      </View>

      {/* 2. لائیو کمنٹس اور چیٹ بار */}
      <View style={styles.chatArea}>
        <Text style={styles.chatMsg}><Text style={styles.userBold}>John (USA):</Text> Hello from New York! 🔥</Text>
        <Text style={styles.chatMsg}><Text style={styles.userBold}>Ali (PK):</Text> Great PK Match! 👏</Text>
      </View>

      {/* 3. نچلا کنٹرول پینل (PK Switch & Gift Button) */}
      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.coinDisplay}>
          <Text style={styles.coinText}>🪙 {userCoins}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.pkToggleBtn} 
          onPress={() => setIsPkMode(!isPkMode)}
        >
          <Text style={styles.pkToggleText}>{isPkMode ? 'Exit PK' : 'Start PK Match'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.giftBtn} 
          onPress={() => setShowGiftMenu(true)}
        >
          <Text style={styles.giftBtnText}>🎁 Send Gift</Text>
        </TouchableOpacity>
      </View>

      {/* 4. گفٹ سلیکشن پاپ اپ (Gift Modal) */}
      <Modal visible={showGiftMenu} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalHeading}>Send Interactive Gift</Text>
            <View style={styles.giftGrid}>
              {gifts.map((g) => (
                <TouchableOpacity 
                  key={g.id} 
                  style={styles.giftItem} 
                  onPress={() => handleSendGift(g)}
                >
                  <Text style={styles.giftIcon}>{g.name}</Text>
                  <Text style={styles.giftPrice}>🪙 {g.cost}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowGiftMenu(false)}>
              <Text style={styles.closeBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  streamArea: { flex: 0.65, backgroundColor: '#111' },
  pkContainer: { flex: 1, flexDirection: 'row' },
  hostBox: { flex: 1, backgroundColor: '#1c1c1e', justifyContent: 'flex-start', padding: 10, borderRightWidth: 1, borderColor: '#333' },
  host2Box: { backgroundColor: '#2c1c1e' },
  hostBadge: { color: '#fff', fontSize: 11, fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.6)', padding: 4, borderRadius: 4, alignSelf: 'flex-start' },
  scoreBadge: { color: '#ffd700', fontSize: 13, fontWeight: 'bold', marginTop: 5 },
  vsDivider: { position: 'absolute', left: width / 2 - 18, top: '45%', zIndex: 10, backgroundColor: '#e50914', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  vsText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  singleHostBox: { flex: 1, backgroundColor: '#1a1a1a', padding: 15 },
  liveTag: { color: '#fff', backgroundColor: '#e50914', padding: 6, borderRadius: 4, fontWeight: 'bold', alignSelf: 'flex-start' },
  giftOverlay: { position: 'absolute', top: '35%', left: 0, right: 0, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.85)', padding: 15 },
  giftAnimText: { color: '#ffd700', fontSize: 20, fontWeight: 'bold' },
  chatArea: { flex: 0.25, backgroundColor: '#080808', padding: 10 },
  chatMsg: { color: '#ccc', fontSize: 12, marginBottom: 6 },
  userBold: { color: '#e50914', fontWeight: 'bold' },
  bottomControls: { flex: 0.1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, backgroundColor: '#111', borderTopWidth: 1, borderColor: '#222' },
  coinDisplay: { backgroundColor: '#222', padding: 8, borderRadius: 15 },
  coinText: { color: '#ffd700', fontWeight: 'bold', fontSize: 12 },
  pkToggleBtn: { backgroundColor: '#333', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 15 },
  pkToggleText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  giftBtn: { backgroundColor: '#ff2d55', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 15 },
  giftBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  modalBg: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalCard: { backgroundColor: '#1e1e1e', padding: 20, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  modalHeading: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  giftGrid: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  giftItem: { backgroundColor: '#2a2a2a', padding: 12, borderRadius: 8, alignItems: 'center', width: '28%' },
  giftIcon: { fontSize: 13, color: '#fff' },
  giftPrice: { color: '#ffd700', fontSize: 11, marginTop: 4, fontWeight: 'bold' },
  closeBtn: { backgroundColor: '#333', padding: 10, borderRadius: 8, alignItems: 'center' },
  closeBtnText: { color: '#aaa', fontWeight: 'bold' }
});