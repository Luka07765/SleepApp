import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const SoundButton = ({
  soundKey,
  soundFile,
  isActive,
  toggleSound,
  icon,
  activeColor,
  inactiveColor,
}) => {
  return (
    <TouchableOpacity
      className={`rounded-full w-20 h-20 justify-center items-center mb-0`}
      style={{ backgroundColor: isActive ? activeColor : inactiveColor }}
      onPress={() => toggleSound(soundFile, soundKey)}
    >
      <Image
        source={icon}
        resizeMode="contain"
        alt="upload"
        className="w-1/2 h-1/2"
        style={{ tintColor: 'white' }}
      />
    </TouchableOpacity>
  );
};

export default SoundButton;
