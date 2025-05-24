import React, {useRef} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

type Props = {
  title: string;
  onShortPress: () => void;
  onHoldStep: () => void;
  style?: object;
};

export const HoldableSkipButton = ({
  title,
  onShortPress,
  onHoldStep,
  style = {},
}: Props) => {
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const holdInterval = useRef<NodeJS.Timeout | null>(null);
  const longPressTriggered = useRef(false);

  const onPressIn = () => {
    longPressTriggered.current = false;
    holdTimeout.current = setTimeout(() => {
      longPressTriggered.current = true;
      holdInterval.current = setInterval(onHoldStep, 300);
    }, 300);
  };

  const onPressOut = () => {
    if (!longPressTriggered.current) {
      onShortPress();
    }

    if (holdTimeout.current) clearTimeout(holdTimeout.current);
    if (holdInterval.current) clearInterval(holdInterval.current);
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
      <Text>{title}</Text>
    </Pressable>
  );
};
