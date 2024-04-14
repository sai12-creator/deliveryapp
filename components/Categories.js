import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoriesCard from './CategoriesCard'
import createClient, { urlFor } from '../sanity';


const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(()=>{
    createClient.fetch(
      `*[_type == 'category']
      `
    ).then(data=>{
      setCategories(data);
    })
  },[])
  return (
    <ScrollView
    contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop:10
    }} 
    horizontal
    showsHorizontalScrollIndicator={false}
    >
        {/* categoriesCard */}
      {categories?.map((category) =>(
      <CategoriesCard key={category._id} imgUrl={urlFor(category.image).width(200).url()} title={category.name}/>
      ))}
      
    </ScrollView>
  )
}

export default Categories