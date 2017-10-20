import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

class ParticipantsList extends Component {
  render() {
    const { container, item, image, name } = styles
    return (
      <View style={container}>
        {this.props.participants.map((participant, index) => (
          <View key={index} style={item}>
            <Image source={{ uri: participant.imgUrl }} style={image} />
            <Text style={name}>{participant.name}</Text>
          </View>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10
  },
  item: {
    width: 70,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  name: {
    color: '#dddddd',

    fontSize: 12
  }
})

export default ParticipantsList
