import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { serverAddress } from './Config';

interface WordCloudProps {
    imageData: string;
}

const WordCloud: React.FC<WordCloudProps> = ({ imageData }) => {
    // 이미지 URL이 유효한지 확인
    const isValidImageUrl = imageData && imageData.trim() !== '';
    const imageUrl = isValidImageUrl ? `${serverAddress}${imageData}` : null;

    return (
        <View style={styles.container}>
            {imageUrl ? (
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    onError={(error) => {
                        console.error('워드클라우드 이미지 로드 실패:', error.nativeEvent);
                    }}
                    // 이미지 로딩 중 표시할 로딩 인디케이터
                    loadingIndicatorSource={<ActivityIndicator size="large" color="#4a9960" />}
                />
            ) : (
                <View style={styles.placeholderContainer}>
                    <Text style={styles.placeholderText}>
                        아직 대화 데이터가 충분하지 않습니다.{'\n'}더 많은 대화를 나누어 보세요!
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    placeholderText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
        lineHeight: 24,
    },
});

export default WordCloud;
