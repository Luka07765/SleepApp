import { useState } from 'react';
// `useState` hook omogućava upravljanje lokalnim stanjem unutar komponente.

import { SafeAreaView } from 'react-native-safe-area-context';
// `SafeAreaView` osigurava da se sadržaj ne preklapa sa sistemskim elementima poput statusne trake.

import { FlatList, Image, RefreshControl, Text, View } from 'react-native';
// Komponente `FlatList`, `Image`, `RefreshControl`, `Text`, i `View` koriste se za prikazivanje liste, slika, teksta i upravljanje osvježavanjem liste.

import { images } from '../../constants';
// `images` sadrži definisane slike koje se koriste u aplikaciji.

import useAppwrite from '../../lib/useAppwrite';
// `useAppwrite` je prilagođeni hook za integraciju sa Appwrite backendom.

import { getAllPosts, getLatestPosts } from '../../lib/appwrite';
// `getAllPosts` dohvaća sve postove, dok `getLatestPosts` dohvaća najnovije postove.

import { EmptyState, SearchInput, Trending, VideoCard } from '../../components';
// `EmptyState` prikazuje poruku kada nema sadržaja, `SearchInput` omogućava pretragu, `Trending` prikazuje trending sadržaje, a `VideoCard` prikazuje pojedinačni video.

import ZenQuotesApp from '../../components/TextApi';
// `ZenQuotesApp` prikazuje motivacioni citat korišćenjem API-ja.

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  // `useAppwrite` hook se koristi za dohvaćanje podataka o postovima. `posts` sadrži sve postove, a `latestPosts` sadrži najnovije postove.

  const [refreshing, setRefreshing] = useState(false);
  // `refreshing` prati da li se lista osvežava.

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  // `onRefresh` funkcija osvežava podatke kada korisnik povuče listu nadole.

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        // `FlatList` prikazuje listu video kartica. Svaka kartica koristi `VideoCard` komponentu za prikaz video informacija.

        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Dobrodosao Nazad
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Snovi
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
              </View>
            </View>
            {/* Zaglavlje liste koje prikazuje pozdrav i logo. */}

            <SearchInput />
            {/* Komponenta za pretragu. */}

            <ZenQuotesApp />
            {/* Prikazuje motivacioni citat. TO JE MOJ API */}

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Video Snimci
              </Text>

              <Trending posts={latestPosts ?? []} />
              {/* Prikazuje trending video snimke koristeći `Trending` komponentu. */}
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="Nema Video" subtitle="Kreiraj Video" />
        )}
        // Prikazuje prazno stanje kada nema dostupnih video snimaka.

        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        // Dodaje kontrolu za osvežavanje liste.
      />
    </SafeAreaView>
  );
};

export default Home;
// Eksportuje `Home` komponentu kao podrazumevani (default) eksport.
