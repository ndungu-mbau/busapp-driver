import React, { useState } from 'react'

import axios from 'axios'

import {
    Alert,
    StyleSheet,
    View,
} from 'react-native'

import {
    Text,
    Input,
    Button,
} from 'react-native-elements'

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const onPress = async () => {
        if(username === '' || password === ''){
            Alert.alert('Empty fields', 'Neither email nor password can be empty.')
        } else {
            setLoading(true)
            const { data: { response } } = await axios.get(`https://moveit.ellixar.com/api/driver_login?email=${username}&password=${password}`)
            setLoading(false)

            if(response.status !== 'ok'){
                Alert.alert(response.status, response.message)
            } else {
                navigation.navigate("details", {
                    user_data: response.user_data
                })
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text h1>Driver Login</Text>
            <Input
              placeholder='Username'
              leftIcon={{ type: 'ionicon', name: 'person-outline' }}
              value={username}
              onChangeText={setUsername}
            />
            <Input
              placeholder='Password'
              leftIcon={{ type: 'ionicon', name: 'lock-closed-outline' }}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <Button
              title="LOGIN"
              type="outline"
              loading={loading}
              onPress={onPress}
            />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        paddingHorizontal: 64
    },
})