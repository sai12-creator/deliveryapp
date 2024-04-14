import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { XMarkIcon }  from 'react-native-heroicons/solid';
import  * as  Progress  from 'react-native-progress';
import { selectRestaurantItems } from '../Features/RestaurantSlice';
import { useSelector, useDispatch } from 'react-redux'
import MapView, {Marker} from 'react-native-maps';

const DeliveryScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurantItems)
  return (
    <View className='bg-[#00CCBB] flex-1'>
      <SafeAreaView className='z-50'>
        <View className='flex-row justify-between p-5 items-center'>
            <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
                <XMarkIcon color='#fff' size={30}/>
            </TouchableOpacity>
            <Text className='text-lg text-white font-light'>Order Help</Text>
        </View>
        <View className='bg-white z-50 p-6 my-2 mx-5 rounded-md shadow-md'>
            <View className='flex-row justify-between'>
            <View>
                <Text className='text-lg text-gray-400'>Estimated Arrival</Text>
                <Text className='text-4xl font-bold'>45-70 Minutes</Text>
            </View>
            <Image
            source={{uri:'https:/links.papareact.com/fls'}}
            className='h-20 w-20'
            />
            </View>
            <Progress.Bar  size={30} indeterminate={true} color='#00CCBB'/>
            <Text className='mt-3 text-gray-400'>Your order at {restaurant.title} is being prepared.</Text>
        </View>
      </SafeAreaView>
      <MapView
      initialRegion={{
        latitude: restaurant.lat,
        longitude: restaurant.long,
        latitudeDelta: 0.05,
        longitudeDelta:0.05
      }}
      className='flex-1 -mt-10 z-0'
      mapType='mutedStandard'>
        <Marker
        coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
        }}
        identifier='origin'
        title={restaurant.title}
        pinColor='#00CCBB'
        description={restaurant.short_description}/>
      </MapView>
      <SafeAreaView className='bg-white flex-row items-center space-x-5 h-28'>
        <Image
        source={{ uri: 'http://links.papareact.com/wru' }}
        className='h-12 w-12 bg-gray-300 p-4 rounded-full ml-5'
        />
        <View className='flex-1'>
            <Text className='text-lg'>Soni Sangha</Text>
            <Text className='text-gray-400'>Your Rider</Text>
        </View>
        <Text className='text-[#00CCBB] text-lg font-bold mr-5'>Call</Text>
      </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen