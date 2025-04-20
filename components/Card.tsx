import { PropsWithChildren } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { Colours } from "@/constants/Colours";

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        padding: 16,
        margin: 5,
        width: (Dimensions.get("window").width / 2) - 15,
        height: (Dimensions.get("window").width / 2) - 70,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    text: {
        fontSize: 20,
        margin: 20,
        fontWeight: "bold",
    },
    label: {
        position: "absolute",
        bottom: 2, 
        left: 2,
        padding: 10,
    },
});

export default function Card({children, label, desc} : PropsWithChildren & { label: string, desc: string }) {
    let text = children?.toString().toLocaleLowerCase();
    text = text?.replace(/\s+/g, '');
    text = String(text).charAt(0).toUpperCase() + String(text).slice(1);

    const cardStyle = {
        backgroundColor: Colours[text as keyof typeof Colours]?.background || Colours.Default.background,
        color: Colours[text as keyof typeof Colours]?.text || Colours.Default.text,
    };
    return (
        <Link href={`/card/${label}`} asChild>
        <TouchableOpacity>
            <View style={
                [styles.card, {backgroundColor: cardStyle.backgroundColor}]}>
                <Text style={[styles.text, cardStyle]}>{children}</Text>
                <Text style={[styles.label, cardStyle ]}>{desc}</Text>
            </View>
        </TouchableOpacity>
        </Link>
    );
}