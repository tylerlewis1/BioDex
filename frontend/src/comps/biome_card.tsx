import { View, Text, Image } from "react-native";
type BiomeCardProps = {
    id: number
    name: string
    countries: string[]
}
export default function BiomeCard({id, name, countries}: BiomeCardProps) {
    return(
        <View>
            <Image source={require(`@/assets/biome_thumbnails/${id}.png`)}/>
            <Text>{name}</Text>
            <Text>{countries}</Text>
        </View>
    )
}