import moment from "moment";

export const dateTimeFormatter = value =>
    value ? moment(value * 1000).format("DD/MM/YYYY HH:mm") : "";