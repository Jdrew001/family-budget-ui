import moment from 'moment';

export class DateUtils {
    public static formatYYYYMMDD(date: Date): string {
        return moment(date).format('YYYY-MM-DD')
    }
}