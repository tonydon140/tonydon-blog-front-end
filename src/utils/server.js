//初始化时间
export default function initDate(dateStr, full) {
    let dateObj = new Date(dateStr);
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() < 9 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
    let date = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate();

    if (full === 'all') {
        // 2000年01月01日 12:00:00
        return year + '年' + month + '月' + date + '日' + " " + dateStr.split(" ")[1];
    } else if (full === 'year') {
        return year
    } else if (full === 'month') {
        return dateObj.getMonth() + 1
    } else if (full === 'date') {
        return date
    } else if (full === 'newDate') {
        // 2000年01月01日
        return year + '年' + month + '月' + date + '日';
    }
}

