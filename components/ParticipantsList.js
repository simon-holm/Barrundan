import React, { Component } from 'react'
import { View } from 'react-native'
import { Card, ListItem } from 'react-native-elements'

class ParticipantsList extends Component {
  render() {
    return (
      <Card containerStyle={{ padding: 0 }}>
        {this.props.participants.map((participant, index) => (
          <ListItem
            roundAvatar
            avatar={{ uri: participant.avatar_url }}
            key={index}
            title={participant.name}
            hideChevron
          />
        ))}
      </Card>
    )
  }
}

export default ParticipantsList
