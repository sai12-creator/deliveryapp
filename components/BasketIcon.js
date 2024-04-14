import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { selectBasketItems, selectBasketTotal } from '../Features/BasketSlice'
import {useSelector} from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Curreny from 'react-currency-formatter'

const BasketIcon = () => {
    const items= useSelector(selectBasketItems)
    const navigation = useNavigation()
    const basketTotal = useSelector(selectBasketTotal)
    if(items.length == 0) return null;
  return (
    <View className='absolute bottom-10 w-full z-50' style={{zIndex: 50, position: 'absolute', width: '100%',bottom: 40}}>
      <TouchableOpacity onPress={()=> navigation.navigate('Basket')} style={{backgroundColor: '#00CCBB', flexDirection: 'row', borderRadius: 8, marginLeft: 10, marginRight: 10, alignItems: 'center', justifyContent: 'space-between', padding: 15}}>
        <Text style={{color: '#fff',  fontWeight: 'bold',fontSize: 15, lineHeight: 15, backgroundColor: '#01A296', padding: 10,borderRadius: 5}}>{items.length}</Text>
        <Text style={{ color: '#fff',  fontWeight: 'bold' , fontSize: 15, lineHeight: 15,  textAlign: 'center'}}>View Basket</Text>
        <Text style={{ color: '#fff',  fontWeight: 'bold' , fontSize: 15, lineHeight: 15, }}>
                            <Curreny quantity={basketTotal} currency='GBP' />
                        </Text>

      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon