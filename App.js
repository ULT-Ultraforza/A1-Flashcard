import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  Switch,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Material 3 theme
const M3 = {
  surface: '#1C1B1F',
  surfaceContainer: '#211F26',
  surfaceContainerHigh: '#2B2930',
  surfaceContainerHighest: '#36343B',
  surfaceVariant: '#49454F',
  onSurface: '#E6E1E5',
  onSurfaceVariant: '#CAC4D0',
  outline: '#938F99',
  outlineVariant: '#49454F',
  primary: '#D0BCFF',
  onPrimary: '#381E72',
  primaryContainer: '#4F378B',
  onPrimaryContainer: '#EADDFF',
  secondaryContainer: '#4A4458',
  onSecondaryContainer: '#E8DEF8',
  tertiary: '#6750A4',
  tertiaryContainer: '#EADDFF',
  onTertiaryContainer: '#21005D',
};

export default function Flashcards() {
  const [cards, setCards] = useState([
    { id: 1, question: 'What is React Native?', answer: 'JS for mobile apps.', mastered: false },
    { id: 2, question: 'Expo start?', answer: 'npx expo start', mastered: false },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const addCard = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      setCards([...cards, {
        id: Date.now(),
        question: newQuestion.trim(),
        answer: newAnswer.trim(),
        mastered: false
      }]);
      setNewQuestion('');
      setNewAnswer('');
    }
  };

  const toggleShow = () => setShowAnswer(!showAnswer);
  const toggleMastered = () => {
    const newCards = [...cards];
    newCards[currentIndex].mastered = !newCards[currentIndex].mastered;
    setCards(newCards);
  };

  const currentCard = cards[currentIndex] || cards[0];

  return (
    <ScrollView style={styles.container}>
      <Image source={require('./assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Flashcards - COMP-265 A1{'\n'}Thomas Calabria</Text>
      
      <View style={styles.card}>
        <Text style={styles.question}>{currentCard.question}</Text>
        {showAnswer && <Text style={styles.answer}>{currentCard.answer}</Text>}
        <View style={styles.buttonRow}>
          <Pressable style={({ pressed }) => [styles.m3Button, styles.m3ButtonTonal, pressed && styles.m3ButtonPressed]} onPress={toggleShow}>
            <Text style={styles.m3ButtonLabel}>{showAnswer ? 'Hide' : 'Show Answer'}</Text>
          </Pressable>
        </View>
        <View style={styles.switchRow}>
          <Switch
            value={currentCard.mastered}
            onValueChange={toggleMastered}
            trackColor={{ false: M3.surfaceVariant, true: M3.primaryContainer }}
            thumbColor={currentCard.mastered ? M3.primary : M3.outlineVariant}
          />
          <Text style={styles.switchLabel}>Mastered</Text>
        </View>
        <View style={styles.buttonRow}>
          <Button title="Prev" onPress={() => setCurrentIndex((currentIndex + cards.length - 1) % cards.length)} color={M3.primary} />
          <Button title="Next" onPress={() => setCurrentIndex((currentIndex + 1) % cards.length)} color={M3.primary} />
        </View>
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Add New Card</Text>
        <TextInput
          style={styles.input}
          placeholder="Question"
          placeholderTextColor={M3.onSurfaceVariant}
          value={newQuestion}
          onChangeText={setNewQuestion}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Answer"
          placeholderTextColor={M3.onSurfaceVariant}
          value={newAnswer}
          onChangeText={setNewAnswer}
          multiline
        />
        <Picker style={styles.picker}>
          <Picker.Item label="General" value="general" />
          <Picker.Item label="React Native" value="rn" />
        </Picker>
        <Pressable style={({ pressed }) => [styles.m3Button, styles.m3ButtonFilled, pressed && styles.m3ButtonPressed]} onPress={addCard}>
          <Text style={styles.m3ButtonLabelFilled}>Add Card</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>All Cards ({cards.length})</Text>
      {cards.map((card, idx) => (
        <View key={card.id} style={[styles.historyItem, card.mastered && styles.masteredItem]}>
          <Text style={[styles.historyItemText, card.mastered && styles.historyItemTextMastered]}>{idx + 1}. {card.question.length > 30 ? `${card.question.substring(0, 30)}...` : card.question}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: M3.surface,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
    color: M3.onSurface,
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: 0,
  },
  card: {
    backgroundColor: M3.surfaceContainerHigh,
    padding: 24,
    borderRadius: 28,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: M3.outlineVariant,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  question: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 12,
    color: M3.onSurface,
  },
  answer: {
    fontSize: 16,
    lineHeight: 24,
    color: M3.primary,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 8,
    flexWrap: 'wrap',
  },
  m3Button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    minHeight: 40,
    justifyContent: 'center',
  },
  m3ButtonTonal: {
    backgroundColor: M3.secondaryContainer,
  },
  m3ButtonFilled: {
    backgroundColor: M3.primary,
    width: '100%',
    alignItems: 'center',
  },
  m3ButtonPressed: {
    opacity: 0.8,
  },
  m3ButtonLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: M3.onSecondaryContainer,
  },
  m3ButtonLabelFilled: {
    fontSize: 14,
    fontWeight: '500',
    color: M3.onPrimary,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  switchLabel: {
    marginLeft: 12,
    fontSize: 14,
    color: M3.onSurfaceVariant,
  },
  form: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: M3.onSurface,
    marginVertical: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: M3.outline,
    padding: 16,
    borderRadius: 12,
    backgroundColor: M3.surfaceContainerHighest,
    marginBottom: 12,
    fontSize: 16,
    color: M3.onSurface,
  },
  picker: {
    height: 56,
    backgroundColor: M3.surfaceContainerHighest,
    borderRadius: 12,
    marginBottom: 12,
    color: M3.onSurface,
  },
  historyItem: {
    backgroundColor: M3.surfaceContainer,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: M3.outlineVariant,
  },
  masteredItem: {
    backgroundColor: M3.primaryContainer,
    borderColor: M3.primary,
  },
  historyItemText: {
    fontSize: 14,
    color: M3.onSurface,
  },
  historyItemTextMastered: {
    color: M3.onPrimaryContainer,
  },
});
