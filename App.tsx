import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Entypo } from '@expo/vector-icons';

const flipCamera = (type) => type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back

export default function App() {
  const [hasCameraPermission, setCameraPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    Permissions.askAsync(Permissions.CAMERA).then(({ status }) => {
      setCameraPermission(status === 'granted');
    })
  })
  return (
    <View style={styles.container}>
      <Camera style={{ flex: 1 }} type={cameraType}>
        <View style={styles.cameraViewContainer}>
          <TouchableOpacity style={styles.flipCameraToggle}
            onPress={() => setCameraType(flipCamera(cameraType))}>
            <View>
              <Entypo name="cycle" size={40} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  cameraViewContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  flipCameraToggle: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 15,
    marginLeft: 15,
  },
});
