import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
} from 'react-native';

import { Calendar } from 'react-native-calendars';

import { router } from 'expo-router';

import { icons } from '../../constants';

import { signOut, getSleepData, addSleepData } from '../../lib/appwrite';

import { useGlobalContext } from '../../context/GlobalProvider';

import { InfoBox } from '../../components';

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  const [sleepData, setSleepData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  // Ove promenljive stanja prate podatke o snu, odabrani datum i vidljivost modala.

  const fetchAndSetSleepData = async () => {
    if (!user?.$id) return;

    try {
      const data = await getSleepData(user.$id);
      const markedDates = {};

      data.forEach((entry) => {
        markedDates[entry.date] = {
          customStyles: {
            container: {
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            },
            text: {
              color: 'black',
              fontWeight: 'bold',
            },
          },
          customView: <Text style={{ fontSize: 24 }}>{entry.sticker}</Text>,
          // Prikazuje nalepnicu kao ikonu u kalendaru.
        };
      });

      setSleepData(markedDates);
    } catch (error) {
      console.error('Failed to load sleep data:', error);
    }
  };
  // `fetchAndSetSleepData` funkcija dohvaća podatke o snu korisnika i postavlja ih u stanje `sleepData`.

  useEffect(() => {
    fetchAndSetSleepData();
  }, [user]);
  // `useEffect` osigurava da se podaci o snu učitaju svaki put kada se korisnik promeni.

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };
  // `handleDayPress` postavlja odabrani datum i prikazuje modal za odabir nalepnice.

  const handleStickerSelect = async (sticker) => {
    if (selectedDate) {
      const newEntry = {
        date: selectedDate,
        quality: 4,
        sticker: sticker,
      };

      await addSleepData(user.$id, newEntry);
      await fetchAndSetSleepData();

      setModalVisible(false);
    }
  };
  // `handleStickerSelect` omogućava korisniku da izabere nalepnicu za kvalitet sna na određen datum i dodaje taj unos u bazu.

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLogged(false);
      router.replace('login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };
  // `logout` funkcija odjavljuje korisnika, briše informacije o korisniku iz globalnog stanja i preusmerava na ekran za prijavu.

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
        <TouchableOpacity
          onPress={logout}
          className="flex w-full items-end mb-10"
        >
          <Image
            source={icons.logout}
            resizeMode="contain"
            className="w-12 h-12 "
          />
        </TouchableOpacity>
        {/* Dugme za odjavu koje prikazuje ikonu i poziva `logout` funkciju kada se pritisne. */}

        <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
          <Image
            source={{ uri: user?.avatar }}
            className="w-[90%] h-[90%] rounded-lg"
            resizeMode="cover"
          />
        </View>
        {/* Prikazuje avatar korisnika. */}

        <InfoBox
          title={user?.username}
          containerStyles="mt-5"
          titleStyles="text-lg"
        />
        {/* Prikazuje korisničko ime unutar `InfoBox` komponente. */}

        <View className="w-full mt-10">
          <Text className="text-white text-lg mb-5">Kalendar Kvalitet Sna</Text>
          <Calendar
            markedDates={sleepData}
            markingType={'custom'}
            onDayPress={handleDayPress}
            theme={{
              backgroundColor: '#1A1A1A',
              calendarBackground: '#1A1A1A',
              textSectionTitleColor: '#b6c1cd',
              dayTextColor: '#d9e1e8',
              todayTextColor: '#00adf5',
              monthTextColor: '#fff',
              indicatorColor: 'blue',
            }}
            dayComponent={({ date, state }) => {
              return (
                <TouchableOpacity onPress={() => handleDayPress(date)}>
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Text
                      style={{
                        color: state === 'disabled' ? 'gray' : 'white',
                        fontSize: 18,
                      }}
                    >
                      {date.day}
                    </Text>
                    {sleepData[date.dateString]?.customView}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {/* Prikazuje kalendar sa označenim datumima na osnovu podataka o snu. */}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View
            style={{
              width: 300,
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 20 }}>
              Kako si spavao?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
              }}
            >
              <Pressable onPress={() => handleStickerSelect('😟')}>
                <Text style={{ fontSize: 30 }}>😟</Text>
              </Pressable>
              <Pressable onPress={() => handleStickerSelect('😐')}>
                <Text style={{ fontSize: 30 }}>😐</Text>
              </Pressable>
              <Pressable onPress={() => handleStickerSelect('😁')}>
                <Text style={{ fontSize: 30 }}>😁</Text>
              </Pressable>
            </View>
            <Pressable
              style={{
                marginTop: 20,
                padding: 10,
                borderRadius: 5,
                backgroundColor: '#2196F3',
              }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{ color: 'white' }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Modalni prozor koji omogućava korisniku da izabere nalepnicu za označavanje kvaliteta sna. */}
    </SafeAreaView>
  );
};

export default Profile;
// Eksportuje `Profile` komponentu kao podrazumevani (default) eksport.
