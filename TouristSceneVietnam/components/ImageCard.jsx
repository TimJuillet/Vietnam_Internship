import {useState} from "react";
import {router, usePathname} from "expo-router";
import {View, TouchableOpacity, Image, TextInput, Alert, Text, FlatList, ImageBackground} from "react-native";
import IMAGES from "../constants/desc";
import * as Animatable from "react-native-animatable";


const ImageCard = ({image, activeItem, handlePress}) => {

    //const ImageData = require('../assets/desc.jsx');

    const zoomIn = {
        0: {
            scale: 0.9,
        },
        1: {
            scale: 1,
        },
    };

    const zoomOut = {
        0: {
            scale: 1,
        },
        1: {
            scale: 0.9,
        },
    };

    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="justify-center flex-1 ml-3 gap-1">
                        <Text className="text-white font-psemibold ml-3 text-2xl" numberOfLines={1}>{image.name}</Text>
                    </View>
                </View>

            </View>
            <Animatable.View
                className="w-full h-60 rounded-lg mt-1 relative justify-center items-center"
                animation={activeItem === image.$id ? zoomIn : zoomOut}
                duration={500}
            >
                <TouchableOpacity className="w-full rounded-lg relative justify-center items-center" activeOpacity={0.7} onPress={handlePress}>
                    <ImageBackground source={image.link} className="w-full h-full rounded-lg mt-3 overflow-hidden shadow-lg shadow-black/40" resizeMode={"cover"}></ImageBackground>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
};

export default ImageCard;
