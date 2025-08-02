import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import { fetchBuses } from '../service/requests/bus';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { goBack, navigate } from '../utils/NavigationUtils';
import { ActivityIndicator } from 'react-native';

const BusListScreen = () => {
  const route = useRoute();
  const params = route?.params as any;
  const { from, to, date } = params?.item || {};

  const {
    data: buses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['buses', from, to, date],
    queryFn: () => fetchBuses(from, to, date),
    enabled: !!from && !!to && !!date,
  });  

  const renderItem = ({item}:{item:any}) =>(
    <TouchableOpacity
    className='bg-white mb-4 p-4 rounded-lg shadow-sm'
    onPress={()=>navigate('SeatSelectionScreen',{busId:item?.busId})}
    >
        <Image
        source={require('../assets/images/sidebus.jpg')}
        className='h-6 w-6'
        />
        <Text className='text-lg font-bold text-gray-900'>{item.company}</Text>
        <Text className='text-sm text-gray-500'>{item.busType}</Text>

        <View className='flex-row justify-between mt-2'>
            <Text className='text-lg font-semibold text-gray-700'>
    {
        new Date(item.departureTime).toLocaleTimeString([],{
            hour:'2-digit',
            minute:'2-digit',
            hour12:false
        })
    }{' '} - {
        new Date(item.arrivalTime).toLocaleTimeString([],{
            hour:'2-digit',
            minute:'2-digit',
            hour12:false
        })
    }
            </Text>
            <Text className='text-sm text-gray-500'>
    {item.duration}
            </Text>

        </View>
        <View className='flex-row justify-between mt-2 items-center'>
            <Text className='text-md text-green-600 font-bold'>
                <Text className='text-xs text-gray-400 line-through'>
                    Rs{item.originalPrice}
                </Text>
            <Text className='text-sm text-gray-600'>
            {item?.seats?.flat().filter((seat:any)=>!seat.booked)?.length} Seats 
            </Text>
            </Text>

        </View>
    </TouchableOpacity>
  )

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView />
      <View className="bg-white p-4 flex-row items-center border-b-[1px] border-teal-800">
        <TouchableOpacity onPress={goBack}>
          <ArrowLeftIcon size={24} color="#000" />
        </TouchableOpacity>
        <View className="ml-4 ">
          <Text className="text-lg font-bold">
            {from}-{to}
          </Text>
          <Text className="text-sm text-gray-500">{date?.toDateString()}</Text>
        </View>
      </View>
      {isLoading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="teal" />
          <Text>Loading buses...</Text>
        </View>
      )}

      {error && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 font-bold">Failed To Load Buses</Text>
        </View>
      )}

      {!error && !isLoading && buses.length === 0 && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 font-bold">No buses available</Text>
        </View>
      )}
      <FlatList
      data={buses}
      keyExtractor={item=>item.busId}
      renderItem={renderItem}
      contentContainerStyle={{padding:16}}
      />
    </View>
  );
};

export default BusListScreen;
