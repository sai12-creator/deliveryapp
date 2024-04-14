import { View, Text, StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { selectRestaurantItems } from '../Features/RestaurantSlice'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../Features/BasketSlice'
import { XCircleIcon } from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native'
import { urlFor } from '../sanity'
import Curreny from 'react-currency-formatter'


const BasketScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurantItems)
    const bascketTotal = useSelector(selectBasketTotal)
    const items = useSelector(selectBasketItems)
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item)
            return results;
        }, {})
        setGroupedItemsInBasket(groupedItems);
    }, [items])
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex-1 bg-gray-100'>
                <View className='p-5 border-b border-[#00CCBB] bg-white shadow-xs'>
                    <View>
                        <Text className='text-lg font-bold text-center'>Basket</Text>
                        <Text className='text-center text-gray-400'>{restaurant.title}</Text>
                    </View>
                    <TouchableOpacity onPress={navigation.goBack} className='rounded-full bg-gray-100 absolute top-4 right-5'>
                        <XCircleIcon
                            color='#00CCBB' height={50} width={50} />
                    </TouchableOpacity>
                </View>
                <View className='flex-row items-center space-x-12 px-4 py-3 my-5 bg-white'>
                    <Image
                        source={{
                            uri: "https://links.papareact.com/wru"
                        }}
                        className='h-7 w-7 bg-gray-300 rounded-full p-4'
                    />
                    <Text className=''>Deliver in 50 - 75 min</Text>
                    <TouchableOpacity>
                        <Text className='text-[#00CCBB]'>
                            change
                        </Text>
                    </TouchableOpacity>
                </View>


                <ScrollView className='divide-y divide-gray-200'>
                    {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                        <View className='flex-row items-center space-x-3 bg-white py-2 px-5' key={key}>
                            <Text className='text-[#00CCBB]'>{items.length} x</Text>
                            <Image
                                source={{
                                    uri: urlFor(items[0]?.image).url()
                                }}
                                className='h-12 w-12  rounded-full'
                            />
                            <Text className='flex-1'>{items[0]?.name}</Text>
                            <Text className='text-gray-600'>
                                <Curreny quantity={items[0]?.price} currency='GBP' />
                            </Text>
                            <TouchableOpacity>
                                <Text className='text-[#00CCBB] text-xs' onPress={()=> dispatch(removeFromBasket({id: key}))}>
                                    Remove
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                <View className='p-5 bg-white space-y-4 mt-5'>
                    <View className='flex-row justify-between'>
                        <Text className='text-gray-400'>Subtotal</Text>
                        <Text className='text-gray-400'>
                                <Curreny quantity={bascketTotal} currency='GBP' />
                            </Text>
                    </View>
                    <View className='flex-row justify-between'>
                        <Text className='text-gray-400'>Delivery Fee</Text>
                        <Text className='text-gray-400'>
                                <Curreny quantity={5.99} currency='GBP' />
                            </Text>
                    </View>
                    <View className='flex-row justify-between'>
                        <Text>Order Total</Text>
                        <Text className='font-extrabold'>
                                <Curreny quantity={bascketTotal + 5.99} currency='GBP' />
                            </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("PerparingOrderScreen")} className='rounded-lg p-4 bg-[#00CCBB]'>
                        <Text className='text-white text-center text-lg font-bold'>Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BasketScreen