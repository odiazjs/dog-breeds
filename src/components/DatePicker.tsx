import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FilterActions } from '../redux/FilterActions';

export interface DateProps {
	date: string | undefined;
}

export const DatePicker: React.FC<DateProps> = ({ date }) => {
	const dispatch = useDispatch();

	/** @memoized */
	const changeDate = useCallback(
		(date: string) => dispatch(FilterActions.changeDate(date)),
		[dispatch]
	);

	return (
		<div className='container'>
			<label>Date: </label>
			<input
				type='date'
				id='eventDate'
				name='event-date'
				value={date}
				min='2022-04-01'
				max='2022-10-5'
				onChange={ev => {
					console.log('date picker click - ', ev.target.value);
					changeDate(ev.target.value);
				}}
			/>
		</div>
	);
};
