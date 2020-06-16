import React from 'react';
import Svg, {Circle} from 'react-native-svg';

export const ThreeDot = ({width,height}) => {
    return (
        <Svg height={height} viewBox="0 0 512 512" width={width}>
            <Circle cx="256" cy="256" r="64" fill={'#ffffff'}/>
            <Circle cx="256" cy="448" r="64" fill={'#ffffff'}/>
            <Circle cx="256" cy="64" r="64" fill={'#ffffff'}/>
        </Svg>
    );
};
