import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

const Details = ({route}) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen: {route.params.user_data.id}</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
