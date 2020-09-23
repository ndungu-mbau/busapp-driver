import React from 'react'

import { View, Text } from 'react-native'

const Details = ({ route }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen: {route.params.user_data.id}</Text>
      </View>
    )
}

export default Details