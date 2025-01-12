import {pad} from "@/lib/stringArray";

export const humanTime = function(time: any) {
	time = parseInt(time, 10);
	let hours: any = pad(parseInt(`${(time % 86400) / 3600}`, 10), 2);

	let minutes: any = parseInt(`${(time % 3600) / 60}`, 10);
	let seconds: any = parseInt(`${time % 60}`, 10);
	if (`${minutes}`.length === 1) {
		minutes = `0${minutes}`;
	}
	if (`${seconds}`.length === 1) {
		seconds = `0${seconds}`;
	}
	if (hours === 0) {
		hours = '00:';
	} else {
		hours = `${hours}:`;
	}
	if (minutes === 0) {
		minutes = '00:';
	} else {
		minutes = `${minutes}:`;
	}
	if (hours == '00:') {
		hours = '';
	}
	const current = hours + minutes + seconds;
	return current.replace('NaN:NaN:NaN', '00:00');
};