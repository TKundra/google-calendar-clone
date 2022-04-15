import dayjs from "dayjs";

/*
year - 2022
month - april i.e 3 [0,..,11]; 0 - january
firstDayOfMonth - friday i.e 5 [0,..,6]; 0 - sunday
currentMonthCount - (0-firstDayOfMonth) => -5 (it means sun, mon, tue, wed, thu - reserved for prev month dates where current month 1st daye starting from friday)
-ve for previous month dates

if you are in month - april, year - 2022
* new Date(year, month, 3)  - Fri Apr 03 2022
* new Date(year, month, 2)  - Fri Apr 02 2022
* new Date(year, month, 1)  - Fri Apr 01 2022
* new Date(year, month, 0)  - Thu Apr 31 2022
* new Date(year, month, -1) - Wed Apr 30 2022
* new Date(year, month, -2) - Tue Apr 29 2022
* new Date(year, month, -3) - Mon Mar 28 2022

*/

export function getMonth(month = dayjs().month()) { // month otherwise default current month
    const year = dayjs().year();

    const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

    let currentMonthCount = 0 - firstDayOfMonth;

    // 5 rows, 7 columns
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill([]).map(() => {
            // individual cell
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        })
    }); // 2D
    return daysMatrix;
}
