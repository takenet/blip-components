import moment from 'moment';

export const getDatesInPeriod = (start, end, key, arr = [moment(start).startOf(key)]) => {
    let endDate = moment(end);
    let startDate = moment(start);
    if (startDate.isAfter(endDate)) throw new Error('start must precede end');

    const next = startDate
        .add(1, key)
        .startOf(key);

    if (next.isAfter(endDate, key)) return arr;

    return getDatesInPeriod(next, endDate, key, arr.concat(next));
};

/**
 * Receives an string date and returns javascript Date
 * @param {String} d - Date in format (DD/MM/YYYY)
 */
export const formatDateFromString = d => {
    let [day, month, year] = d.split('/');

    return new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
    );
};

export const getUsFormatDate = (date) => {
    let [day, month, year] = date.split('/');

    return `${month}/${day}/${year}`;
};

export const getBrFormatDate = (date) => {
    let [day, month, year] = date.split('/');

    return new Date(`${month}/${day}/${year}`);
};
