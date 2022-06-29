import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
class ListItem extends Component {
  render() {
    {
      if (this.props.todoItem.task == "") {
        return (
          <View style={{}}>
            <Text style={{ marginStart: windowWidth * 0.03, fontSize: 18 }}>
              No data entered!
            </Text>
          </View>
        );
      } else {
        return (
          <View
            style={{
              padding: 20,
              borderRadius: 7,
              flexDirection: "row",
              marginVertical: 10,
              backgroundColor: "white",
            }}
          >
            <Text style={{ fontSize: 18 }}>{this.props.todoItem.task}</Text>

            <TouchableOpacity
              onPress={() => this.props.deleteTodo(this.props.todoItem)}
            >
              <IconMaterialCommunityIcons
                style={{ marginStart: windowWidth * 0.5 }}
                name="delete"
                size={20}
                color="maroon"
              />
            </TouchableOpacity>
          </View>
        );
      }
    }
  }
}
const mapStateToProps = (state) => {
  return {
    todo: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodo: (value) => dispatch({ payload: value, type: "DELETE" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
