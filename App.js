/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//Baishakh, Jestha, Ashadh,
import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {data, months, days} from './data/date';
import Calendar from './components/calendar';

const nepali = require('nepali-calendar-js');

const date = new Date();
const today = nepali.toNepali(
	date.getFullYear(),
	date.getMonth() + 1,
	date.getDate(),
);
console.log(date.getFullYear(), date.getMonth() + 1, date.getDate());
console.log(today);

const App = () => {
	const [currSelectedMonth, setCurrentMonth] = useState(today.nm - 1);
	const [thisMonth, setThisMonth] = useState(today.nm);
	const [todayDate, setToday] = useState(today.nd - 1);

	const IncreaseMonth = () => {
		let currMonth = currSelectedMonth + 1;
		if (currMonth < 12) {
			setCurrentMonth(currMonth);
		}
	};

	const DecreaseMonth = () => {
		let currMonth = currSelectedMonth - 1;
		if (currMonth >= 0) {
			setCurrentMonth(currMonth);
		}
	};

	const ChangeDate = newDate => {
		setToday(newDate);
	};

	return (
		<View style={styles.center}>
			<View style={styles.container}>
				<View style={styles.containerBox}>
					<Button title="Prev" onPress={DecreaseMonth} />
				</View>
				<View style={styles.containerBox}>
					<Text style={styles.monthTitle}>
						{months[currSelectedMonth]}
					</Text>
				</View>
				<View style={styles.containerBox}>
					<Button title="Next " onPress={IncreaseMonth} />
				</View>
			</View>

			<Calendar
				monthData={data[currSelectedMonth]}
				todayDate={today.nd}
				thisMonth={thisMonth}
				ChangeDate={ChangeDate}
			/>

			<View style={styles.details}>
				{/* Day Details */}
				<Text>
					{months[currSelectedMonth]} {todayDate}
				</Text>
				<Text>{data[currSelectedMonth].days[todayDate - 1].tithi}</Text>
				<Text>{data[currSelectedMonth].days[todayDate - 1].event}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flexDirection: 'row',
	},
	containerBox: {
		width: '33%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	monthTitle: {
		fontSize: 24,
	},
	details: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default App;
