export const Colors = {
  primaryBlue: '#0033ff',
  primaryBlueWithOpacity: 'rgba(0, 51, 255, 0.5)',
  // primaryBlue: 'Colors?.primaryBlue',
  secondaryBlue: 'rgba(15, 39, 71, 0.75)',
  tertiaryBlue: 'rgba(15, 39, 71, 0.5)',
  quarternaryBlue: 'rgba(15, 39, 71, 0.25)',
  // primaryYellow: 'Colors?.primaryYellow',
  primaryYellow: '#FFB000',
  secondaryYellow: '#F2DC99',
  // tertiaryYellow: '#F8EDCC',
  tertiaryYellow: '#BFC4C6',
  // quarternaryYellow: '#FBF5E6',
  quarternaryYellow: '#BFC4C6',
  inputBackgroundColor: '#BFC4C6',
  itemReceivedColor: 'rgba(191, 196, 198, 0.3)',
  darkGrey: '#4E5152',
  darkerBlue: '#CCD6FF',
  paleBlue: '#EDEFF7'
};

export const mainTheme = {
  components: {
    Button: {
      titleStyle: {
        color: 'white',
        fontSize: 14
      },
      buttonStyle: {
        borderRadius: 24,
        paddingVertical: 14,
      },
      disabledTitleStyle: {
        color: 'white'
      },
      disabledStyle: {
        // backgroundColor: 'rgba(15, 39, 71, 0.5)'
        backgroundColor: Colors.primaryBlueWithOpacity
      }
    },
    Input: {
      containerStyle: {
        paddingHorizontal: 0,
        paddingBottom: 6
      },
      inputContainerStyle: {
        // backgroundColor: Colors.quarternaryYellow,
        backgroundColor: Colors.paleBlue,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderBottomWidth: 0
      },
      inputStyle: {
        fontSize: 14,
        letterSpacing: 0.2,
        color: Colors.darkGrey
      },
      // placeholderTextColor: '#B7B7B7',
      // placeholderTextColor: '#dfe4e7',
    },
    Text: {
      h1Style: {
        fontSize: 30
      },
      h2Style: {
        fontSize: 24
      },
      style: {
        fontSize: 12,
        // color: Colors.primaryBlue
        color: Colors.darkGrey
      }
    }
  },
  lightColors: {
    primary: Colors.primaryBlue,
    secondary: Colors.primaryYellow
  },
  darkColors: {
    primary: Colors.primaryBlue,
    secondary: Colors.primaryYellow
  }
};