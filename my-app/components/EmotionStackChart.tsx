import { LogBox } from 'react-native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryChart, VictoryStack, VictoryBar, VictoryAxis, VictoryTheme } from 'victory-native';
import { useWindowDimensions } from 'react-native';

// 특정 경고 무시
LogBox.ignoreLogs([
    'VictoryAxis: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
]);

interface EmotionStackChartProps {
    selectedEmotions: string[];
    chartData: {
        labels: string[];
        datasets: { data: number[]; color: () => string; label: string }[];
    };
    emotionDataByDay: { [key: string]: number[] };
}

const EmotionStackChart: React.FC<EmotionStackChartProps> = ({ selectedEmotions, chartData, emotionDataByDay }) => {
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();

    return (
        <View style={styles.chartContainer}>
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 30, y: 10 }}
                padding={{ top: 15, bottom: 30, left: 40, right: 30 }}
                width={screenWidth - 40}
                height={screenHeight * 0.25}
            >
                <VictoryAxis
                    tickValues={chartData.labels}
                    tickFormat={chartData.labels}
                    style={{
                        axis: { stroke: 'transparent' },
                        ticks: { stroke: 'transparent' },
                        tickLabels: { fill: '#000', fontSize: 12 },
                        grid: { stroke: 'transparent' },
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    domain={[0, 1]}
                    tickFormat={(t: number) => (t === 0 ? '0' : t.toFixed(1))}
                    style={{
                        axis: { stroke: 'transparent' },
                        ticks: { stroke: 'transparent' },
                        tickLabels: { fill: '#000', fontSize: 12 },
                        grid: { stroke: 'transparent' },
                    }}
                />
                <VictoryStack>
                    {selectedEmotions.map((emotion, index) => {
                        const dataset = chartData.datasets.find((d) => d.label === emotion);
                        if (!dataset) return null;

                        return (
                            <VictoryBar
                                name={`selected-${index}`}
                                data={emotionDataByDay[dataset.label].map((y, x) => ({
                                    x: chartData.labels[x],
                                    y: y || 0,
                                }))}
                                style={{
                                    data: {
                                        fill: dataset.color(),
                                        opacity: 1,
                                    },
                                }}
                                barWidth={10}
                                animate={{
                                    duration: 1000,
                                    onEnter: {
                                        duration: 1000,
                                        before: () => ({ y: 0 }),
                                        after: (datum: any) => ({ y: datum.y }),
                                    },
                                    onLoad: { duration: 1000 },
                                }}
                            />
                        );
                    })}
                </VictoryStack>
            </VictoryChart>
        </View>
    );
};

const styles = StyleSheet.create({
    chartContainer: {},
});

export default EmotionStackChart;
