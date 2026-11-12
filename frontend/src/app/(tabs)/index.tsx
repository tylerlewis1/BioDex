import {Text, View, ScrollView, Image} from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context"; 
import { useUser } from "@/context/userContext";
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function Home(){
    const totalSpeciesInDB = 1658193;
    const insets = useSafeAreaInsets();
    const {username, email} = useUser();
    const [sigtings, setSightings] = useState(568193);
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
                    <View>
                        <Text className="text-white font-medium py-2">Your Biodex</Text>
                        <Text className="text-white font-bold text-4xl py-2">{sigtings.toLocaleString()}<Text className="text-lg text-white/70"> / {totalSpeciesInDB.toLocaleString()}</Text></Text>
                        <Text className="text-white font-light text-sm">species discovered</Text>
                    </View>
                    <View className="m-auto p-5 bg-green-800 rounded-full">
                        <FontAwesome name="paw" color="white" size={30}/>
                    </View>
                </View>
                <View className="flex-1 flex-row justify-between pb-2 mt-2">
                    <View className="bg-green-800 w-[85%] h-[100%] rounded-full">
                        <View className="absolute bg-green-400 h-full rounded-full" style={{width: `${(sigtings/totalSpeciesInDB) * 100}%`}}/>
                    </View>
                    <Text className="text-white mx-auto font-semibold">{Math.round((sigtings/totalSpeciesInDB) * 100)}%</Text>
                </View>
            </View>

                
            </ScrollView>
        </View >
    )
}