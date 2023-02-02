export const sortArrayBasedOnMonthAndDate = (items) => {
    const results = [];

    let startDate = new Date();
    let endDate = new Date();
    endDate.setMonth(startDate.getMonth() - 12);

    while (startDate > endDate) {
        let monthlyRecords = {
            month: getMonthString(startDate.getMonth()) + " " + startDate.getFullYear(),
            reports: []
        }

        items.forEach(item => {
            if (item.date.getMonth() === startDate.getMonth() && item.date.getFullYear()) {
                let newReport = {
                    id: item._id,
                    day: item.date.getDate() + getDateTitle(item.date.getDate()),
                    description: item.name,
                    imgUrl: item.imgPath
                }

                monthlyRecords.reports.push(newReport);
            }
        })

        results.push(monthlyRecords);
        startDate.setMonth(startDate.getMonth() - 1);
    }

    return results;
}

const getMonthString = (month) => {
    switch (month) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            return;
    }
}

const getDateTitle = (date) => {
    if (date > 3 && date < 21) return 'th';
    switch (date % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}