import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Curreny from 'react-currency-formatter'
import { urlFor } from '../sanity'
import {
    MinusCircleIcon,
    PlusCircleIcon
} from 'react-native-heroicons/solid'
import { useDispatch, useSelector} from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItemById, selectBasketItems, selectBasketItemswithId } from '../Features/BasketSlice'

const DishRow = ({
    id,
    name,
    description,
    price,
    image
  }) => {
    const [isPressed, setIsPressed] = useState(false);
    const dishes = useSelector(selectBasketItems)
    const items = dishes.filter(item => item.id == id)
    const dispatch = useDispatch();
    const addItemsToBasket = () => {
      dispatch(addToBasket({
        id,
        name,
        description,
        price,
        image
      }));
    };
  
    const RemoveItemsFromBasket = () => {
      if (!items?.length > 0) return;
      dispatch(removeFromBasket({
        id,
        name,
        description,
        price,
        image
      }));
    };
    return (
        <>
            <TouchableOpacity onPress={() => setIsPressed(!isPressed)} className='border-gray-200' style={{ backgroundColor: '#fff', borderWidth: 1, padding: 10, borderColor: '#f2f2f2', marginTop: '10' }}>
                <View className='flex-row' style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View className='flex-1' style={{ paddingRight: 10 }}>
                        <Text className='text-lg' style={{ marginBottom: 5 }}>{name}</Text>
                        <Text style={{ color: 'gray' }}>{description}</Text>
                        <Text style={{ color: 'gray', marginTop: 10 }} className='mt-2'>
                            <Curreny quantity={price} currency='GBP' />
                        </Text>
                    </View>
                    <View>
                        <Image
                            style={{
                                borderWidth: 1,
                                borderColor: 'gray',
                                height: 100,
                                width: 100,
                                backgroundColor: 'gray',
                                padding: 10
                            }}
                            source={{
                                uri: urlFor(image).url()
                            }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
            {isPressed && (
                <View className="bg-white px-4" style={isPressed ? { backgroundColor: '#fff', paddingLeft: 10, paddingRight: 10, borderBottomWidth: 0 } : { backgroundColor: '#fff', paddingLeft: 10, paddingRight: 10 }}>
                    {
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
                            <TouchableOpacity onPress={RemoveItemsFromBasket} disabled={!items?.length}>
                                <MinusCircleIcon
                                    size={40}
                                    color={items?.length > 0 ? '#00CCBB' : 'gray'} />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 10, marginRight: 10 }}>{items ? items?.length : 0}</Text>
                            <TouchableOpacity onPress={addItemsToBasket}>
                                <PlusCircleIcon
                                    size={40}
                                    color={items?.length > 0 ? '#00CCBB' : 'gray'}/>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            )}
        </>
    )
}

export default DishRow