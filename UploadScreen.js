// UploadScreen.js - Native Video & Thumbnail Upload Engine
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function UploadScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Tech');
  const [hashtags, setHashtags] = useState('');
  const [visibility, setVisibility] = useState('Public');
  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const categories = ['Gaming', 'Tech', 'Vlogs', 'Entertainment', 'News'];

  const handleSelectVideo = () => {
    // AWS S3 / Bunny CDN Upload Hook Placeholder
    setVideoFile('selected_video.mp4');
    Alert.alert('ویڈیو منتخب!', 'ویڈیو فائل کامیابی سے منتخب کر لی گئی ہے۔');
  };

  const handleSelectThumbnail = () => {
    setThumbnail('custom_thumbnail.jpg');
    Alert.alert('تھمب نیل منتخب!', 'کسٹم تھمب نیل لوڈ ہو گیا ہے۔');
  };

  const handlePublish = () => {
    if (!title) {
      Alert.alert('غلطی!', 'برائے مہربانی ویڈیو کا عنوان (Title) درج کریں۔');
      return;
    }
    Alert.alert('کامیابی! 🚀', 'آپ کی ویڈیو AWS S3 / Bunny CDN پر اپلوڈ ہو رہی ہے۔');
    if (navigation) navigation('Home');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>📤 Upload Video / Go Live</Text>

      {/* 1. ویڈیو اور تھمب نیل سلیکشن */}
      <View style={styles.uploadBox}>
        <TouchableOpacity style={styles.selectBtn} onPress={handleSelectVideo}>
          <Text style={styles.selectBtnText}>
            {videoFile ? `✅ ${videoFile}` : '🎥 Select Video File (MP4/MOV)'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.selectBtnOutline} onPress={handleSelectThumbnail}>
          <Text style={styles.selectBtnOutlineText}>
            {thumbnail ? `✅ ${thumbnail}` : '🖼️ Pick Custom Thumbnail'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 2. ٹائٹل اور ڈسکرپشن */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Video Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter video title..."
          placeholderTextColor="#666"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Tell viewers about your video..."
          placeholderTextColor="#666"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* 3. کیٹیگری سلیکشن */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.badgeRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, category === cat && styles.activeChip]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.chipText, category === cat && styles.activeChipText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 4. ہیش ٹیگز اور پرائیویسی */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Hashtags</Text>
        <TextInput
          style={styles.input}
          placeholder="#gaming #tech #vlog"
          placeholderTextColor="#666"
          value={hashtags}
          onChangeText={setHashtags}
        />

        <Text style={styles.label}>Visibility</Text>
        <View style={styles.badgeRow}>
          {['Public', 'Unlisted', 'Private'].map((vis) => (
            <TouchableOpacity
              key={vis}
              style={[styles.chip, visibility === vis && styles.activeChip]}
              onPress={() => setVisibility(vis)}
            >
              <Text style={[styles.chipText, visibility === vis && styles.activeChipText]}>{vis}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 5. پبلش بٹن */}
      <TouchableOpacity style={styles.publishBtn} onPress={handlePublish}>
        <Text style={styles.publishBtnText}>🚀 Publish Video</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 15 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginVertical: 15, textAlign: 'center' },
  uploadBox: { backgroundColor: '#181818', padding: 15, borderRadius: 10, marginBottom: 20 },
  selectBtn: { backgroundColor: '#e50914', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  selectBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  selectBtnOutline: { borderWidth: 1, borderColor: '#e50914', padding: 12, borderRadius: 8, alignItems: 'center' },
  selectBtnOutlineText: { color: '#e50914', fontWeight: 'bold', fontSize: 14 },
  inputGroup: { marginBottom: 20 },
  label: { color: '#aaa', fontSize: 12, marginBottom: 8, fontWeight: 'bold' },
  input: { backgroundColor: '#222', color: '#fff', padding: 12, borderRadius: 8, fontSize: 14, marginBottom: 10 },
  textArea: { height: 90, textAlignVertical: 'top' },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { backgroundColor: '#222', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, marginRight: 8, marginBottom: 8 },
  activeChip: { backgroundColor: '#e50914' },
  chipText: { color: '#aaa', fontSize: 12 },
  activeChipText: { color: '#fff', fontWeight: 'bold' },
  publishBtn: { backgroundColor: '#28a745', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 10, marginBottom: 40 },
  publishBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});