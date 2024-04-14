import { View, Text, SafeAreaView, Image, StatusBar, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon
} from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import createClient from '../sanity'
const HomeScreen = () => {
  const navigation = useNavigation();
  const [FeaturedCategories, setFeaturedCategories] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions(
      { headerShown: false }
    )
  }, [])
  useEffect(()=>{
    createClient.fetch(
      `*[_type =='featured']{
        ...,
        restaurants[]=>{
          ...,
          dishes[]-> 
        }
      }`).then(data=>{
        setFeaturedCategories(data);
      })
    
  },[])
  return (
    <SafeAreaView className='bg-white pt-5' style={{ marginTop: StatusBar.currentHeight }}>
      {/* header */}
      <View className='flex-row pb-3 space-x-2 items-center px-4'>
        <Image
          source={{ uri: 'http://links.papareact.com/wru' }}
          className='h-7 w-7 bg-gray-300 p-4 rounded-full'
        />

        <View className='flex-1'>
          <Text className='font-bold text-gray-400 text-xs'>Deliver me</Text>
          <Text className='font-bold text-xl'>Current Location <ChevronDownIcon size={20} color="#00CCBB" /></Text>
        </View>

        <UserIcon size={35} color="#00CCBB" />
      </View>

      <View className='flex-row items-center space-x-2 px-4 pb-2'>
        <View className='flex-row  flex-1 items-center space-x-2 bg-gray-200 p-2'>
          <MagnifyingGlassIcon color='gray' size={20} />
          <TextInput placeholder='Restaurants And Cusins' keyboardType='default' />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>
      <ScrollView className='bg-gray-100'
        contentContainerStyle={
          { paddingBottom: 100 }}>
        {/* categories  */}
        <Categories/>
        {/* components  */}
          {FeaturedCategories?.map((category)=>(
            <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
              />
          ))}
        
      </ScrollView>
    </SafeAreaView>

  )
}

export default HomeScreen