import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function Index() {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");

  const handleSubmit = () => {
    setSubmittedValue(inputValue);
  };

  return (
    <View
      style={{
        padding: 20
      }}
    >
      <View
        style={{
          flexDirection: "row", 
        }}
      >
        <TextInput 
          style={{
            flex: 1,
            marginRight: 10,
            height: 35,
            borderRadius: 2,
            backgroundColor: "#ffffff",
            paddingHorizontal: 10,
          }}
          onChangeText={(text) => setInputValue(text)}
        />
        <Button 
          title="Search"
          onPress={handleSubmit}
        />
      </View>
      {submittedValue !== "" && (
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Text>{submittedValue}</Text>
        </View>
      )}
    </View>
  );
}
