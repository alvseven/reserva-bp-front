import dayjs, { type ConfigType } from "dayjs";
import "dayjs/locale/pt-br";

export function verifyDateIsInTheFuture(date: ConfigType) {
  dayjs.locale("pt-br");

  const currentDate = dayjs(
    new Date(),
    "dddd, D [de] MMMM [de] YYYY [às] HH:mm"
  );
  const dateToCheck = dayjs(date, "dddd, D [de] MMMM [de] YYYY [às] HH:mm");

  return dateToCheck.isAfter(currentDate);
}
