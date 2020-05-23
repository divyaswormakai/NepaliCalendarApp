import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {days} from '../data/date';

export default function Calendar({
	monthData,
	todayDate,
	thisMonth,
	ChangeDate,
}) {
	const dates = monthData.days;
	const startDay = monthData.startDay - 1;
	const Date = ({text, style, keyTxt}) => {
		return (
			<TouchableOpacity onPress={() => ChangeDate(text)}>
				<View style={style} key={keyTxt}>
					<Text>{text}</Text>
				</View>
			</TouchableOpacity>
		);
	};
	const showDayRow = () => {
		return days.map((day, ind) => {
			return (
				<View style={styles.DayBox} key={ind}>
					<Text>{day}</Text>
				</View>
			);
		});
	};
	const showCalendar = () => {
		let dateIndx = -1;
		let rows = [0, 1, 2, 3, 4, 4];
		let cols = [0, 1, 2, 3, 4, 5, 6];
		let keyCount = 7;

		return rows.map(row => {
			return (
				<View style={styles.container}>
					{cols.map(col => {
						keyCount += 1;

						let styleToApply = styles.emptyDate;
						if (monthData.month < thisMonth) {
							styleToApply = styles.GoneDate;
						} else if (monthData.month === thisMonth) {
							//had to use +2 due to inconsistent indexing of data
							if (dateIndx + 2 === todayDate) {
								styleToApply = styles.activeDate;
							} else if (dateIndx + 2 <= todayDate) {
								styleToApply = styles.GoneDate;
							}
						}
						if (row === 0) {
							//For First row only
							if (col === startDay) {
								dateIndx += 1;
								return (
									<Date
										style={styleToApply}
										text={dates[dateIndx].dayInEn}
										keyTxt={keyCount}
									/>
								);
							} else if (col >= startDay) {
								dateIndx += 1;
								return (
									<Date
										style={styleToApply}
										text={dates[dateIndx].dayInEn}
										keyTxt={keyCount}
									/>
								);
							} else {
								return (
									<View style={styleToApply} key={keyCount}>
										<Text />
									</View>
								);
							}
						} else {
							if (dateIndx < dates.length - 1) {
								dateIndx += 1;
								return (
									<Date
										style={styleToApply}
										text={dates[dateIndx].dayInEn}
										keyTxt={keyCount}
									/>
								);
							} else {
								return <View style={styles.empty} />;
							}
						}
					})}
				</View>
			);
		});
	};

	return (
		<View>
			<View style={styles.container}>{showDayRow()}</View>

			{showCalendar()}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingVertical: 2,
	},
	empty: {
		height: 50,
		width: 50,
		marginHorizontal: 2,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
	},
	emptyDate: {
		height: 50,
		width: 50,
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 5,
		marginHorizontal: 2,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
	},
	activeDate: {
		height: 50,
		width: 50,
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 5,
		marginHorizontal: 2,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'green',
	},
	GoneDate: {
		height: 50,
		width: 50,
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 5,
		marginHorizontal: 2,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'gray',
	},
	DayBox: {
		height: 50,
		width: 50,
		alignItems: 'center',
		marginHorizontal: 2,
		justifyContent: 'center',
	},
});
