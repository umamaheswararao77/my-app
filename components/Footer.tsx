import { View, Text, TouchableOpacity } from "react-native";

export default function Footer() {
  const footerSections = [
    {
      title: "Services",
      items: ["Buy Property", "Rent Property", "Sell Property", "Property Valuation"]
    },
    {
      title: "Company", 
      items: ["About Us", "Contact", "Careers", "Blog"]
    },
    {
      title: "Support",
      items: ["Help Center", "Terms of Service", "Privacy Policy", "FAQ"]
    }
  ];

  return (
    <View className="bg-gray-900 px-6 py-8">
      <View className="mb-6">
        <View className="flex-row items-center mb-4">
          <View className="w-8 h-8 bg-blue-500 rounded-lg items-center justify-center mr-3">
            <Text className="text-white font-bold text-lg">SP</Text>
          </View>
          <Text className="text-xl font-bold text-white">School Prop</Text>
        </View>
        <Text className="text-gray-400 text-sm">
          Making school district property searches simple and effective for families everywhere.
        </Text>
      </View>

      <View className="flex-row justify-between mb-6">
        {footerSections.map((section, index) => (
          <View key={index} className="flex-1 mr-6">
            <Text className="text-white font-semibold mb-3">{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity key={itemIndex} className="mb-2">
                <Text className="text-gray-400 text-sm active:text-white">
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <View className="border-t border-gray-700 pt-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-400 text-sm">
            © 2024 School Prop. All rights reserved.
          </Text>
          <View className="flex-row space-x-4">
            <TouchableOpacity className="bg-blue-500 w-8 h-8 rounded-lg items-center justify-center active:bg-blue-600">
              <Text className="text-white text-xs font-bold">f</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-green-500 w-8 h-8 rounded-lg items-center justify-center active:bg-green-600">
              <Text className="text-white text-xs font-bold">t</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-red-500 w-8 h-8 rounded-lg items-center justify-center active:bg-red-600">
              <Text className="text-white text-xs font-bold">in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-gray-500 text-xs text-center">
          Made with ❤️ for families finding their perfect home
        </Text>
      </View>
    </View>
  );
}
