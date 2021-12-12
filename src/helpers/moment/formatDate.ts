import moment from 'moment'

const formatCompleteDate = (date: string | Date): string => {
  return moment(date).format('D MMM YYYY, HH:mm')
}

export default formatCompleteDate
