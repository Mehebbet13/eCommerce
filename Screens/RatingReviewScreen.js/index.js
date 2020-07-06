import React, { useState } from "react";
import { ClientReviewsList } from "./ClientReviewsList";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { COLORS } from "../../style/colors";
import { CustomText } from "../../components/CustomText";
import { RatingRow } from "./RatingRow";
import { GLOBAL_STYLES } from "../../style/globalStyles";
import { averageRatingCalc, totalRatingCalc } from "../../Utils/Calculations";
import { ActionModal } from "../../components/ActionModal";
import { ClientReview } from "./ClientReview";
import { Btn } from "../../components/Btn";

export const RatingReviewScreen = ({ route }) => {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const rating = route.params.rating;
  const reviews = route.params.reviews || [];
  const productID = route.params.productID;

  return (
    <TouchableWithoutFeedback onPress={() => setShowWriteReview(false)}>
      <View style={styles.container}>
        <View style={styles.ratingWrapper}>
          <CustomText style={styles.heading} weight="bold">
            Rating&Reviews
          </CustomText>

          <View style={styles.row}>
            <View style={styles.totalRating}>
              <CustomText style={styles.averageRate} weight="medium">
                {averageRatingCalc(rating)}
              </CustomText>
              <CustomText style={styles.totalCount}>
                {totalRatingCalc(rating)} rating
              </CustomText>
            </View>
            <View style={styles.ratingColumn}>
              <RatingRow
                starCount={5}
                ratingCount={Object.values(rating[4])[0]}
                totalRatingCount={totalRatingCalc(rating)}
              />
              <RatingRow
                starCount={4}
                ratingCount={Object.values(rating[3])[0]}
                totalRatingCount={totalRatingCalc(rating)}
              />
              <RatingRow
                starCount={3}
                ratingCount={Object.values(rating[2])[0]}
                totalRatingCount={totalRatingCalc(rating)}
              />
              <RatingRow
                starCount={2}
                ratingCount={Object.values(rating[1])[0]}
                totalRatingCount={totalRatingCalc(rating)}
              />
              <RatingRow
                starCount={1}
                ratingCount={Object.values(rating[0])[0]}
                totalRatingCount={totalRatingCalc(rating)}
              />
            </View>
          </View>
        </View>

        <ClientReviewsList productID={productID} reviews={reviews} />
        <Btn
          btnName="Write a review"
          onPress={() => setShowWriteReview(true)}
          width={128}
          height={36}
          bgColor={COLORS.PRIMARY}
          containerStyle={{ position: "absolute", bottom: 10, right: 16 }}
        />
        {/* <ActionModal
          btnName="Write a review"
          
        /> */}
        {showWriteReview ? <ClientReview productID={productID} /> : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 50,
    backgroundColor: COLORS.BACKGROUND,
  },
  ratingWrapper: {
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
  heading: {
    fontSize: 34,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  averageRate: {
    fontSize: 44,
  },

  totalCount: {
    fontSize: 14,
    color: COLORS.GRAY,
  },

  ratingColumn: {
    justifyContent: "flex-end",
  },
});
