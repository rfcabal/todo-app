class utils {
    static parseDate(date: Date) {
        const day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear()

        return (`${year}-${month > 9 ? month : 0 + month.toString()}-${day}`);
    }
}


export default utils
