import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { useNavigation } from '@react-navigation/native'

const PreparingOrderScreen = () => {
    const navigation = useNavigation()
    useEffect(()=>{
        setTimeout(()=>{
          navigation.navigate("Delivery")
        }, 4000)
    },[])
    return (
        <SafeAreaView className='bg-[#00CCBB] flex-1 justify-center items-center'>
            <Animatable.Image
                source={require("../assets/Road Map City Animation.gif")}
                animation={'slideInUp'}
                iterationCount={1}
                className='h-96 w-96'
            />
            <Animatable.Text
                animation={'slideInUp'}
                iterationCount={2}
                className='text-lg my-10 text-white font-bold text-center'>Waiting For Restaurant To Accept Order
            </Animatable.Text>
               <Progress.Circle size={60} color='#fff' indeterminate={true}/>
        </SafeAreaView>
    )
}

export default PreparingOrderScreen