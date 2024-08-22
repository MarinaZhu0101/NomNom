import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ViewComponent} from "react-native"
import PointsCard from "./PointsCard";
import Badges from "./Badges";
import BadgesTwo from "./BadgesTwo";
import Coupon from "./Coupon";

const Achievements = () => {
    const userName = '';

    return (
        <View style={styles.container}>
            <PointsCard />
            {userName === 'Moru' ? <BadgesTwo /> : <Badges />}
            {userName !== 'Moru' && <Coupon />}
        </View>    
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },

})

export default Achievements