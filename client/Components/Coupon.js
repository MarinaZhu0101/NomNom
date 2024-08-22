import { View, Text, StyleSheet,ImageBackground, TouchableOpacity, SafeAreaView, Image, ViewComponent} from "react-native"
import { Feather, MaterialIcons } from "@expo/vector-icons"

const Coupon = () => {
    return (
            <View style={styles.couponContainer}>
                <Text style={styles.couponTitle}>Redeem Your Coupons</Text>
                <View style={styles.coupon}>
                    <View style={styles.eachCoupon}>
                        <View style={styles.left}>
                            <Text style={styles.one}>Puty Kitchen</Text>
                            <Text style={styles.two}>Free meal tasting event</Text>
                            <Text style={styles.three}></Text>
                            <Text style={styles.four}>Entrance ticket of free meal tasting event for one person</Text>
                            <View style={styles.timeContainer}>
                                <Feather name="clock" color={'#9E9E9E'} size={15}/>
                                <Text style={styles.five}>49d 20h 29m</Text>
                            </View>
                        </View>
                        <View style={styles.right}>
                        <ImageBackground source={require('../assets/couponRight.png')} resizeMode="cover" style={styles.imageBg}>
                            <Text style={styles.six}>points</Text>
                            <Text style={styles.seven}>1000</Text>
                            </ImageBackground>
                        </View>
                    </View>
                    <View style={styles.eachCoupon}>
                        <View style={styles.left}>
                            <Text style={styles.one}>Bear Market</Text>
                            <Text style={styles.two}>10% off on all coffee</Text>
                            <Text style={styles.three}></Text>
                            <Text style={styles.four}>Order any coffe you like with 10% off, pastry doesn't applied</Text>
                            <View style={styles.timeContainer}>
                                <Feather name="clock" color={'#9E9E9E'} size={15}/>
                                <Text style={styles.five}>10d 20h 29m</Text>
                            </View>
                        </View>
                        <View style={styles.right}>
                            <ImageBackground source={require('../assets/couponRight.png')} resizeMode="cover" style={styles.imageBg}>
                                <Text style={styles.six}>points</Text>
                                <Text style={styles.seven}>200</Text>
                            </ImageBackground>
                            
                            
                        </View>
                    </View>
                </View>
            </View> 
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    couponTitle: {
         fontFamily:'Ubuntu-Medium',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 25
    },
    eachCoupon: {
        flexDirection: 'row',
        flex: 1,
        shadowColor: 'rgb(200,200,200)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3, 
        marginBottom: 15
    },
    left:{
        flex: 3, 
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingVertical: 20,
        paddingLeft: 20
    },
    one:{
        fontSize: 20,
        fontFamily: 'Ubuntu-Regular'
    },
    two: {
        color: '#E65100',
        fontSize: 14,
        fontFamily: 'Ubuntu-Regular',
        marginTop: 5
    },
    three:{
        height: 1.5,
        width: 230,
        backgroundColor: '#FFCDB2',
        marginTop: 10
    },
    four:{
        fontSize: 12,
        fontFamily: 'Ubuntu-Regular',
        color: '#9E9E9E',
        marginTop: 10,
        width: 200,
    },
    timeContainer:{
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        justifyContent: 'space-around',
        width: 100,
        borderRadius: 5,
        marginTop: 10
    },
    five:{
        fontSize: 12,
        fontFamily: 'Ubuntu-Regular',
        color: '#9E9E9E',
    },
    right:{
        flex: 1.2,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    six: {
        fontSize: 11,
        fontFamily: 'Ubuntu-Bold',
        color: 'white'
    },
    seven: {
        fontSize: 24,
        fontFamily: 'Ubuntu-Bold',
        color: 'white',
    },

    imageBg:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    }

})

export default Coupon