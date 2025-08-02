import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserGroupIcon } from 'react-native-heroicons/solid';

const PaymentButton: FC<{
  price: number;
  seat: number;
  onPay: any;
}> = ({ price, seat, onPay }) => {
  return (
    <View className="absolute bottom-0 pb-5 shadow-md bg-white  w-full rounded-t-xl p-4">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="font-semibold font-okra text-xl">Amount</Text>
          <Text className="font-medium font-okra text-sm text-gray-700">
            Tax Included
          </Text>
        </View>

        <View>
          <View className="flex-row items-center gap-3">
            <Text className="text-gray-500 line-through font-okra font-medium text-sm">
              Rs{seat * price - (seat * price > 200 ? 100 : 0).toFixed(0)}
            </Text>
            <Text className="font-okra font-medium text-lg">
              Rs{(price * seat).toFixed(0)}
            </Text>
          </View>

          <View className="flex-row self-end items-center gap-1">
            <UserGroupIcon color={'gray'} size={16} />
            <Text className="font-okra font-medium text-md">{seat} P</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={onPay}
        className="bg-tertiary my-4 rounded-xl justify-center items-center p-3"
      >
        <Text className="text-white font-semibold text-xl font-okra">
          Pay Now!
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default PaymentButton;
