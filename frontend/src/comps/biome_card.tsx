
import { View, Text, Image, Pressable } from "react-native";

type BiomeCardProps = {
    id: number;
    name: string;
    countries: string[];
    onPress?: () => void;
};

const imagesrc: Record<number, any> = {
    17: require('@/assets/biome_thumbnails/1.png'),
    0: require('@/assets/biome_thumbnails/2.png'),
    16: require('@/assets/biome_thumbnails/3.png'),
    15: require('@/assets/biome_thumbnails/4.png'),
    14: require('@/assets/biome_thumbnails/5.png'),
    13: require('@/assets/biome_thumbnails/6.png'),
    12: require('@/assets/biome_thumbnails/7.png'),
    11: require('@/assets/biome_thumbnails/8.png'),
    10: require('@/assets/biome_thumbnails/9.png'),
    9: require('@/assets/biome_thumbnails/10.png'),
    8: require('@/assets/biome_thumbnails/11.png'),
    7: require('@/assets/biome_thumbnails/12.png'),
    6: require('@/assets/biome_thumbnails/13.png'),
    5: require('@/assets/biome_thumbnails/14.png'),
    4: require('@/assets/biome_thumbnails/15.png'),
    3: require('@/assets/biome_thumbnails/16.png'),
    2: require('@/assets/biome_thumbnails/17.png'),
    1: require('@/assets/biome_thumbnails/18.png'),
};

export default function BiomeCard({
    id,
    name,
    onPress,
}: BiomeCardProps) {
    const image = imagesrc[id];

    return (
        <Pressable
            onPress={onPress}
            className="w-[48%] overflow-hidden rounded-2xl bg-[#14251C] border border-white/10 active:opacity-80"
            style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.97 : 1 }],
            })}
        >
            <View>
                {image ? (
                    <Image
                        source={image}
                        className="w-full h-44"
                        resizeMode="cover"
                    />
                ) : (
                    <View className="w-full h-44 bg-[#263D30] items-center justify-center">
                        <Text className="text-white/50 text-xs">
                            No image available
                        </Text>
                    </View>
                )}

                <View className="absolute inset-0 bg-black/10" />
            </View>
            <View className="flex-row items-center justify-between px-3 py-3">
                <Text
                    className="text-white text-sm font-bold flex-1 mr-2"
                    numberOfLines={2}
                >
                    {name}
                </Text>

                <View className="w-7 h-7 rounded-full bg-[#294735] items-center justify-center">
                    <Text className="text-[#C6E5C9] text-base">
                        →
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}
