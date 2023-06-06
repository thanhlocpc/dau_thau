export const formatDateFull = date =>
    `${date.getDate() > 9 ? date.getDate() : ('0' + date.getDate())}/${date.getMonth() > 8 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))}/${date.getFullYear()} ${date.getHours() > 9 ? date.getHours() : ('0' + date.getHours())}:${date.getMinutes() > 9 ? date.getMinutes() : ('0' + date.getMinutes())}`
