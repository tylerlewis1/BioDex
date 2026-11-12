
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
import authActions from "./auth_actions";
import { useAuth } from "../../context/authContext";
import { useUser } from "@/context/userContext";
export default function Login() {
  const {saveKey} = useAuth();
  const {setUser} = useUser();
  const { signup, login} = authActions();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [screen, setScreen] = useState("login");
  const handleSignup = async() =>{
    setError("");
    let status = await signup({username, email, password, setIsLoading});
    if(status.error){
      setError(status.error);
      return;
    } else if(status.success == true){
      alert("Account created!");
      setScreen("login");
      return;
    }
  }
    const handleLogin = async() =>{
    setError("");
    let status = await login({username, password, setIsLoading, saveKey});
    if(status.error){
      setError(status.error);
      return;
    } else if(status.success == true){
      setUser({
        username: status.data.user.username,
        email: status.data.user.email
      });
      return;
    }
  }

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
            {(error != "") ? (
              <Text className="text-red-500 font-bold">Error: {error}</Text>
            ):(<></>)}
            <TextInput
              placeholder="Username"
              placeholderTextColor="gray"
              value={username}
              keyboardType="email-address"
              className="h-14 rounded-2xl bg-white/10 border border-white/10 px-5 text-white mb-4"
              onChangeText={(username) => setUsername(username)}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry
              value={password}
              className="h-14 rounded-2xl bg-white/10 border border-white/10 px-5 text-white mb-5"
              onChangeText={(password) => setPassword(password)}
            />
            <TouchableOpacity disabled={isLoading} className="h-14 rounded-2xl bg-green-500 items-center justify-center" onPress={() => handleLogin()}>
              <Text className="text-[#071509] font-bold text-lg">
                 Login
              </Text>
            </TouchableOpacity>
            <View className="flex-row justify-center mt-6">
              <Text className="text-white/70">
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity disabled={isLoading} onPress={() => {setScreen("signup"); setError("")}}>
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
            {(error != "") ? (
              <Text className="text-red-500 font-bold">Error: {error}</Text>
            ):(<></>)}
            <TextInput
              placeholder="Username"
              placeholderTextColor="gray"
              value={username}
              className="h-14 rounded-2xl bg-white/10 border border-white/10 px-5 text-white mb-5"
              onChangeText={(username) => setUsername(username)}
            />
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="gray"
              value={email}
              keyboardType="email-address"
              className="h-14 rounded-2xl bg-white/10 border border-white/10 px-5 text-white mb-4"
              onChangeText={(email) => setEmail(email)}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              autoCapitalize="none"
              secureTextEntry
              value={password}
              className="h-14 rounded-2xl bg-white/10 border border-white/10 px-5 text-white mb-5"
              onChangeText={(password) => setPassword(password)}
            />
            <TouchableOpacity 
            disabled={isLoading || username == "" || password == "" || email == ""} 
            className="h-14 rounded-2xl bg-green-500 items-center justify-center"
            onPress={() => {handleSignup()}}
            >
              <Text className="text-[#071509] font-bold text-lg">
                Sign up
              </Text>
            </TouchableOpacity>
            <View className="flex-row justify-center mt-6">
              <Text className="text-white/70">
               Have an account?{" "}
              </Text>
              <TouchableOpacity disabled={isLoading} onPress={() => {setScreen("login"); setError("")}}>
                <Text className="text-green-500 font-bold">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      {isLoading? (
      <View className="absolute inset-0 bg-black/50" />
      ): (<></>)}
    </View>
  );
}
