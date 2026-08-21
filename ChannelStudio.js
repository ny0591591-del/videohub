// ChannelStudio.js - Complete Channel Architecture, Analytics & Community Tab
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, FlatList, Alert } from 'react-native';

export default function ChannelStudio() {
  const [activeTab, setActiveTab] = useState('Videos'); // 'Videos', 'Shorts', 'Playlists', 'Community', 'Analytics'
  const [communityPosts, setCommunityPosts] = useState([
    { id: 'p1', text: 'Hey guys! New live streaming session starting at 8 PM today! 🚀', likes: 240, comments: 18 }
  ]);
  const [newPostText, setNewPostText] = useState('');
  
  // اسپیم فلٹر کمنٹس کی لسٹ
  const [comments, setComments] = useState([
    { id: 'c1', user: 'Tech Fan', text: 'Awesome video bro! 🔥', isSpam: false },
    { id: 'c2', user: 'Bot123', text: 'Free coins click here http://spam-link.com', isSpam: true }
  ]);

  const handleCreatePost = () => {
    if (!newPostText) return;
    setCommunityPosts([{ id: Date.now().toString(), text: newPostText, likes: 0, comments: 0 }, ...communityPosts]);
    setNewPostText('');
    Alert.alert('Success', 'Community post published globally!');
  };

  return (
    <ScrollView style={styles.container}>
      {/* 1. کسٹم چینل بینر اور لوگو (Channel Banner & Header) */}
      <View style={styles.bannerPlaceholder}>
        <Text style={styles.bannerText}>🖼️ Custom Channel Banner (16:9)</Text>
      </View>

      <View style={styles.profileHeader}>
        <View style={styles.avatarBox}>
          <Text style={styles.avatarText}>VH</Text>
        </View>
        <View style={styles.channelInfo}>
          <Text style={styles.channelName}>VideoHub Official Channel ✅</Text>
          <Text style={styles.statsText}>12.5K Subscribers • 48 Uploads</Text>
          <Text style={styles.bioText}>Welcome to the official creator channel. Live streams every day!</Text>
        </View>
      </View>

      {/* 2. نیویگیشن ٹیب بار (Videos, Shorts, Playlists, Community, Analytics) */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
        {['Videos', 'Shorts', 'Playlists', 'Community', 'Analytics'].map((tab) => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.tabBtn, activeTab === tab && styles.activeTabBtn]} 
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabBtnText, activeTab === tab && styles.activeTabBtnText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 3. کمیونٹی ٹیب (Community Tab & Auto-Spam Filter) */}
      {activeTab === 'Community' && (
        <View style={styles.sectionContainer}>
          <View style={styles.createPostBox}>
            <TextInput
              style={styles.postInput}
              placeholder="Post an update or poll to your community..."
              placeholderTextColor="#666"
              value={newPostText}
              onChangeText={setNewPostText}
              multiline
            />
            <TouchableOpacity style={styles.postBtn} onPress={handleCreatePost}>
              <Text style={styles.postBtnText}>Post</Text>
            </TouchableOpacity>
          </View>

          {communityPosts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <Text style={styles.postContent}>{post.text}</Text>
              <Text style={styles.postFooter}>❤️ {post.likes} Likes • 💬 {post.comments} Comments</Text>
            </View>
          ))}
        </View>
      )}

      {/* 4. اینالیٹکس ڈیش بورڈ (Real-Time Channel Analytics) */}
      {activeTab === 'Analytics' && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>📈 Lifetime Analytics</Text>
          <View style={styles.analyticsGrid}>
            <View style={styles.analyticCard}>
              <Text style={styles.metricVal}>1.2M</Text>
              <Text style={styles.metricTitle}>Total Views</Text>
            </View>
            <View style={styles.analyticCard}>
              <Text style={styles.metricVal}>4.8K hrs</Text>
              <Text style={styles.metricTitle}>Watch Time</Text>
            </View>
            <View style={styles.analyticCard}>
              <Text style={styles.metricVal}>$450.00</Text>
              <Text style={styles.metricTitle}>Est. Revenue</Text>
            </View>
          </View>

          {/* کمنٹ اسپیم فلٹر (Auto-Spam Filter Logic) */}
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>🛡️ Comment Moderation & Auto-Spam Filter</Text>
          {comments.map((item) => (
            <View key={item.id} style={[styles.commentRow, item.isSpam && styles.spamComment]}>
              <Text style={styles.commentUser}>{item.user}: {item.text}</Text>
              {item.isSpam && <Text style={styles.spamBadge}>⚠️ Spam Blocked</Text>}
            </View>
          ))}
        </View>
      )}

      {/* ویڈیو/شارٹس/پلے لسٹس کا پلیس ہولڈر */}
      {(activeTab === 'Videos' || activeTab === 'Shorts' || activeTab === 'Playlists') && (
        <View style={styles.sectionContainer}>
          <Text style={styles.emptyText}>Showing uploaded {activeTab.toLowerCase()} for this channel.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  bannerPlaceholder: { height: 110, backgroundColor: '#222', justifyContent: 'center', alignItems: 'center' },
  bannerText: { color: '#888', fontWeight: 'bold', fontSize: 12 },
  profileHeader: { flexDirection: 'row', padding: 15, alignItems: 'center', borderBottomWidth: 1, borderColor: '#181818' },
  avatarBox: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#e50914', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  channelInfo: { flex: 1 },
  channelName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  statsText: { color: '#aaa', fontSize: 12, marginTop: 2 },
  bioText: { color: '#888', fontSize: 11, marginTop: 4 },
  tabScroll: { backgroundColor: '#111', paddingVertical: 10 },
  tabBtn: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 15, marginRight: 8, backgroundColor: '#222' },
  activeTabBtn: { backgroundColor: '#fff' },
  tabBtnText: { color: '#aaa', fontSize: 12, fontWeight: 'bold' },
  activeTabBtnText: { color: '#000' },
  sectionContainer: { padding: 15 },
  createPostBox: { backgroundColor: '#181818', padding: 12, borderRadius: 10, marginBottom: 15 },
  postInput: { color: '#fff', fontSize: 13, minHeight: 60, textAlignVertical: 'top' },
  postBtn: { backgroundColor: '#e50914', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 6, alignSelf: 'flex-end', marginTop: 8 },
  postBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  postCard: { backgroundColor: '#141414', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#222' },
  postContent: { color: '#ddd', fontSize: 13 },
  postFooter: { color: '#888', fontSize: 11, marginTop: 8 },
  sectionTitle: { color: '#fff', fontSize: 15, fontWeight: 'bold', marginBottom: 12 },
  analyticsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  analyticCard: { backgroundColor: '#181818', padding: 12, borderRadius: 8, width: '31%', alignItems: 'center' },
  metricVal: { color: '#28a745', fontSize: 16, fontWeight: 'bold' },
  metricTitle: { color: '#aaa', fontSize: 11, marginTop: 4 },
  commentRow: { backgroundColor: '#181818', padding: 10, borderRadius: 6, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  spamComment: { borderColor: '#e50914', borderWidth: 1 },
  commentUser: { color: '#ccc', fontSize: 12, flex: 1 },
  spamBadge: { color: '#e50914', fontSize: 10, fontWeight: 'bold' },
  emptyText: { color: '#666', textAlign: 'center', marginTop: 30 }
});