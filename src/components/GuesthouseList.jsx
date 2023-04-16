import React, { useState, useEffect } from 'react';
import { FlatList, View, Text , Image, Button} from 'react-native-web';
import '../components/styles/GuesthouseList.scss';

const GuesthouseList = () => {
  const [guestHouses, setGuestHouses] = useState([]);

  useEffect(() => {
    fetch('https://guestvista-4308f-default-rtdb.firebaseio.com/addGuesthouses.json')
      .then((res) => res.json())
      .then((data) => {
        const loadedGuestHouses = [];

        for (const key in data) {
          loadedGuestHouses.push({
            id: key,
            ...data[key],
          });
        }

        setGuestHouses(loadedGuestHouses);
      });
  }, []);

 
  const renderGuestHouse = ({ item }) => {
    const profilePhoto = item.photos?.[0]?.src; // get the image URL from Firebase
  
    return (
      <View style={styles.guestHouseContainer}>
        <View style={styles.imageContainer}>
          {/* Conditionally render Image component */}
          {profilePhoto ? (
            <Image style={styles.guestHouseImage} source={{ uri: profilePhoto }} />
          ) : null}
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.guestHouseName}>{item.gName}</Text>
          <Text style={styles.guestHouseDescription}>{item.description}</Text>
          <Text style={styles.guestHousePrice}>${item.price}/night</Text>
          <Text style={styles.guestHouseRating}>Rating: {item.ratings}</Text>
          <Text style={styles.guestHouseDistance}>Location: {item.location}</Text>
          {/* Add button here */}
          <View style={styles.buttonContainer}>
            <Button title="View Details" onPress={() => console.log(`Book now button pressed for ${item.gName}`)} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Guest Houses</Text>

      {/* Displaying list of guest houses */}
      <FlatList
        data={guestHouses}
        renderItem={renderGuestHouse}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = {
    container: {
      flex: 1,
      marginHorizontal: 5,
      marginTop: 8,
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
   
    guestHouseContainer: {
      width: '50%',
      flex:0.5,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imageContainer: {
      flexDirection:'column', 
      flex: 1,
      marginRight: 10,
    },
    guestHouseImage: {
      width: 600,
      height: 200,
      borderRadius: 5,
    },
    detailsContainer: {
      flex: 1,
      flexDirection: 'column'
    },
    guestHouseName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    guestHouseDescription: {
      fontSize: 16,
      marginTop: 5,
    },
    guestHousePrice: {
      fontSize: 16,
      marginTop: 5,
    },
    guestHouseRating: {
      fontSize: 16,
      marginTop: 5,
    },
    guestHouseDistance: {
      fontSize: 16,
      marginTop: 5,
    },
    buttonContainer: {
      marginTop: 10,
    },
  };
export default GuesthouseList;