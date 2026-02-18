import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useEffect, useRef } from "react";

interface SlidingMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function SlidingMenu({ isVisible, onClose }: SlidingMenuProps) {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible]);

  const menuItems = [
    { title: "Buy", color: "green" },
    { title: "Rent", color: "blue" },
    { title: "Sell", color: "red" },
    { title: "Help", color: "gray" },
  ];

  if (!isVisible) return null;

  return (
    <>
      <TouchableOpacity 
        className="absolute inset-0 bg-black bg-opacity-50 z-10"
        onPress={onClose}
        activeOpacity={1}
      />
      <Animated.View 
        className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-20"
        style={{ transform: [{ translateX: slideAnim }] }}
      >
        <View className="p-6 border-b border-gray-200">
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-bold text-gray-900">Menu</Text>
            <TouchableOpacity 
              onPress={onClose}
              className="p-2 rounded-lg bg-gray-100 active:bg-gray-200"
            >
              <Text className="text-xl font-bold text-gray-700">×</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View className="flex-1 p-4">
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              className={`p-4 rounded-xl mb-3 bg-${item.color}-50 active:bg-${item.color}-100 border border-${item.color}-200`}
            >
              <Text className={`text-lg font-semibold text-${item.color}-700`}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </>
  );
}
