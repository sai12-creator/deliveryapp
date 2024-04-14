import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {
  StarIcon,
  MapPinIcon
} from 'react-native-heroicons/solid'
import {
  LocationMarkerIcon
} from 'react-native-heroicons/outline'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'
const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  adress,
  genre,
  short_description,
  dishes,
  long,
  lat
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('Restaurant', {
        id,
        imgUrl,
        title,
        rating,
        adress,
        genre,
        short_description,
        dishes,
        long,
        lat
      })
    }} style={{ backgroundColor: '#fff', marginRight: 5, boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)' }}>
      <Image
        source={{
          uri: urlFor(imgUrl).url()
        }}
        style={{ height: 130, width: 210, borderRadius: 5 }}
      />
      <View style={{ paddingBottom: 8, paddingLeft: 10, paddingRight: 5, marginLeft: 4 }}>
        <Text style={{ fontWeight: 700, fontSize: 15, lineHeight: 15, paddingTop: 10 }}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, }}>
          <StarIcon color='green' opacity={0.5} size={22} />
          <Text style={{ color: 'gray', fontSize: 8, lineHeight: 8 }}>
            <Text className='shadow' style={{ color: 'green' }}>{rating}</Text>.{genre}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <MapPinIcon color='gray' opacity={0.4} size={22} />
          <Text style={{ color: 'gray', fontSize: 8, lineHeight: 8 }}>Nearby . {adress}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard