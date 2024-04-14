import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  ArrowRightIcon
} from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import createClient from '../sanity'

const FeaturedRow = ({ id, title, description }) => {
  const [Restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == 'featured' && _id == $id] {
          ...,
          restaurants[]->{
            ...,
            dishes[]->,
            type->{name}
          }
        }[0]`; // Select the first featured document

        const data = await createClient.fetch(query, { id });
        setRestaurants(data?.restaurants || []); // Set restaurants or empty array
      } catch (error) {
        console.error('Error fetching featured restaurants:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <View>
      <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15 }}>
        <Text style={{ fontWeight: 700, fontSize: 15, lineHeight: 15 }}>{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text style={{ color: 'gray', fontSize: 12, lineHeight: 12, paddingLeft: 15, paddingRight: 15 }}>{description}</Text>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingTop: 10 }}>

        {/* restaurantCards */}
        {
          Restaurants?.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              id={restaurant._id}
              imgUrl={restaurant.image}
              title={restaurant.name}
              rating={restaurant.rating}
              adress={restaurant.address}
              genre={restaurant.type?.name}
              short_description ={restaurant.short_description}
              dishes={restaurant.dishes}
              long={restaurant.long}
              lat={restaurant.lat} />
          ))
        }
      </ScrollView>
    </View>
  )
}

export default FeaturedRow