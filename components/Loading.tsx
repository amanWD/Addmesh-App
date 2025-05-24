import {useEffect, useRef} from 'react';
import {Animated, Easing, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Loading = ({color, size = 18}: {color: string; size: number}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    };

    startRotation();
  }, [rotateAnim]);
  return (
    <Animated.View style={{transform: [{rotate: spin}]}}>
      <AntDesign name="loading1" size={size} color={color} />
    </Animated.View>
  );
};

export default Loading;
