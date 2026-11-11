
import {
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {useState} from "react";
import { useAuth } from "../../context/authContext";
export default function Login() {
  const { isLoading, saveKey, removeKey } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [screen, setScreen] = useState("login");
  return (
    <View className="flex-1 bg-[#06140d]">
      {/* Background stuff */}
      <Image
        source={require("../../../assets/images/login_bg.png")}
        resizeMode="cover"
        className="absolute inset-0 w-full h-full"
      />
      <View className="absolute inset-0 bg-black/20" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-between"
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center pt-16">
            <Image
              source={require("../../../assets/images/biodex_logo.png")}
              resizeMode="contain"
              className="w-auto h-[15em] mt-5"
            />
          </View>

          {/* Form */}
          {(screen == "login") ? (
          <View className="mx-6 mb-12 rounded-[30px] bg-black/60 border border-white/10 p-6">
            <Text className="text-white text-2xl font-bold mb-2">
              Welcome Back To Biodex
            </Text>
            <Text className="text-white/60 mb-6">
              Sign in to continue exploring your Biodex.
            </Text>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="gray"
              keyboardType="email-address"
              className="h-14 rounded-2xl bg-white/10 border border-white/10 px-5 text-white mb-4"
              onChangeText={(email) => setEmail(email)}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry
              className="h-14 rounded-2xl bg-white/10 border border-white/10 px-5 text-white mb-5"
              onChangeText={(password) => setPassword(password)}
            />
            <TouchableOpacity disabled={isLoading} className="h-14 rounded-2xl bg-green-500 items-center justify-center">
              <Text className="text-[#071509] font-bold text-lg">
                Sign In
              </Text>
            </TouchableOpacity>
            <View className="flex-row justify-center mt-6">
              <Text className="text-white/70">
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity disabled={isLoading} onPress={() => setScreen("signup")}>
                <Text className="text-green-500 font-bold">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          ): (
            <View className="mx-6 mb-12 rounded-[30px] bg-black/60 border border-white/10 p-6">
            <Text className="text-white text-2xl font-bold mb-2">
              Welcome To Biodex
            </Text>
            <Text className="text-white/60 mb-6">
               Sign up to start your Biodex.
            </Text>
            <TextInput
              placeholder="Username"
              placeholderTextColor="gray"
              secureTextEntry
              className="h-14 rounded-2xl bg-white/10 border border-white/10 px-5 text-white mb-5"
              onChangeText={(username) => setUsername(username)}
            />
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="gray"
              keyboardType="email-address"
              className="h-14 rounded-2xl bg-white/10 border border-white/10 px-5 text-white mb-4"
              onChangeText={(email) => setEmail(email)}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry
              className="h-14 rounded-2xl bg-white/10 border border-white/10 px-5 text-white mb-5"
              onChangeText={(password) => setPassword(password)}
            />
            <TouchableOpacity disabled={isLoading} className="h-14 rounded-2xl bg-green-500 items-center justify-center">
              <Text className="text-[#071509] font-bold text-lg">
                Sign In
              </Text>
            </TouchableOpacity>
            <View className="flex-row justify-center mt-6">
              <Text className="text-white/70">
               Have an account?{" "}
              </Text>
              <TouchableOpacity disabled={isLoading} onPress={() => setScreen("login")}>
                <Text className="text-green-500 font-bold">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
