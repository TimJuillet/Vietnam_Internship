import {View, Text, FlatList, Image, RefreshControl} from "react-native";
import React, {useState, useEffect} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "../../constants/images";
import SearchInput from "../../components/SearchInput";
import ImageCard from "../../components/ImageCard";
import IMAGES from "../../constants/desc";
import {router} from "expo-router";

const Places = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [activeItem, setActiveItem] = useState();
    const [filteredImages, setFilteredImages] = useState(IMAGES);
    const [searchQuery, setSearchQuery] = useState("");

    const onRefresh = () => {
        setRefreshing(true);
        setRefreshing(false);
    };

    const viewableItemsChanged = ({viewableItems}) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].item.$id);
        }
    }

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    }

    useEffect(() => {
        if (searchQuery) {
            const filtered = IMAGES.filter(item => {
                const title = item.name ? item.name.toLowerCase() : '';
                const description = item.desc ? item.desc.toLowerCase() : '';
                const query = searchQuery.toLowerCase();
                return title.includes(query) || description.includes(query);
            });
            setFilteredImages(filtered);
        } else {
            setFilteredImages(IMAGES);
        }
    }, [searchQuery]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <SafeAreaView className='bg-primary h-full pt-4'>
            <FlatList
                data={filteredImages}
                keyExtractor={(item) => item.$id}
                renderItem={({item}) => (
                    <ImageCard image={item} activeItem={activeItem} handlePress={() =>  router.push({
                        pathname: "/infos",
                        params: { item: JSON.stringify(item) }
                    })}/>
                )}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewabilityConfig}

                ListHeaderComponent={() => (
                    <View className="my-6px px-4 space-y-6">
                        <View className="justify-between items-start flex-row mb-6">
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
                        <SearchInput initialQuery={searchQuery} onSearch={handleSearch}/>
                        <View className="h-4"></View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <Text className="text-center text-gray-100">
                        No results found
                    </Text>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            />
        </SafeAreaView>
    );
}

export default Places;