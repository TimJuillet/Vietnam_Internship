import { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, TextInput } from "react-native";
import { icons } from "../constants";

const SearchInput = ({ initialQuery, onSearch }) => {
    const [query, setQuery] = useState(initialQuery || "");

    useEffect(() => {
        setQuery(initialQuery || "");
    }, [initialQuery]);

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
            <TextInput
                className="text-base mt-0.5 text-white flex-1 font-pregular"
                value={query}
                placeholder="Search a location"
                placeholderTextColor="#7B7B8B"
                onChangeText={(text) => setQuery(text)}
                onSubmitEditing={handleSearch}
            />

            <TouchableOpacity onPress={handleSearch}>
                <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;