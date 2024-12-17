import { SafeAreaView } from 'react-native-safe-area-context';

import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, ScrollView, ImageBackground } from 'react-native';
import images from './../constants/images';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';
export default function Welcome() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <View className="flex-row items-center">
            <Image
              source={images.logoSmall}
              className="w-[130px] h-[84px] "
              resizeMode="contain"
            />
            <Text style={{ fontSize: 65 }} className="text-white ">
              Snovi
            </Text>
          </View>

          <Image
            source={images.cards}
            className="max-w-[390px] w-full h-[410px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Uspavaj se brzo !{'\n'}
              Uz <Text className="text-blue-200">Snovi</Text>
            </Text>
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Gde se Kreativnost Susreće sa Inovacijom: Krenite na Putovanje
            Beskonačne Istraživanja sa Aplikacijom za Spavanje
          </Text>
          <CustomButton
            title="Nastavi Ovde"
            handlePress={() => router.push('/login')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
