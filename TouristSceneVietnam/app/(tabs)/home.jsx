import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    ScrollView,
    RefreshControl,
    ActivityIndicator
} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import {router} from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import icons from "../../constants/icons";
import images from "../../constants/images";
import SearchInput from "../../components/SearchInput";
import Header from "../../components/Header";
import axios from 'axios';
import IMAGES from "../../constants/desc";


const Home = () => {

    const [chosenImage, setChosenImage] = useState(IMAGES);
    const [image, setImage] = useState(icons.camera);
    const [refreshing, setRefreshing] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false)
    const [predictionResult, setPredictionResult] = useState(null);


    const onRefresh = () => {
        setRefreshing(true);
        setImage(icons.camera)
        setRefreshing(false);
    };

    const predictImage = async (imageUri) => {
        setIsProcessing(true);
        setPredictionResult(null); // Clear previous result
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: imageUri,
                type: 'image/jpeg',
                name: 'image.jpg',
            });

            const response = await axios.post('http://192.168.57.156:8000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Extract the prediction value from the response
            const predictionValue = response.data.prediction;
            console.log('Prediction:', predictionValue);

            // Find the matching image
            const matchedImage = IMAGES.find((img) => img.$id === predictionValue.toString());

            if (matchedImage) {
                // Navigate to the info page with the matched image
                router.push({
                    pathname: "/infos",
                    params: { item: JSON.stringify(matchedImage) }
                });
            } else {
                console.error('No matching image found for prediction:', predictionValue);
            }

            // Update state (this will happen after navigation)
            setPredictionResult(predictionValue);
            setChosenImage(matchedImage);

        } catch (error) {
            console.error('Error predicting image:', error);
            setPredictionResult('Error');
        } finally {
            setIsProcessing(false);
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            await predictImage(result.assets[0].uri);
        }
    };

    const takePicture = async () => {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            await predictImage(result.assets[0].uri);
        }
    };


    return (
        <SafeAreaView className="bg-primary h-full w-full">
            <ScrollView contentContainerStyle={{flex: 1}}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            >
                <Header/>

                <View className="flex-1 items-center justify-center px-4">
                    <Text className="text-white text-2xl font-psemibold">Take a picture</Text>
                    <TouchableOpacity className="w-72 h-72 mb-10 bg-gray-700 rounded-xl mt-4"
                                      onPress={() => takePicture()}>
                        {image && <ImageBackground source={image === icons.camera ? image : {uri: image}}
                                                   className="w-full h-full rounded-lg overflow-hidden shadow-black/40"
                                                   resizeMode={"cover"}></ImageBackground>}
                    </TouchableOpacity>
                    <Text className="text-white text-2xl font-psemibold">OR</Text>
                    <CustomButton
                        title={"Choose from gallery"}
                        handlePress={() => pickImage()}
                        containerStyles="w-full mt-7"
                    />
                </View>
            </ScrollView>

            {isProcessing && (
                <View>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style="mt-5 p-3 bg-white rounded-lg">Processing image...</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

export default Home;