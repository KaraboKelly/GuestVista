import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, Button, TextInput, Picker } from 'react-native-web';
import '../components/styles/GuesthouseList.scss';


const GuesthouseList = () => {
  const [guestHouses, setGuestHouses] = useState([]);
  const [filteredGuestHouses, setFilteredGuestHouses] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [sortBy, setSortBy] = useState('');

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
        setFilteredGuestHouses(loadedGuestHouses);
      });
  }, []);

  useEffect(() => {
    let tempGuestHouses = [...guestHouses];

    // Filter by name
    if (searchName) {
      tempGuestHouses = tempGuestHouses.filter((guestHouse) => guestHouse.gName.toLowerCase().includes(searchName.toLowerCase()));
    }

    // Sort by price or rating
    if (sortBy === 'high-price') {
      tempGuestHouses.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'low-price') {
      tempGuestHouses.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-rating') {
      tempGuestHouses.sort((a, b) => b.ratings - a.ratings);
    }

    setFilteredGuestHouses(tempGuestHouses);
  }, [searchName, sortBy, guestHouses]);

  const renderGuestHouse = ({ item }) => {
    const profilePhoto = item.photos?.[0]?.src; // get the image URL from Firebase

    return (
      <View style={styles.guestHouseContainer}>
        <View style={styles.imageContainer}>
          {/* Conditionally render Image component */}
          {profilePhoto ? <Image style={styles.guestHouseImage} source={{ uri: profilePhoto }} /> : null}
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
      <View style={styles.filterContainer}>
        {/* Search by name */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search by name"
            onChangeText={(text) => {
              setSearchName(text);
            }}
            value={searchName}
          />
        </View>
        
        {/* Filter */}
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            onValueChange={(value) => setSortBy(value)}
          >
            <Picker.Item label="Sort by" value="default" />
            <Picker.Item label="Price: Low to High" value="low-price" />
            <Picker.Item label="Price: High to Low" value="high-price" />
            <Picker.Item label="Rating: High to Low" value="high-rating" />
          </Picker>
        </View>
      
      </View>
         {/* Displaying list of guest houses */}
 <FlatList
    data={filteredGuestHouses}
    renderItem={renderGuestHouse}
    keyExtractor={(item) => item.id}
  />
    </View>
    
  );
};

const styles = {
container: {
flex: 1,
marginHorizontal: 20,
marginTop: 8,
},
heading: {
fontSize: 20,
fontWeight: 'bold',
marginBottom: 10,
},
filterContainer: {
    marginHorizontal: 600,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputContainer: {
    flex: 0.3,
  },
  input: {
    flex: 0.5,
    height: 40,
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    color: '#000',
    fontWeight: 'bold',
  },
  
  pickerContainer: {
    width: 200,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
  },
  picker: {
    flex: 1,
    color: '#000',
    fontWeight: 'bold',
  },
guestHouseContainer: {
width: '50%',
flex: 0.5,
backgroundColor: '#fff',
padding: 10,
borderRadius: 5,
marginBottom: 10,
marginHorizontal: 600,
display: 'flex',
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
},
imageContainer: {
flexDirection: 'column',
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
flexDirection: 'column',
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
