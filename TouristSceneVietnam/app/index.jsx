import {Image, ScrollView, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Redirect, router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from '../constants';
import CustomButton from "../components/CustomButton";

export default function App() {
    return (
        <SafeAreaView className={'bg-primary h-full'}>
            <View className={"justify-center items-center flex-1"}>

                <CustomButton
                    title={"Enter the application"}
                    handlePress={() => router.push('/home')}
                    containerStyles={"w-full mt-7"}
                />
            </View>

                    <StatusBar backgroundColor={'#161622'} style='light'/>
        </SafeAreaView>
    );
}
