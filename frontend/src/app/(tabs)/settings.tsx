import { Text, TouchableOpacity, View} from "react-native";
import { Touchable } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context"; 
import { useUser } from "@/context/userContext";
import {useAuth} from "@/context/authContext";
export default function Settings() {
    const {removeKey} = useAuth();
    const {removeUser} = useUser();
    const insets = useSafeAreaInsets();
    const handleLogout = () => {
        removeKey();
        removeUser();
    }
    return (
        <View className="flex-1 bg-[#010a00]"
            style={{
                paddingTop: insets.top,
            }}
        >
        <TouchableOpacity onPress={handleLogout}>
            <Text className="text-white">Logout</Text>
        </TouchableOpacity>
        </View>
    )
}