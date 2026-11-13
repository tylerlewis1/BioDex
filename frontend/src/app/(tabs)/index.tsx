import {Text, View, ScrollView, Image} from "react-native";
import { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context"; 
import { useUser } from "@/context/userContext";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getStats } from "../server_actions/actions";
import { useAuth } from "@/context/authContext";
export default function Home(){
    const totalSpecies = 1658193;
    const insets = useSafeAreaInsets();
    const {token, removeKey} = useAuth();
    const {username, email, id} = useUser();
    const [sigtings, setSightings] = useState(0);
   useEffect(() => {
    let isActive = true;
    const fetchStats = async () => {
        if (!token || !id) return;
        try {
            const stats = await getStats(token, id);
            if (isActive && stats !== undefined) {
                setSightings(stats.species_sighted);
            }
        } catch (error) {
            if (isActive) {
                console.error("Failed to fetch stats:", error);
            }
        }
    };
  fetchStats();
  return () => {
    isActive = false;
  };
}, [id, token]);
    return(
        <View className="flex-1 bg-[#010a00]"
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}
        >
            <View className="px-[10%]">
               <Image source={require("../../../assets/images/text_logo.png")} className="w-[50%] h-[50px] m-auto"/>
            </View>
            <ScrollView className="flex-1 p-4">
            <View className="bg-green-950/70 w-[95%] m-5 p-3 m-auto rounded-3xl">
                <View className="felx flex-row justify-between gap-[3em] py-2">
                    <View className="w-[65%]">
                        <Text className="text-white font-medium py-2">Your Biodex</Text>
                        <Text className="text-white font-bold text-4xl py-2">{sigtings.toLocaleString()}<Text className="text-lg text-white/70"> / {totalSpecies.toLocaleString()}</Text></Text>
                        <Text className="text-white font-light text-sm">species discovered</Text>
                    </View>
                    <View className="m-auto p-5 bg-green-800 rounded-full">
                        <FontAwesome name="paw" color="white" size={30}/>
                    </View>
                </View>
                <View className="flex-1 flex-row justify-between pb-2 mt-2">
                    <View className="bg-green-800 w-[85%] h-[100%] rounded-full">
                        <View className="absolute bg-green-400 h-full rounded-full" style={{width: `${(sigtings/totalSpecies) * 100}%`}}/>
                    </View>
                    <Text className="text-white mx-auto font-semibold">{Math.round((sigtings/totalSpecies) * 100)}%</Text>
                </View>
            </View>

                
            </ScrollView>
        </View >
    )
}