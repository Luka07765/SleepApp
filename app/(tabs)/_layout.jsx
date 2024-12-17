import { StatusBar } from 'expo-status-bar';

import { Tabs } from 'expo-router';

import { Image, Text, View } from 'react-native';

import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        style={{ tintColor: color }}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};
// `TabIcon` je funkcionalna komponenta koja prikazuje ikonu i tekst ispod nje. Koristi se za stilizaciju i prikaz ikona u navigacionim tabovima.

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#ADD8E6',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 89,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        {/* Definiše ekran `home` sa prilagođenom ikonom i opcijama. `tabBarIcon` koristi `TabIcon` komponentu za prikaz ikone tab-a. */}

        <Tabs.Screen
          name="note"
          options={{
            title: 'Note',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Note"
                focused={focused}
              />
            ),
          }}
        />
        {/* Definiše ekran `note` sa odgovarajućom ikonom. */}

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
        {/* Definiše ekran `profile` sa odgovarajućom ikonom. */}
      </Tabs>
      <StatusBar style="auto" />
      {/* Prikazuje statusnu traku sa automatskim stilom. */}
    </>
  );
}
