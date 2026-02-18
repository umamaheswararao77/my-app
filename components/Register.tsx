import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

interface RegisterProps {
  onRegister: (name: string, email: string, password: string) => void;
  onBackToLogin: () => void;
}

export default function Register({ onRegister, onBackToLogin }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !password) {
      alert("Please fill in all details.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    onRegister(name, email, password);
  };

  return (
    <View className="flex-1 bg-white items-center justify-center p-6">
      <StatusBar style="dark" />
      <View className="w-full max-w-sm bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-2xl">
        <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Create an Account
        </Text>

        <TextInput
          placeholder="Name"
          placeholderTextColor="#6b7280"
          value={name}
          onChangeText={setName}
          className="w-full bg-white text-gray-900 px-5 py-4 rounded-xl mb-4 border border-gray-300 focus:border-green-500"
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#6b7280"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          className="w-full bg-white text-gray-900 px-5 py-4 rounded-xl mb-4 border border-gray-300 focus:border-green-500"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#6b7280"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          className="w-full bg-white text-gray-900 px-5 py-4 rounded-xl mb-4 border border-gray-300 focus:border-green-500"
        />

        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#6b7280"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          className="w-full bg-white text-gray-900 px-5 py-4 rounded-xl mb-6 border border-gray-300 focus:border-green-500"
        />

        <TouchableOpacity 
          onPress={handleSubmit}
          className="w-full bg-green-500 py-4 rounded-xl active:bg-green-600"
        >
          <Text className="text-white text-center font-bold text-lg">
            Register
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={onBackToLogin}
          className="mt-6"
        >
          <Text className="text-gray-600 text-center">
            Already have an account? <Text className="text-green-500 font-bold">Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
