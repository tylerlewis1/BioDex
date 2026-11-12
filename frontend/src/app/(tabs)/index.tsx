import {Text, View, TouchableOpacity, ScrollView} from "react-native";

import { useAuth } from "@/context/authContext";
import { useUser } from "@/context/userContext";
export default function Home(){
    const {removeKey} = useAuth();
    const {username, email} = useUser();
    // removeKey();
    console.log("username: ", username);
    return(
        <View className="flex-1 bg-[#021800]">
            <ScrollView>
                {/* Greating */}
                <View className="bg-red-500">
                    <Text>Hello {username}</Text>
                </View>

                
            </ScrollView>
        </View>
    )
}