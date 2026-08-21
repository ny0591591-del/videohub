// MonetizationPortal.js - Global Monetization Engine & Dynamic Ad Split
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ProgressBarAndroid, ProgressViewIOS, Platform, Alert } from 'react-native';

export default function MonetizationPortal() {
  // گلوبل کری ایٹر اینالیٹکس ڈیٹا
  const [subscribers, setSubscribers] = useState(10500); // Target: 10,000
  const [watchHours, setWatchHours] = useState(3200);   // Target: 3,000 Hours
  const [shortsViews, setShortsViews] = useState(4500000); // Target: 10M Views

  // 100% عالمی دستیابی (Global Region Eligibility Check)
  const isEligible = subscribers >= 10000 && (watchHours >= 3000 || shortsViews >= 10000000);

  const handleApplyMonetization = () => {
    if (isEligible) {
      Alert.alert(
        'Global Application Submitted! 🎉',
        'Your channel monetization application is approved for all countries. Stripe, Wire Transfer & Global Payouts activated.'
      );
    } else {
      Alert.alert('Criteria Incomplete', 'Please complete the required global subscriber & watch metrics.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>🌍 Global Partner Program</Text>
      <Text style={styles.subHeader}>Monetize your content worldwide with no regional restrictions.</Text>

      {/* 1. مونیٹائزیشن کرائٹیریا کارڈز (Metric Trackers) */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Eligibility Requirements</Text>

        {/* 10,000 Subs Tracker */}
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>1. Subscribers (Worldwide)</Text>
          <Text style={styles.metricValue}>{subscribers.toLocaleString()} / 10,000</Text>
        </View>
        <Text style={styles.statusTag}>{subscribers >= 10000 ? '✅ Completed' : '⏳ In Progress'}</Text>

        {/* OR Condition: 3,000 Watch Hours OR 10M Shorts Views */}
        <View style={styles.divider} />
        <Text style={styles.orText}>Must meet ONE of the following:</Text>

        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>• Long Video Watch Hours</Text>
          <Text style={styles.metricValue}>{watchHours.toLocaleString()} / 3,000 Hours</Text>
        </View>
        <Text style={styles.statusTag}>{watchHours >= 3000 ? '✅ Completed' : '⏳ In Progress'}</Text>

        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>• Vertical Shorts Views</Text>
          <Text style={styles.metricValue}>{(shortsViews / 1000000).toFixed(1)}M / 10M Views</Text>
        </View>
        <Text style={styles.statusTag}>{shortsViews >= 10000000 ? '✅ Completed' : '⏳ In Progress'}</Text>
      </View>

      {/* 2. خودکار گلوبل اپلائی پورٹل (Auto Unlocks Globally) */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💼 Application Status</Text>
        <Text style={styles.infoText}>
          Supported Payout Options: International Wire, Stripe Global, PayPal, and Digital Currency (Active in All Countries).
        </Text>

        <TouchableOpacity 
          style={[styles.applyBtn, !isEligible && styles.disabledBtn]} 
          onPress={handleApplyMonetization}
        >
          <Text style={styles.applyBtnText}>
            {isEligible ? '🚀 Apply for Global Monetization' : '🔒 Locked (Meet Requirements)'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 3. ڈائنامک ایڈز اور ریونیو اسپلٹ (Ad Placements & 70/30 Ledger) */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💵 Revenue & Ad Placements</Text>
        <View style={styles.adRow}>
          <Text style={styles.adLabel}>Pre-Roll & Mid-Roll Video Ads</Text>
          <Text style={styles.activeText}>Active Globally</Text>
        </View>
        <View style={styles.adRow}>
          <Text style={styles.adLabel}>Creator Revenue Split</Text>
          <Text style={styles.goldText}>30% Creator / 70% Platform</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 15 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: 10, textAlign: 'center' },
  subHeader: { color: '#aaa', fontSize: 12, textAlign: 'center', marginBottom: 20, marginTop: 4 },
  card: { backgroundColor: '#141414', padding: 16, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#222' },
  cardTitle: { color: '#e50914', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  metricRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  metricLabel: { color: '#ddd', fontSize: 13 },
  metricValue: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  statusTag: { color: '#28a745', fontSize: 11, fontWeight: 'bold', alignSelf: 'flex-end', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#333', marginVertical: 12 },
  orText: { color: '#ffd700', fontSize: 11, fontWeight: 'bold', marginBottom: 5 },
  infoText: { color: '#aaa', fontSize: 12, marginBottom: 15, lineHeight: 18 },
  applyBtn: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center' },
  disabledBtn: { backgroundColor: '#333' },
  applyBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  adRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#222' },
  adLabel: { color: '#ccc', fontSize: 12 },
  activeText: { color: '#28a745', fontWeight: 'bold', fontSize: 12 },
  goldText: { color: '#ffd700', fontWeight: 'bold', fontSize: 12 }
});