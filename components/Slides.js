import React, { Component } from 'react'
import { Image, View, Text, ScrollView, Dimensions } from 'react-native'
import { SocialIcon } from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width

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
      if (index === 0) {
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
            {/*<Text
              style={{
                fontSize: 30,
                color: 'white',
                marginLeft: 15,
                marginRight: 15,
                marginBottom: 10
              }}
            >
              Välkommen!
            </Text>*/}
            {this.renderLastSlide(index)}
          </View>
        )
      }
      return (
        <View
          key={slide.text}
          style={[styles.finalSlideStyle, { backgroundColor: slide.color }]}
        >
          <View style={{ flex: 1, marginTop: 65 }}>
            <Text style={styles.textStyle}>{slide.text}</Text>
            <Text style={styles.textStyle}>{slide.text2}</Text>
            <Text style={styles.textStyle}>{slide.text3}</Text>
          </View>

          {this.renderLastSlide(index)}
          <View>
            <Image
              resizeMode={'contain'}
              source={require('../assets/icons/barrundan.png')}
              style={{
                width: SCREEN_WIDTH,
                alignSelf: 'center',
                height: 250,
                marginTop: 50
              }}
            />
          </View>
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
