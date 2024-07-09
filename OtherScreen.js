// screens/OtherScreen.js

import * as React from 'react';
import { Button, View, Text } from 'react-native';

function OtherScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Other Screen</Text>
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

export default OtherScreen;
