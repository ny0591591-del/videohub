// HomeAndShortsScreen.js - YouTube Long Videos + TikTok Shorts Feed
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function HomeAndShortsScreen() {
  const [feedType, setFeedType] = useState('Long'); // 'Long' یا 'Shorts'
  const [selectedQuality, setSelectedQuality] = useState('1080p');

  // نمونہ ویڈیوز کا ڈیٹا
  const longVideos = [
    { id: '1', title: 'How to Build VideoHub App 🚀', channel: 'Tech Urdu', views: '150K', time: '2 days ago', duration: '12:40' },
    { id: '2', title: 'Top 10 Gaming Moments 🎮', channel: 'Pro Gamer', views: '89K', time: '5 hours ago', duration: '08:15' },
  ];

  const shortsVideos = [
    { id: '101', title: 'Insane Skill Shot! ⚡ #shorts', creator: '@viral_boy', likes: '45.2K', comments: '1.2K' },
    { id: '102', title: 'Funny Pet Reactions 😂 #viral', creator: '@funny_pets', likes: '120K', comments: '3.4K' },
  ];

  return (
    <View style={styles.container}>
      {/* اوپر کا موڈ سوئچ ٹوگل */}
      <View style={styles.topToggleBar}>
        <TouchableOpacity 
          style={[styles.toggleBtn, feedType === 'Long' && styles.activeToggle]} 
          onPress={() => setFeedType('Long')}
        >
          <Text style={styles.toggleText}>📺 Long Videos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.toggleBtn, feedType === 'Shorts' && styles.activeToggle]} 
          onPress={() => setFeedType('Shorts')}
        >
          <Text style={styles.toggleText}>⚡ Shorts Feed</Text>
        </TouchableOpacity>
      </View>

      {/* 1. لانگ ویڈیو فیڈ */}
      {feedType === 'Long' ? (
        <ScrollView style={styles.feedList}>
          {longVideos.map((item) => (
            <View key={item.id} style={styles.videoCard}>
              <View style={styles.thumbnailBox}>
                <Text style={styles.thumbText}>HLS Video Stream ({selectedQuality})</Text>
                <Text style={styles.durationBadge}>{item.duration}</Text>
              </View>

              <View style={styles.qualityRow}>
                <Text style={styles.qualityLabel}>Quality:</Text>
                {['360p', '480p', '720p', '1080p'].map((q) => (
                  <TouchableOpacity key={q} onPress={() => setSelectedQuality(q)}>
                    <Text style={[styles.qTag, selectedQuality === q && styles.activeQ]}>{q}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.videoMeta}>
                <View style={styles.avatarPlaceholder} />
                <View style={styles.textMeta}>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <Text style={styles.subText}>{item.channel} • {item.views} views • {item.time}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        /* 2. شارٹس فیڈ */
        <FlatList
          data={shortsVideos}
          keyExtractor={(item) => item.id}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.shortsPage}>
              <View style={styles.shortsVideoPlaceholder}>
                <Text style={styles.shortsPlayingText}>▶️ Playing Vertical Shorts Stream</Text>
              </View>

              <View style={styles.shortsActions}>
                <TouchableOpacity style={styles.actionIcon}>
                  <Text style={styles.iconText}>❤️</Text>
                  <Text style={styles.iconCount}>{item.likes}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionIcon}>
                  <Text style={styles.iconText}>💬</Text>
                  <Text style={styles.iconCount}>{item.comments}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionIcon}>
                  <Text style={styles.iconText}>🚀</Text>
                  <Text style={styles.iconCount}>Share</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.shortsOverlay}>
                <Text style={styles.shortsCreator}>{item.creator}</Text>
                <Text style={styles.shortsTitle}>{item.title}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  topToggleBar: { flexDirection: 'row', justifyContent: 'center', padding: 10, backgroundColor: '#111' },
  toggleBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginHorizontal: 5 },
  activeToggle: { backgroundColor: '#e50914' },
  toggleText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  feedList: { flex: 1, padding: 10 },
  videoCard: { marginBottom: 20, backgroundColor: '#181818', borderRadius: 8, overflow: 'hidden' },
  thumbnailBox: { height: 200, backgroundColor: '#2a2a2a', justifyContent: 'center', alignItems: 'center' },
  thumbText: { color: '#888', fontWeight: 'bold' },
  durationBadge: { position: 'absolute', bottom: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.8)', color: '#fff', padding: 4, borderRadius: 4, fontSize: 10 },
  qualityRow: { flexDirection: 'row', alignItems: 'center', padding: 8, backgroundColor: '#222' },
  qualityLabel: { color: '#aaa', fontSize: 11, marginRight: 8 },
  qTag: { color: '#888', fontSize: 11, paddingHorizontal: 6, marginHorizontal: 2 },
  activeQ: { color: '#ff0000', fontWeight: 'bold' },
  videoMeta: { flexDirection: 'row', padding: 12 },
  avatarPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#444', marginRight: 10 },
  textMeta: { flex: 1 },
  titleText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  subText: { color: '#aaa', fontSize: 12, marginTop: 4 },
  shortsPage: { width: width, height: height - 120, justifyContent: 'center', alignItems: 'center', backgroundColor: '#050505' },
  shortsVideoPlaceholder: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' },
  shortsPlayingText: { color: '#ff2d55', fontWeight: 'bold' },
  shortsActions: { position: 'absolute', right: 15, bottom: 100, alignItems: 'center' },
  actionIcon: { marginBottom: 20, alignItems: 'center' },
  iconText: { fontSize: 28 },
  iconCount: { color: '#fff', fontSize: 12, marginTop: 2 },
  shortsOverlay: { position: 'absolute', left: 15, bottom: 30, right: 80 },
  shortsCreator: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  shortsTitle: { color: '#ddd', fontSize: 14, marginTop: 4 }
});
