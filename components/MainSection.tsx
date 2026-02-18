import { View, Text, TouchableOpacity } from "react-native";

export default function MainSection() {
  const features = [
    {
      title: "Find Your Dream Property",
      description: "Browse through our extensive collection of properties near schools",
      color: "blue",
      icon: "🏠"
    },
    {
      title: "List Your Property",
      description: "Reach thousands of families looking for the perfect school district home",
      color: "green", 
      icon: "📋"
    },
    {
      title: "Expert Guidance",
      description: "Get professional advice on school districts and property values",
      color: "red",
      icon: "👨‍💼"
    }
  ];

  return (
    <View className="bg-gray-50">
      <View className="p-6">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to School Prop
          </Text>
          <Text className="text-lg text-gray-600 mb-6">
            Your trusted partner in finding the perfect home near the best schools. 
            We connect families with properties in top-rated school districts.
          </Text>
          <TouchableOpacity className="bg-blue-500 py-4 px-8 rounded-xl active:bg-blue-600 self-start">
            <Text className="text-white font-bold text-lg">Get Started</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</Text>
          {features.map((feature, index) => (
            <View key={index} className={`bg-white p-6 rounded-xl mb-4 border-l-4 border-${feature.color}-500 shadow-sm`}>
              <View className="flex-row items-start">
                <Text className="text-3xl mr-4">{feature.icon}</Text>
                <View className="flex-1">
                  <Text className={`text-xl font-semibold text-gray-900 mb-2`}>
                    {feature.title}
                  </Text>
                  <Text className="text-gray-600">
                    {feature.description}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View className="bg-gradient-to-r from-blue-500 to-green-500 p-6 rounded-xl mb-8">
          <Text className="text-2xl font-bold text-black-500 mb-3">
            Special Offer
          </Text>
          <Text className="text-pink-500 mb-4 ">
            Get 20% off on your first property listing with us. Limited time offer!
          </Text>
          <TouchableOpacity className="bg-blue-100 py-3 px-6 rounded-lg active:bg-gray-200 self-start">
            <Text className="text-blue-500 font-bold active:bg-blue-600">Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
