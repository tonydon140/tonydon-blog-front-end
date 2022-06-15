// dateStr: 2022-06-15T01:27:38
export function parseDate(dateStr) {
    let year = dateStr.substring(0, 4);
    let month = dateStr.substring(5, 7);
    let day = dateStr.substring(8, 10);
    let hours = dateStr.substring(11, 13);
    let minutes = dateStr.substring(14, 16);
    let seconds = dateStr.substring(17, 19);

    return {
        year,
        month,
        day,
        hours,
        minutes,
        seconds
    }
}

export function formatDate(){

}
