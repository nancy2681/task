import {
  Text,
  View,
  Alert,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import IconEntypo from "react-native-vector-icons/Entypo";
import ListItem from "./listItem";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
class App extends Component {
  state = {
    text: "",
    modalVisible: false,
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  add = () => {
    this.props.addTodo({
      id: this.props.todo.length + 1,
      task: this.state.text,
      completed: true,
    });
    this.setState({ modalVisible: !this.state.modalVisible });
  };
  render() {
    const { modalVisible } = this.state;
    return (
      <ScrollView
        style={{
          flex: 0.85,
          backgroundColor: "pink",
          // alignItems: "center",
        }}
      >
        <Text
          style={{
            marginTop: windowHeight * 0.1,
            fontSize: 22,
            textDecorationLine: "underline",
            alignSelf: "center",
          }}
        >
          My Todo list
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          data={this.props.todo}
          renderItem={({ item }) => <ListItem todoItem={item} />}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                onChangeText={(text) => this.setState({ text })}
                placeholder="Type something.."
                value={this.state.text}
                style={{ fontSize: 18 }}
              ></TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={this.add}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={{
            borderWidth: 1,
            borderRadius: 5,
            width: windowWidth * 0.5,
            padding: 5,
            backgroundColor: "lightblue",
            flexDirection: "row",
            marginTop: windowHeight * 0.6,
            alignSelf: "center",
          }}
          onPress={() => this.setModalVisible(true)}
        >
          <IconEntypo
            style={{ marginStart: windowWidth * 0.05 }}
            name="add-to-list"
            size={20}
          />
          <Text style={{ marginLeft: windowWidth * 0.05, fontSize: 18 }}>
            Add new task
          </Text>
        </Pressable>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 5,
    elevation: 2,
    width: 80,
    marginTop: 15,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
const mapStateToProps = (state) => {
  return {
    todo: state.todo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (value) => dispatch({ payload: value, type: "ADD" }),
    deleteTodo: (value) => dispatch({ payload: value, type: "DELETE" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
