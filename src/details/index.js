import React, { useState } from 'react';

import axios from 'axios';

import { View, Text, StyleSheet, Alert } from 'react-native';

import { Card, Button } from 'react-native-elements';

import call from 'react-native-phone-call';

import { BASE_URL } from '../constants';

const Details = ({ route }) => {
  const [users, setUsers] = useState([]);
  axios
    .get(`${BASE_URL}/api/get_passenger_on_trip/${route.params.user_data.trip}`)
    .then(({ data }) => {
      return data.response;
    })
    .then((res) => {
      if (res.status === 'ok') {
        const passengers = res.passengers.reduce((acc, user) => {
          if (acc[user.pickup_trip_location]) {
            acc[user.pickup_trip_location].push(user);
          } else {
            acc[user.pickup_trip_location] = [user];
          }
          return acc;
        }, {});
        // console.log(passengers);
        setUsers(passengers);
      } else {
        Alert.alert(res.status, 'No passengers on this trip.');
      }
    });

  return (
    <View style={styles.container}>
      {Object.entries(users).map(([location, passengers]) => {
        return (
          <Card key={location}>
            <Card.Title>{location}</Card.Title>
            <Card.Divider />
            {passengers.map((passenger) => {
              return (
                <Card key={passenger.phone}>
                  <Card.Title>{`${passenger.firstname} ${passenger.lastname}`}</Card.Title>
                  <Text>Phone: {passenger.phone}</Text>
                  <Text>Ticket No: {passenger.tkt_passenger_id_no}</Text>
                  <Text>Total Seats: {passenger.total_seat}</Text>
                  <Text>Seats: {passenger.seat_numbers}</Text>
                  <Text>Drop Location: {passenger.drop_trip_location}</Text>
                  <Card.Divider />
                  <Button
                    raised
                    icon={{
                      type: 'ionicon',
                      name: 'call-outline',
                      color: 'white',
                    }}
                    onPress={async () => {
                      try {
                        await call({
                          number: passenger.phone,
                          prompt: true,
                        });
                      } catch (e) {
                        console.error(e);
                      }
                    }}
                    title="Call"
                  />
                </Card>
              );
            })}
          </Card>
        );
      })}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
