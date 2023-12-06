export function toLocalDateFromUtc(dateInUtc: Date) {
    // const result = new Date(dateInUtc);
    // result.setMinutes(dateInUtc.getMinutes() - dateInUtc.getTimezoneOffset());
    return dateInUtc;
}