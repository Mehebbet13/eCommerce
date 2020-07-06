import React, {useState} from "react";
import {SliderBox} from "react-native-image-slider-box";
import {COLORS} from "../style/colors";
import {
    ScrollView,
    View,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from "react-native";
import {SizeContainer} from "../components/SizeContainer";
import {Heart} from "../Icons/Heart";
import {CustomText} from "../components/CustomText";
import {ProductCard} from "../components/ProductCard";
import {GLOBAL_STYLES} from "../style/globalStyles";
import {ActionModal} from "../components/ActionModal";
import {SelectSize} from "../commons/SelectSize";
import {Back} from "../Icons/Back";
import {BottomModal} from "../components/bottomModal";

export const SingleProductScreen = ({route, navigation}) => {
    const [isSizeClicked, setIsSizeClicked] = useState(false);
    const [isColorClicked, setIsColorClicked] = useState(false);

    const {id, about, brandName, price, imagesUrls, name, sizes} = route.params.product;
    const {products} = route.params;
    const [addProduct, setAddProduct] = useState({
        userId: "",
        id: id,
        size: "",
        color: "",
    });
    const [addSize,setAddSize]= useState("");
    const handleAddToCart = () => {

    };
    const [isClicked, setIsClicked] = useState({
        S: false,
        M: false,
        L: false,
    });
    const handleSize = (name, size) => {
        setIsClicked({...false, [size]: !isClicked[`${size}`]});
        setAddProduct(prevState => ({
            ...prevState,
            [name]: size
        }));
        setAddSize(size)
        console.log(size)
        console.log('name', name)
        console.log(addProduct)
    };
    const size = ["S", "M", "L"];
    return (
        <TouchableWithoutFeedback onPress={() => setIsSizeClicked(false)}>
            <View style={styles.container}>
                <ScrollView>
                    <SliderBox
                        images={imagesUrls}
                        sliderBoxHeight={400}
                        circleLoop={true}
                        dotColor={COLORS.PRIMARY}
                    />
                    <View style={styles.main}>
                        <View style={styles.row}>
                            <SizeContainer
                                width={130}
                                name="Size"
                                onPress={() => setIsSizeClicked(!isSizeClicked)}
                                isClicked={isSizeClicked}
                                bgColor={isSizeClicked ? COLORS.PRIMARY : null}
                                borderWidth={isSizeClicked ? 0 : 0.4}
                            />
                            <SizeContainer
                                onPress={() => setIsColorClicked(!isColorClicked)}
                                isClicked={isColorClicked}
                                width={130}
                                name="Color"
                                bgColor={isColorClicked ? COLORS.PRIMARY : null}
                                borderWidth={isColorClicked ? 0 : 0.4}
                            />
                            <Heart width={30} height={30}/>
                        </View>

                        <View style={styles.row}>
                            <CustomText style={styles.bigText} weight="bold">
                                {brandName}
                            </CustomText>
                            <CustomText style={styles.bigText} weight="bold">
                                {`${price}$`}
                            </CustomText>
                        </View>
                        <CustomText style={styles.clothName}>{name}</CustomText>

                        {/*<CustomText style={styles.typeText}>{name}</CustomText>*/}
                        <CustomText style={styles.descText}>{about}</CustomText>

                        <CustomText style={styles.suggestionText} weight="bold">
                            You can also like this
                        </CustomText>
                        <FlatList
                            data={products}
                            horizontal={true}
                            renderItem={({item}) =>
                                <TouchableWithoutFeedback
                                    onPress={() => navigation.navigate("SingleProductScreen", {
                                        product: item,
                                        products: products
                                    })}>
                                    <View>
                                        {
                                            id !== item.id ?
                                                <ProductCard isInCatalog={true} product={item} isRowView={false}/>
                                                : null}
                                    </View>
                                </TouchableWithoutFeedback>}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </ScrollView>
                {
                    isSizeClicked ?
                        <BottomModal name={"Select Color"}>
                            <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                {size.map((name) => (
                                    <View style={styles.sizes} key={`${name}-${Date.now()}`}>
                                        <SizeContainer
                                            bgColor={isClicked[`${name}`] ? COLORS.PRIMARY : null}
                                            borderWidth={isClicked[`${name}`] ? 0 : 0.4}
                                            onPress={() => {
                                                console.log(name);
                                                handleSize("size", name)
                                            }}
                                            isClicked={isClicked}
                                            name={name} width={100}/>
                                    </View>
                                ))}
                            </ScrollView>
                        </BottomModal>
                        :
                        null
                }
                {
                    isColorClicked ?
                        <BottomModal name={"Select Color"}>
                            {/*<ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>*/}
                            {/*    {sizess.map((name) => (*/}
                            {/*        <View style={styles.sizes} key={`${name}-${Date.now()}`}>*/}
                            {/*            <SizeContainer*/}
                            {/*                bgColor={isClicked[`${name}`] ? COLORS.PRIMARY : null}*/}
                            {/*                borderWidth={isClicked[`${name}`] ? 0 : 0.4}*/}
                            {/*                onPress={() => handleSize(name)}*/}
                            {/*                isClicked={isClicked}*/}
                            {/*                name={name} width={100}/>*/}
                            {/*        </View>*/}
                            {/*    ))}*/}
                            {/*</ScrollView>*/}
                        </BottomModal>

                        :
                        null
                }
                <ActionModal onPress={() => handleAddToCart()} btnName="Add to cart"/>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
    },
    main: {
        paddingHorizontal: GLOBAL_STYLES.PADDING,
    },
    row: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",
        alignItems: "center",
    },
    bigText: {
        fontSize: 24,
    },
    typeText: {
        fontSize: 11,
        color: COLORS.GRAY,
    },
    descText: {
        fontSize: 14,
    },
    suggestionText: {
        fontSize: 18,
        marginVertical: 20,
    },

    clothName: {
        fontSize: 10,
        marginBottom: 15,
    },
});
