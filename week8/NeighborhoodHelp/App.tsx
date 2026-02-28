import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import {
  firestore,
  collection,
  addDoc,
  REQUESTS,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from './firebase/Config';
import { deleteDoc, doc } from 'firebase/firestore';

type Request = {
  id: string;
  title: string;
  description: string;
  createdAt: any;
};

export default function App(): React.ReactElement {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const colRef = collection(firestore, REQUESTS);
    const q = query(colRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const rows: Request[] = snap.docs.map(docSnap => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Request, 'id'>),
        }));
        setRequests(rows);
      },
      (err) => console.error('onSnapshot error', err)
    );

    return () => unsubscribe();
  }, []);


  const handleSend = async (): Promise<void> => {
    if (!title.trim() || !description.trim()) return;
    try {
      await addDoc(collection(firestore, REQUESTS), {
        title,
        description,
        createdAt: serverTimestamp(),
      });
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Failed to save request', err);
    }
  };


  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(collection(firestore, REQUESTS), id));
    } catch (err) {
      console.error('Failed to delete request', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Neighborhood Help</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Button title="Send" onPress={handleSend} />
      </View>

      <Text style={styles.subheading}>Requests</Text>
      <ScrollView
        style={{ width: '100%', marginTop: 8 }}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        {requests.map((r) => {
          const created = r.createdAt?.toDate ? r.createdAt.toDate() : r.createdAt ?? null;
          const time = created ? new Date(created).toLocaleString() : 'unknown';
          return (
            <View
              key={r.id}
              style={{
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderColor: '#ddd',
                paddingHorizontal: 8,
                marginBottom: 8,
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{r.title}</Text>
              <Text>{r.description}</Text>
              <Text style={{ fontSize: 10, color: '#555' }}>{time}</Text>
              <Button title="Delete" color="red" onPress={() => handleDelete(r.id)} />
            </View>
          );
        })}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#fff' 
  },
  heading: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 16 
  },
  subheading: { 
    fontSize: 20, 
    marginTop: 24, 
    marginBottom: 8 
  },
  form: { 
    marginBottom: 16 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#999', 
    borderRadius: 8, padding: 8, 
    marginBottom: 8 
  },
});