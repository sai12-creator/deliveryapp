import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { urlFor } from '../sanity'
import {useDispatch} from 'react-redux'
import {
    StarIcon,
    MapPinIcon,
} from 'react-native-heroicons/solid'
import {
    ArrowLeftIcon,
    QuestionMarkCircleIcon,
    ChevronRightIcon
} from 'react-native-heroicons/outline'
import DishRow from '../components/DishRow'
import BasketIcon from '../components/BasketIcon'
import { setToRestaurant } from '../Features/RestaurantSlice'
const RestaurantScreen = () => {
    const {
        params: {
            id = null,
            imgUrl = null,
            title = null,
            rating = null,
            adress= null,
            genre = null,
            short_description = null,
            dishes = null,
            long = null,
            lat = null,
        },
    } = useRoute()
    const navigation = useNavigation();
    const dispatch = useDispatch()
    useEffect(()=>{
       dispatch(setToRestaurant({id,
       imgUrl,
       title,
       rating,
       adress,
       genre,
       short_description,
       dishes,
       long,
       lat}))
    },[])
    useLayoutEffect(() => {
        navigation.setOptions(
            { headerShown: false }
        )
    }, [])
    return (
        <>
        <BasketIcon/>
        <ScrollView>
            <View className='relative'>
                <Image
                    source={{
                        uri: urlFor(imgUrl).url()
                    }
                    }
                    className='w-full h-56 bg-gray-300 p-4'
                />
                <TouchableOpacity onPress={navigation.goBack} className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'>
                    <ArrowLeftIcon size={22} color='#00CCBB' />
                </TouchableOpacity>
            </View>
            <View className='bg-white'>
                <View className='px-4 pt-4'>
                    <Text className='text-3xl font-bold'>{title}</Text>
                    <View className='flex-row items-center space-x-2 my-1'>
                        <View className='flex-row items-center space-x-1'>
                            <StarIcon color='green' opacity={0.5} size={22} />
                            <Text style={{ color: 'gray', fontSize: 8, lineHeight: 8 }}>
                                <Text className='shadow' style={{ color: 'green' }}>{rating}</Text>.{genre}
                            </Text>
                        </View>
                        <View className='flex-row items-center space-x-1'>
                            <MapPinIcon color='gray' opacity={0.4} size={22} />
                            <Text style={{ color: 'gray', fontSize: 8, lineHeight: 8 }}>Nearby . {adress}</Text>
                        </View>
                    </View>
                    <Text className='text-gray-500 pb-4 mt-2'>{short_description}</Text>
                </View>
                <TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-200'>
                    <QuestionMarkCircleIcon color='gray' opacity={0.6} size={20}/>
                    <Text className='font-bold  flex-1 text-md'>
                        Have a food allergy?
                    </Text>
                    <ChevronRightIcon color='#00CCBB'/>
                </TouchableOpacity>
            </View>
            <View className='pb-36'>
                <Text className='font-bold text-xl mb-3 pt-6 px-4'>Menu</Text>
                {/* dishes */}
                {dishes.map((dish)=>(
                <DishRow 
                    key={dish._id}
                    id={dish._id}
                    name={dish.name}
                    description={dish.short_description}
                    price={dish.price}
                    image={dish.image}/>
                ))}
            </View>
        </ScrollView>
        </>
    )
}

export default RestaurantScreen