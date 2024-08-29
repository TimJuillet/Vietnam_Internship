import {Image, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useLocalSearchParams} from "expo-router";
import Header from "../components/Header";

const Infos = () => {
    const {item} = useLocalSearchParams();
    const parsedItem = item ? JSON.parse(item) : null;

    if (!parsedItem) {
        return (
            <SafeAreaView className="h-full bg-primary">
                <Text className="text-white text-2xl">Item not found</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="h-full bg-primary">
            <Header/>
            <View className="px-2 mt-4">
                <View className="bg-gray-900 rounded-xl">
                    <View className="flex-row p-1 mt-6">
                        <Image source={parsedItem.link} className="w-1/2 ml-4 h-48 rounded-lg" resizeMode="cover"/>
                        <View className="flex-1 ml-4 justify-center">
                            <Text className="text-white text-3xl font-bold">{parsedItem.name}</Text>
                        </View>
                    </View>
                    <Text className="text-white text-lg mt-6 px-2 mb-6">{parsedItem.desc}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Infos;