// Denna komponent är anpassad för flera slides och är därför kodad utifrån det.
// Vi hade för avsikt att ha fler slides men för denna version har vi bara en.
// Därför är denna komponent lite onödigt komplex...

import React, { Component } from 'react'
import { Image, View, Text, ScrollView, Dimensions } from 'react-native'
import { SocialIcon } from 'react-native-elements'

class Slides extends Component {
  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <SocialIcon
          title="Logga in med Facebook"
          button
          raised={true}
          style={{ width: 250 }}
          type="facebook"
          onPress={this.props.onComplete}
        />
      )
    }
  }
  renderSlides() {
    return this.props.data.map((slide, index) => {
      return (
        <View
          key={slide.text}
          style={[styles.slideStyle, { backgroundColor: slide.color }]}
        >
          <Image
            resizeMode={'contain'}
            source={require('../assets/icons/barrundan.png')}
            style={{
              width: 350,
              alignSelf: 'center',
              height: 350
            }}
          />
          {this.renderLastSlide(index)}
        </View>
      )
    })
  }
  render() {
    return (
      <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
        {this.renderSlides()}
      </ScrollView>
    )
  }
}

const SCREEN_WIDTH = Dimensions.get('window').width
const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  finalSlideStyle: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 15
  }
}

export default Slides
