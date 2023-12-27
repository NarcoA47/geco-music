import Slider from '@react-native-community/slider';
import React, {useEffect, useRef, useState} from 'react'
import { SafeAreaView, View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList, Animated } from 'react-native'
import TrackPlayer, {Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents} from 'react-native-track-player'

import { GrChapterNext } from "react-icons/gr";
import { CiPlay1 } from "react-icons/ci";
import { GrChapterPrevious } from "react-icons/gr";


const {width, hieght} = Dimensions.get('window');

const setupPlayer = async() => {
    await TrackPlayer.setupPlayer();

    await TrackPlayer.add(songs);
}

const togglePlayback = async(playbackState) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack != null) {
        if(playbackState == State.Paused) {
            await TrackPlayer.play();
        } else {
            await TrackPlayer.pause();
        }
    }
}

const MusicPlayer = () => {
    const playbackState = usePlaybackState();

    const scrollX = useRef(new Animated.Value(0)).current;
    const [songIndex, setSongIndex] = useState(0);

    const songSlider = useRef(null);

    useEffect(() => {
        scrollX.addListener(({ value }) => {
            const index = Math.round(value / width);
            setSongIndex(index);
        });

        return () => {
            scrollX.removeAllListeners();
        }
    }, []);

    const skipToNext = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex + 1) * width,
        })
    }

    const skipToPrevious = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex - 1) * width,
        })
    }

    const renderSongs = ({index, item}) => {
        return (
            <Animated.View style={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <View style={StyleSheet.artWorkWrapper}>
                <image 
                source={item.artwork}
                style={styles.artworkImg}
                ></image>
            </View>
            </Animated.View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={{width: width}}>
                    <Animated.FlatList
                    ref={songSlider}
                    data={songs}
                    renderItem={renderSongs}
                    keyExtractor={(item) => item.id}
                    horzontal
                    pagingEnabled
                    showHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [
                            {nativeEvent: {
                                contentOffset: {x: scrollX}
                            }}
                        ],
                        {useNativeDriver: true}
                    )}
                    />
                </View>

                <View>
                    <Text style={styles.title}>{songs[songIndex].title}</Text>
                    <Text style={styles.title}>{songs[songIndex].artist}</Text>
                </View>

                <View>
                    <Slider
                    style={styles.progressContainer}
                    value={10}
                    minimumValue={0}
                    maximumValue={100}
                    thumbTintColor='#FFD369'
                    minimumTrackTintColor='#FFD369'
                    maximumTrackTintColor='#FFF'
                    onSlidingComplete={()=>{}}
                    />
                </View>
                <View style={styles.musicControlls}>
                    <TouchableOpacity onPress={skipToPrevious}>
                    <GrChapterPrevious />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                    <CiPlay1 />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                    <GrChapterNext />
                    </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>
    )
}

export default function MusicPlayer() {
  return (
    <div>MusicPlayer</div>
  )
}
