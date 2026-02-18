import { View, Text, TouchableOpacity, StatusBar } from "react-native";

interface NavbarProps {
  onMenuPress: () => void;
}

export default function Navbar({ onMenuPress }: NavbarProps) {
  return (
    <View className="bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />
      <View className="bg-white border-b border-gray-200 px-6 py-4 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="w-8 h-8 bg-blue-500 rounded-lg items-center justify-center mr-3">
            <Text className="text-white font-bold text-lg">SP</Text>
          </View>
          <Text className="text-xl font-bold text-gray-900">School Prop</Text>
        </View>
        
        <TouchableOpacity 
          onPress={onMenuPress}
          className="p-2 rounded-lg bg-gray-100 active:bg-gray-200"
        >
          <View className="w-6 h-0.5 bg-gray-700 mb-1.5"></View>
          <View className="w-6 h-0.5 bg-gray-700 mb-1.5"></View>
          <View className="w-6 h-0.5 bg-gray-700"></View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
