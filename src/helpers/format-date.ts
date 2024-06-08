import dayjs, { type ConfigType } from "dayjs";
import "dayjs/locale/pt-br";

export function formatDate(date: ConfigType, withDatetime = true) {
  dayjs.locale("pt-br");

  const currentDate = dayjs(date);

  return withDatetime
    ? currentDate.format("dddd, D [de] MMMM [de] YYYY [às] HH:mm")
    : currentDate.format("dddd, D [de] MMMM [de] YYYY");
}
