import { Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@/utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import { CustomTextProps } from '@/utils/types'

const fontSizes = {
    h1: 24, h2: 22, h3: 20, h4: 18,
    h5: 16, h6: 14, h7: 10, h8: 9
}

const CustomText: FC<CustomTextProps> = ({
    variant = 'h6',
    style,
    fontFamily = 'Regular',
    fontSize,
    numberOfLines,
    children
}) => {
    return (
        <Text
            numberOfLines={numberOfLines ?? undefined}
            style={[style ?? {}, styles.text, { fontSize: RFValue(fontSize ? fontSize : fontSizes[variant]), fontFamily: `NotoSans-${fontFamily}` }]}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        color: Colors.text,
        textAlign: "left"
    }
})

export default CustomText