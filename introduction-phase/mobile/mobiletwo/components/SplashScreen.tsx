import React from 'react'
import Logo from './ui/logo';
import FullSafeAreaScreen from './FullSafeAreaScreen';

import { View } from 'react-native'
import { ThemedText } from './ui/themed-components';

const SplashScreen = () => {
  return (
    <FullSafeAreaScreen className='flex-center'>
        <View className='text-center flex-col-2'>
            <Logo type='vertical'/>
            <ThemedText className='text-stone-400 text-sm'>
            Uncover the cards, master the game!
            </ThemedText>
        </View>
    </FullSafeAreaScreen>
  )
}

export default SplashScreen
