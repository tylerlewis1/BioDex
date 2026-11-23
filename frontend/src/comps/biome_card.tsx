
import { View, Text, Image, Pressable } from "react-native";

type BiomeCardProps = {
    id: number;
    name: string;
    countries: string[];
    onPress?: () => void;
};

const imagesrc = [
    require('@/assets/wildlife_thumbnails/0.png'),
    require('@/assets/wildlife_thumbnails/1.png'),
    require('@/assets/wildlife_thumbnails/2.png'),
    require('@/assets/wildlife_thumbnails/3.png'),
    require('@/assets/wildlife_thumbnails/4.png'),
    require('@/assets/wildlife_thumbnails/5.png'),
    require('@/assets/wildlife_thumbnails/6.png'),
    require('@/assets/wildlife_thumbnails/7.png'),
    require('@/assets/wildlife_thumbnails/8.png'),
    require('@/assets/wildlife_thumbnails/9.png'),
    require('@/assets/wildlife_thumbnails/10.png'),
    require('@/assets/wildlife_thumbnails/11.png'),
    require('@/assets/wildlife_thumbnails/12.png'),
    require('@/assets/wildlife_thumbnails/13.png'),
    require('@/assets/wildlife_thumbnails/14.png'),
    require('@/assets/wildlife_thumbnails/15.png'),
];

export default function AnimalCard({
    id,
    name,
    onPress,
}: BiomeCardProps) {
    const image = imagesrc[id - 1];

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
