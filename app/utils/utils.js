import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

export const getFormatedDateFromString = (dateString) => {
  const date = new Date(dateString)
  let dd = date.getDate()
  let mm = date.getMonth() + 1 //January is 0
  const yyyy = date.getFullYear()
  if (dd < 10) dd = '0' + dd  
  if (mm < 10) mm = '0' + mm
  return `${yyyy}-${mm}-${dd}`
}

export const getDateStringFromString = (string) => {
  const date = new Date(string).toDateString()
  return date === 'Invalid Date' ? ' - ' : date
}

export const timeZoneName = DeviceInfo.getTimezone()
export const timezone = DeviceInfo.getTimezone()

export const deviceType = Platform.OS === 'android' ? 'A' : 'i'

export const getFormattedDate = (dateString) => {
  const date = new Date(dateString);
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const day = date.getDate() < 10 ? ['0', date.getDate()].join('') : date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const dateArray = [day, monthNames[monthIndex], year];
  const finalDate = dateArray.join(' ');
  let hour = date.getHours();
  const amPM = (hour > 11) ? 'PM' : 'AM';
  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = '12';
  }
  const finalHour = hour.toString().length < 2 ? `0${hour}` : hour;
  const finalMinutes = date.getMinutes().toString().length < 2 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${finalDate.toString()} ${finalHour}:${finalMinutes} ${amPM}`;
}

export const getDateInSeconds = (date) => {
  if (date === undefined || date === null || date === '') {
    return 0;
  }
  const auctionTimeInMiliSeconds = new Date(date).getTime() - new Date().getTime();
  return Number.parseInt(auctionTimeInMiliSeconds / 1000, 10);
}