import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [ean, setEan] = useState<string | null>(null);

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <Text>Loading camera permission…</Text>;
  }

  if (!permission.granted) {
    return <Text>No camera permission granted</Text>;
  }

  return (
    <View style={styles.container}>

      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={
          scanned
            ? undefined
            : (result) => {
                console.log(result);
                setScanned(true);
                setEan(result.data);
              }
        }
      />

      <View style={styles.bottomArea}>
        <Text style={styles.eanText}>EAN: {ean}</Text>

        {scanned && (
          <Button
            title="Scan again"
            onPress={() => {
              setScanned(false);
              setEan(null);
            }}
          />
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  eanText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 18,
  },
  bottomArea: {
    paddingBottom: 40,   
    paddingTop: 20,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
