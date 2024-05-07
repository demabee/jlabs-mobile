import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type ErrorMessagesProps = {
  error: string
}

const ErrorMessages: React.FC<ErrorMessagesProps> = ({
  error
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  )
}

export default ErrorMessages

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'pink',
    borderWidth: 2,
    borderColor: 'red'
  },
  errorText: {
    color: 'red'
  }
})