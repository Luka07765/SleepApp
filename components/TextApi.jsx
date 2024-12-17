import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const ZenQuotesApp = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity value

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://zenquotes.io/api/random');
      const { q, a } = response.data[0];

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setQuote(q);
        setAuthor(a);
        fadeIn();
      });
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
    const intervalId = setInterval(fetchQuote, 7000);
    return () => clearInterval(intervalId);
  }, []);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.quoteContainer, { opacity: fadeAnim }]}>
        <Text style={styles.quoteText}>"{quote}"</Text>
        <Text style={styles.authorText}>- {author}</Text>
      </Animated.View>
      <TouchableOpacity style={styles.button} onPress={fetchQuote}>
        <Text style={styles.buttonText}>Sledeće</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  quoteContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
    color: '#ffffff',
  },
  authorText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#4A90E2', // Light blue button background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25, // Rounded corners
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff', // White text color
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ZenQuotesApp;
