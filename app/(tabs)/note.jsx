import React, { useState } from 'react';
import { View, Text, ScrollView, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import SoundButton from '../../components/SoundButton';
import { icons } from '../../constants';

export default function App() {
  const [activeSounds, setActiveSounds] = useState({});

  const toggleSound = async (soundFile, soundKey) => {
    if (activeSounds[soundKey]) {
      await activeSounds[soundKey].stopAsync();
      await activeSounds[soundKey].unloadAsync();
      setActiveSounds((prevSounds) => {
        const updatedSounds = { ...prevSounds };
        delete updatedSounds[soundKey];
        return updatedSounds;
      });
    } else {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();
      sound.setIsLoopingAsync(true);

      setActiveSounds((prevSounds) => ({
        ...prevSounds,
        [soundKey]: sound,
      }));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/moon.png')}
        style={{ flex: 1, position: 'absolute', width: '100%', height: '100%' }}
        resizeMode="cover"
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <Text className="text-3xl text-white font-bold text-center">
            Jednim Klikom{'\n'}
            Do mirnog <Text className="text-blue-200">Sna</Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}
          >
            {/* Forest Column */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text className="bg-green-100 text-center text-black font-extrabold p-2 rounded-lg shadow-md mx-2">
                Nature
              </Text>

              <View
                style={{ width: 0.5, height: 60, backgroundColor: '#D3D3D3' }}
              />
              <SoundButton
                soundKey="melody1"
                soundFile={require('../../assets/sounds/cricket.mp3')}
                isActive={!!activeSounds['melody1']}
                toggleSound={toggleSound}
                icon={icons.cricket}
                activeColor="#86efac"
                inactiveColor="#1f2937"
              />
              <View
                style={{ width: 0.5, height: 50, backgroundColor: '#D3D3D3' }}
              />
              <SoundButton
                soundKey="melody2"
                soundFile={require('../../assets/sounds/birds.mp3')}
                isActive={!!activeSounds['melody2']}
                toggleSound={toggleSound}
                icon={icons.bird}
                activeColor="#86efac"
                inactiveColor="#1f2937"
              />
              <View
                style={{ width: 0.5, height: 50, backgroundColor: '#D3D3D3' }}
              />
              <SoundButton
                soundKey="melody3"
                soundFile={require('../../assets/sounds/forest.mp3')}
                isActive={!!activeSounds['melody3']}
                toggleSound={toggleSound}
                icon={icons.forest}
                activeColor="#86efac"
                inactiveColor="#1f2937"
              />
              <View
                style={{ width: 0.5, height: 50, backgroundColor: '#D3D3D3' }}
              />
              <SoundButton
                soundKey="melody4"
                soundFile={require('../../assets/sounds/night-forest.mp3')}
                isActive={!!activeSounds['melody4']}
                toggleSound={toggleSound}
                icon={icons.tent}
                activeColor="#86efac"
                inactiveColor="#1f2937"
              />
              <View
                style={{ width: 0.5, height: 50, backgroundColor: '#D3D3D3' }}
              />
              <SoundButton
                soundKey="melody5"
                soundFile={require('../../assets/sounds/frog.mp3')}
                isActive={!!activeSounds['melody5']}
                toggleSound={toggleSound}
                icon={icons.frog}
                activeColor="#86efac"
                inactiveColor="#1f2937"
              />
              <View
                style={{ width: 0.5, height: 50, backgroundColor: '#D3D3D3' }}
              />
            </View>

            {/* PIANOOOOOOOOOOOOOOOOOOOO */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text className="bg-orange-100 text-center text-black font-extrabold p-2 rounded-lg shadow-md mx-2">
                Melody
              </Text>

              <View
                style={{ width: 0.5, height: 135, backgroundColor: '#D3D3D3' }}
              />
              <SoundButton
                soundKey="p1"
                soundFile={require('../../assets/sounds/soft-piano.mp3')}
                isActive={!!activeSounds['p1']}
                toggleSound={toggleSound}
                icon={icons.piano}
                activeColor="#FFD580"
                inactiveColor="#1f2937"
              />
              <View
                style={{ width: 0.5, height: 50, backgroundColor: '#D3D3D3' }}
              />
              <SoundButton
                soundKey="p2"
                soundFile={require('../../assets/sounds/chimes.mp3')}
                isActive={!!activeSounds['p2']}
                toggleSound={toggleSound}
                icon={icons.c}
                activeColor="#FFD580"
                inactiveColor="#1f2937"
              />
              <View
                style={{ width: 0.5, height: 50, backgroundColor: '#D3D3D3' }}
              />
              <SoundButton
                soundKey="p3"
                soundFile={require('../../assets/sounds/violin.mp3')}
                isActive={!!activeSounds['p3']}
                toggleSound={toggleSound}
                icon={icons.violin}
                activeColor="#FFD580"
                inactiveColor="#1f2937"
              />
              <View
                style={{ width: 0.5, height: 50, backgroundColor: '#D3D3D3' }}
              />
              <SoundButton
                soundKey="p4"
                soundFile={require('../../assets/sounds/flute.mp3')}
                isActive={!!activeSounds['p4']}
                toggleSound={toggleSound}
                icon={icons.flute}
                activeColor="#FFD580"
                inactiveColor="#1f2937"
              />
              <View
                style={{ width: 0.5, height: 50, backgroundColor: '#D3D3D3' }}
              />
              <SoundButton
                soundKey="p5"
                soundFile={require('../../assets/sounds/guitar.mp3')}
                isActive={!!activeSounds['p5']}
                toggleSound={toggleSound}
                icon={icons.guitar}
                activeColor="#FFD580"
                inactiveColor="#1f2937"
              />
              <View
                style={{ width: 0.5, height: 50, backgroundColor: '#D3D3D3' }}
              />
            </View>

            {/* Cozy Night Column */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text className="bg-blue-100 text-center text-black font-extrabold p-2 rounded-lg shadow-md mx-2">
                Cozy Night
              </Text>
              <View
                style={{ width: 0.5, height: 60, backgroundColor: '#D3D3D3' }}
              />
              <SoundButton
                soundKey="z1"
                soundFile={require('../../assets/sounds/rain.mp3')}
                isActive={!!activeSounds['z1']}
                toggleSound={toggleSound}
                icon={icons.rain}
                activeColor="#93c5fd"
                inactiveColor="#1f2937"
              />
              <View
                style={{ width: 0.5, height: 60, backgroundColor: '#D3D3D3' }}
              />
              <SoundButton
                soundKey="z2"
                soundFile={require('../../assets/sounds/wind.mp3')}
                isActive={!!activeSounds['z2']}
                toggleSound={toggleSound}
                icon={icons.wind}
                activeColor="#93c5fd"
                inactiveColor="#1f2937"
              />
              <View
                style={{ width: 0.5, height: 60, backgroundColor: '#D3D3D3' }}
              />
              <SoundButton
                soundKey="z3"
                soundFile={require('../../assets/sounds/thunder.mp3')}
                isActive={!!activeSounds['z3']}
                toggleSound={toggleSound}
                icon={icons.thunder}
                activeColor="#93c5fd"
                inactiveColor="#1f2937"
              />
              <View
                style={{ width: 0.5, height: 60, backgroundColor: '#D3D3D3' }}
              />
              <SoundButton
                soundKey="z4"
                soundFile={require('../../assets/sounds/fire-sound.mp3')}
                isActive={!!activeSounds['z4']}
                toggleSound={toggleSound}
                icon={icons.fire}
                activeColor="#93c5fd"
                inactiveColor="#1f2937"
              />
              <View
                style={{ width: 0.5, height: 60, backgroundColor: '#D3D3D3' }}
              />
            </View>

            {/* Relaxing Column */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text className="bg-red-100 text-center text-black font-extrabold p-2 rounded-lg shadow-md mx-2">
                Relaxing
              </Text>
              <View
                style={{ width: 0.5, height: 135, backgroundColor: '#D3D3D3' }}
              />
              <SoundButton
                soundKey="w1"
                soundFile={require('../../assets/sounds/stream.mp3')}
                isActive={!!activeSounds['w1']}
                toggleSound={toggleSound}
                icon={icons.river}
                activeColor="#fca5a5"
                inactiveColor="#1f2937"
              />

              <View
                style={{ width: 0.5, height: 60, backgroundColor: '#D3D3D3' }}
              />

              <SoundButton
                soundKey="w2"
                soundFile={require('../../assets/sounds/cat.mp3')}
                isActive={!!activeSounds['w2']}
                toggleSound={toggleSound}
                icon={icons.cat}
                activeColor="#fca5a5"
                inactiveColor="#1f2937"
              />
              <View
                style={{ width: 0.5, height: 60, backgroundColor: '#D3D3D3' }}
              />

              <SoundButton
                soundKey="w3"
                soundFile={require('../../assets/sounds/clock.mp3')}
                isActive={!!activeSounds['w3']}
                toggleSound={toggleSound}
                icon={icons.clock}
                activeColor="#fca5a5"
                inactiveColor="#1f2937"
              />
              <View
                style={{ width: 0.5, height: 60, backgroundColor: '#D3D3D3' }}
              />

              <SoundButton
                soundKey="w4"
                soundFile={require('../../assets/sounds/waves.mp3')}
                isActive={!!activeSounds['w4']}
                toggleSound={toggleSound}
                icon={icons.wave}
                activeColor="#fca5a5"
                inactiveColor="#1f2937"
              />
              <View
                style={{ width: 0.5, height: 60, backgroundColor: '#D3D3D3' }}
              />

              <SoundButton
                soundKey="w5"
                soundFile={require('../../assets/sounds/gulls.mp3')}
                isActive={!!activeSounds['w5']}
                toggleSound={toggleSound}
                icon={icons.seagull}
                activeColor="#fca5a5"
                inactiveColor="#1f2937"
              />
              <View
                style={{ width: 0.5, height: 60, backgroundColor: '#D3D3D3' }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
