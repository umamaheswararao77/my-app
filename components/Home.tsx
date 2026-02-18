import { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Navbar from "./Navbar";
import SlidingMenu from "./SlidingMenu";
import MainSection from "./MainSection";
import Footer from "./Footer";

interface HomeProps {
  onLogout: () => void;
}

export default function Home({ onLogout }: HomeProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuPress = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <SlidingMenu isVisible={isMenuOpen} onClose={handleMenuClose} />
      <Navbar onMenuPress={handleMenuPress} />
      <ScrollView className="flex-1">
        <MainSection />
        <Footer />
      </ScrollView>
    </View>
  );
}
