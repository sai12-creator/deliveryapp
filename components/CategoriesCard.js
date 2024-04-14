import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const CategoriesCard = ({imgUrl, title}) => {
  return (
    <TouchableOpacity style={{position: 'relative', marginRight: 5}}>
     <Image
  source={{ uri:imgUrl }}
  style={{ height: 70, width: 70, borderRadius: 5}}
/>
      <Text style={{position: 'absolute',bottom:5, left: 5, color: '#fff', fontWeight: 700}}>{title}</Text>
    </TouchableOpacity>
  )
} 

export default CategoriesCard