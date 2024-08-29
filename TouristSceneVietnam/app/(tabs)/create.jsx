import {View, Text, Image} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "../../constants/images";
import Header from "../../components/Header";

const Create = () => {


    return (
        <SafeAreaView className="bg-primary h-full w-full">
            <Header/>
            <View className="justify-center items-center flex-1">
                <Image source={images.empty} resizeMode={"contain"} className="max-w--[380px] w-full h-[300px]"></Image>
                <Text className={"text-white"}>Work in progress</Text>
            </View>
        </SafeAreaView>
    );
}

export default Create;