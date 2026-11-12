import {Text, View, TouchableOpacity} from "react-native";

import { useAuth } from "@/context/authContext";
export default function Home(){
    const {removeKey} = useAuth();
    return(
        <View className="felx-1 pt-20">
            <Text>Home page</Text>
            <TouchableOpacity
            onPress={() =>removeKey()}
            >
                <Text>Logout</Text>
            </TouchableOpacity>

        </View>
    )
}