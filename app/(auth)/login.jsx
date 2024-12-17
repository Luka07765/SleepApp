import { useState } from 'react';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions, Alert, Image } from 'react-native';
import { signIn, getCurrentUser } from '../../lib/appwrite';
import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import { useGlobalContext } from '../../context/GlobalProvider';
const login = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const submit = async () => {
    if (!form.email === '' || !form.password === '') {
      Alert.alert('Error', 'Please fill in all fields');
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();

      if (result) {
        setUser(result);
        setIsLogged(true);
        Alert.alert('Success', 'User signed in successfully');
        router.replace('/home');
      } else {
        setIsLogged(false);
        Alert.alert('Error', 'Failed to retrieve user details');
      }
    } catch (error) {
      setIsLogged(false);
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <View className="flex-row items-center">
            <Image
              source={images.logoSmall}
              className="w-[90px] h-[54px] "
              resizeMode="contain"
            />
            <Text style={{ fontSize: 45 }} className="text-white ">
              Snovi
            </Text>
          </View>

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Prijavite se na Snovi
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Loguj se"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Nemas Nalog ?
            </Text>
            <Link
              href="/register"
              className="text-lg font-psemibold text-blue-200"
            >
              Registracija
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default login;
