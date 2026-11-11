import {Text, TextInput, View} from "react-native";
export default function Login() {
  return (
    <View className="flex-1 bg-green-900">
      <View className="felx">
        <Text className="text-white text-center">Log in</Text>

      </View>
      <View className="felx-3">
        <TextInput className="text-white" placeholder="Test input"/>
      </View>
    </View>
  );
}
