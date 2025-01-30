import { View, Text } from 'react-native'
import React from 'react'
import BottomSheet from '@gorhom/bottom-sheet'

const CountryCodePicker = () => {
    return (
        <BottomSheet
            enablePanDownToClose
            snapPoints={['90%']}
            ref={bottomSheetRef}
            enableDynamicSizing={false}
            index={-1}>

        </BottomSheet>
    )
}

export default CountryCodePicker