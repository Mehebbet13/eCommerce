import React, {useState} from "react";
import {AppLoading} from "expo";
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from "./style/colors";

import { loadFonts } from "./style/fonts";
import {Input} from "./components/Input";
import {Btn} from "./components/Btn";
import {Category} from "./components/Category";
import {IconFacebook} from "./components/IconFacebook";
import {SocialBtn} from "./components/SocialBtn";
import {SizeContainer} from "./components/SizeContainer";
import { ProductCard } from "./components/ProductCard";
import {loadFonts} from "./style/fonts";
import {Filters} from "./commons/filters";
import {IconContainer} from "./components/IconContainer";

export default function App() {
    const [loaded, setLoaded] = useState(false);
    if (!loaded) {
        return (
            <AppLoading startAsync={loadFonts} onFinish={() => setLoaded(true)}/>
        );
    } {/*<Filters/>*/}
    return (

           <View style={styles.container}>
               <IconContainer/>
           </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
