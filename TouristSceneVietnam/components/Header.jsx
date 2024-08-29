import {Image, Text, View} from "react-native";
import images from "../constants/images";
import React from "react";

const Header = () => {
    return (
        <View className="my-6px px-4 mt-4">
            <View className="justify-between items-start flex-row">
                <View>
                    <Text className='font-psemibold text-sm text-gray-100'>
                        Discover the wonders of
                    </Text>
                    <Text className="text-white text-2xl font-psemibold">
                        Vietnam
                    </Text>
                </View>
                <View className="mt-1.5 mr-2">
                    <Image source={images.flag}
                           className={"w-10 h-11"}
                           resizeMode={"contain"}
                    />
                </View>
            </View>
        </View>
    )
}

export default Header;