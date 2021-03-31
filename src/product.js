import React from "react";

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  Picker,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { addTransaction } from "./store/actions/transactionAction";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-view";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import NavHead from "../Parts/navHead";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import StarRating from "react-native-star-rating";
import { ListItem } from "react-native-elements";
import Toast from "react-native-root-toast";

import { useState, useEffect } from "react";

export const Product = ({ route, navigation }) => {
  let { pid, title, price, images, image } = route.params;
  const dispatch = useDispatch();
  function onSubmit() {
    const id = Math.floor(Math.random() * 400000);
    const pricee = price * quantity;
    price = pricee.toFixed(2);
    price = parseFloat(price);
    const newTransaction = {
      pid,
      id,
      title,
      price,
      image,
      quantity,
    };
    Toast.show("Item added to cart!");
    dispatch(addTransaction({ ...newTransaction }));
  }
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const img = JSON.parse(images);
  return (
    <SafeAreaProvider
      forceInset={{ top: "always" }}
      style={{ backgroundColor: "white" }}
    >
      <NavHead navigation={navigation} />

      <View style={{ flex: 25 }}>
        <ScrollView>
          <Text
            style={{
              fontSize: 28,
              paddingTop: 25,
              paddingLeft: 5,
              fontWeight: "700",
            }}
          >
            {title}
          </Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              paddingTop: 10,
              paddingLeft: 5,
            }}
          >
            <StarRating
              disabled={false}
              maxStars={5}
              rating={2.3}
              starSize={20}
              emptyStarColor={"#f1c40f"}
              starStyle={{ padding: 0 }}
              fullStarColor={"#f1c40f"}
            />
            <Text style={{ fontWeight: "100", paddingLeft: 10 }}>(385)</Text>
          </View>
          <ScrollView horizontal pagingEnabled style={{ paddingHorizontal: 5 }}>
            {img.map((item) => (
              <View
                key={item.pid}
                style={{
                  height: 300,
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item.src }}
                  style={{ height: 300, width: 400 }}
                  resizeMode="contain"
                />
              </View>
            ))}
          </ScrollView>
          <View>
            <Text
              style={{
                fontSize: 25,
                color: "red",
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              ${price}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Picker
                selectedValue={quantity}
                mode="dropdown"
                style={{ width: "20%", padding: 10 }}
                itemStyle={{ height: 44 }}
                onValueChange={(itemValue, itemIndex) => {
                  setQuantity(itemValue);
                }}
              >
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
                <Picker.Item label="5" value={5} />
                <Picker.Item label="6" value={6} />
                <Picker.Item label="7" value={7} />
                <Picker.Item label="8" value={8} />
                <Picker.Item label="9" value={9} />
                <Picker.Item label="10" value={10} />
              </Picker>

              <TouchableOpacity
                onPress={() => onSubmit()}
                style={{
                  borderWidth: 1,
                  width: "65%",
                  alignItems: "center",
                  borderRadius: 9,
                  height: 44,
                  padding: 10,
                  marginTop: 10,
                  backgroundColor: "black",
                  marginLeft: 20,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  Add to cart
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  paddingLeft: 20,
                  paddingTop: 30,
                }}
              >
                Description
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  paddingTop: 20,
                  paddingLeft: 20,
                  paddingRight: 10,
                }}
              >
                SPACIOUS GARDENING BED: Designed with a nearly 4-foot-long bed
                deep enough to ensure your plants and vegetables can breathe and
                grow healthy DRAINAGE HOLES: Allows excess water to drain out,
                keeping soil fresh and preventing plants from overwatering
                ERGONOMIC STRUCTURE: Stands 30 inches tall, making it perfect
                for those who struggle to bend down or lean over while gardening
                VERSATILE DESIGN: Adds a new hint of beauty to any part of your
                home; perfect for placement on the patio, porch, deck, balcony,
                or in the garden RAISED GARDEN BED LINER: Separates wood from
                the soil, keeping wooden garden planter in excellent condition
                and preventing weeds and pests from interfering with plant
                growth
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default Product;
