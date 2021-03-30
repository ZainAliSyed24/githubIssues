/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      query: 'python',
      issues: {}
    }
  }

  componentDidMount() {
    this.getIssues()
  }

  setToState = async (res) => {
    this.setState({
      issues: res
    })

    console.log('issues', this.state.issues);
  }

  getIssues = () => {
    fetch(`https://api.github.com/search/issues?q=${this.state.query.toString()}+state:open`)
      .then(response => response.json())
      .then(res => {
        if (res.items.length > 0) {

          this.setToState(res)
        }

        // console.log(res.items);

      })
    // await console.log(this.state.issues)
  }

  render() {
    const { issues } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <TextInput style={{ borderColor: 'black', borderWidth: 1 }} placeholder='Search' onChangeText={(e) => this.setState({ query: e })} />
        <TouchableOpacity style={{ borderColor: 'blue', borderWidth: 1, width: '20%', marginVertical: 10 }} onPress={() => this.getIssues()}><Text>Ge Issues</Text></TouchableOpacity>
        <ScrollView>
          {
            Object.keys(issues).length !== 0 ? <View>
              {

                issues.items.map((value, index) => {
                  return <View key={index} style={{ marginVertical: 10 }}>
                    <Text>Id--{value.id}</Text>
                    <Text >Title--{value.title}</Text>
                  </View>
                })
              }
            </View>
              :
              <View><ActivityIndicator size='large' color='teal' /></View>
          }
        </ScrollView>
      </View>
    )
  }
}

export default App;
