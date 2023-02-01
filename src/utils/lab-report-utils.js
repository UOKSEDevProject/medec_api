export const sortArrayBasedOnMonthAndDate = (items) => {
    let results = [];

    let currentYear = items[0].date.getFullYear();
    let currentMonth = items[0].date.getMonth();
    let month = getMonthString(currentMonth) + " " + currentYear;

    let monthlyReports = {
        month: month,
        reports: []
    }

    items.map(report => {
        let reportYear = report.date.getFullYear();
        let reportMonth = report.date.getMonth();
        let reportDate = report.date.getDate();

        let newReport = {
            id: report._id,
            day: reportDate + getDateTitle(reportDate),
            description: report.name,
            imgUrl: report.imgPath
        }

        if (reportMonth !== currentMonth) {
            results.push(monthlyReports);

            while (currentMonth < reportMonth) {
                monthlyReports.month = getMonthString(currentMonth) + " " + reportYear;
                monthlyReports.reports = [];
                if (currentMonth < reportMonth) {
                    results.push(monthlyReports)
                }
                currentMonth++;
            }
        } else {
            monthlyReports.reports.push(newReport);

            if (items.indexOf(report) === items.length - 1) {
                results.push(monthlyReports);
            }
        }
    })

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