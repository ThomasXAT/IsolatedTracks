import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { CheckBox } from 'react-native-elements';

export default function Index() {
  const key = "";
  const channel = "";

  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState<{ id: string; title: string }[]>([]);
  const [checkedVideos, setCheckedVideos] = useState<string[]>([]);

  const handleSubmit = () => {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&channelId=${channel}&q=${search}`)
      .then((response) => response.json())
      .then((data) => {
        const formattedVideos = data.items.map((item: { id: { videoId: string }, snippet: { title: string } }) => ({
          id: item.id.videoId,
          title: item.snippet.title
        }));
        setVideos(formattedVideos);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCheckBoxChange = (videoId: string) => {
    if (checkedVideos.includes(videoId)) {
      setCheckedVideos(checkedVideos.filter(id => id !== videoId));
    }
    else {
      setCheckedVideos([...checkedVideos, videoId]);
    }
  };

  return (
    <View
      style={{
        padding: 20
      }}
    >
      <View
        style={{
          flexDirection: "row"
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
          onChangeText={(text) => setSearch(text)}
        />
        <Button 
          title="Search"
          onPress={handleSubmit}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          marginHorizontal: -10
        }}
      >
        {videos.map((video) => (
          <CheckBox
            key={video.id}
            title={video.title}
            checked={checkedVideos.includes(video.id)}
            onPress={() => handleCheckBoxChange(video.id)}
          />
        ))}
      </View>
    </View>
  );
}
