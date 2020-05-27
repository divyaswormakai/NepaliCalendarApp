import RNCalendarEvents from 'react-native-calendar-events';
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {days} from '../data/date';

const nepali = require('nepali-calendar-js');

export default function CalendarData() {
	const [events, setEvents] = useState([]);
	const [eventsLoaded, setEventsLoaded] = useState(false);

	const fetchData = async () => {
		try {
			let calendarAuthStatus = await RNCalendarEvents.authorizationStatus();
			// console.log('Calendar Status', calendarAuthStatus);

			let requestCalendarPersmission = await RNCalendarEvents.authorizeEventStore();
			// console.log('Calendar Permission', requestCalendarPersmission);

			let availableCalendars = await RNCalendarEvents.findCalendars();
			let availIds = availableCalendars
				.filter(calendar => calendar.isPrimary === true)
				.map(calendar => {
					return calendar.id;
				});

			const nextDate = new Date(Date.now() + 14 * 86400000);

			let allEvents = await RNCalendarEvents.fetchAllEvents(
				new Date(),
				nextDate.toISOString(),
				availIds,
			);
			let eventTitles = allEvents.map(ev => {
				return ev.title;
			});
			setEvents(allEvents.reverse());
			setEventsLoaded(true);
			// return eventTitles;
		} catch (err) {
			console.log(err);
		}
	};

	const ChangeToNepali = date => {
		const temp = new Date(date);
		const today = nepali.toNepali(
			temp.getFullYear(),
			temp.getMonth() + 1,
			temp.getDate(),
		);
		return (
			today.ny +
			'/' +
			today.nm +
			'/' +
			today.nd +
			', ' +
			days[temp.getDay()]
		);
	};

	useEffect(() => fetchData(), []);

	return (
		<View style={styles.container}>
			<View style={styles.itemRow}>
				<Text style={styles.bold}>Upcoming Events: Events: </Text>
			</View>
			<FlatList
				data={events}
				renderItem={({item, index}) => (
					<View style={styles.itemRow} key={'flatlist' + index}>
						<Text style={styles.title}>
							{index + 1 + '. '}
							{item.title + '' + ', '}
							{ChangeToNepali(item.startDate)}
						</Text>
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingVertical: 2,
		paddingHorizontal: 15,
		paddingTop: 20,
	},
	itemRow: {
		justifyContent: 'center',
	},
	bold: {
		fontWeight: 'bold',
	},
});
