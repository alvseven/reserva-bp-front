import dayjs, { type ConfigType } from "dayjs";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export function formatDate(
  date: ConfigType,
  withDatetime = true,
  time?: string
) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("pt-br");

  const currentDate = dayjs(date).utc();

  if (!withDatetime) {
    return currentDate
      .tz("America/Sao_Paulo", true)
      .format("dddd, D [de] MMMM [de] YYYY");
  }

  if (time) {
    const [hours, minutes] = time.split(":").map(Number);

    return currentDate
      .tz("America/Sao_Paulo", true)
      .set("hours", hours)
      .set("minute", minutes)
      .format("dddd, D [de] MMMM [de] YYYY [às] HH:mm");
  }

  return currentDate
    .tz("America/Sao_Paulo")
    .format("dddd, D [de] MMMM [de] YYYY [às] HH:mm");
}
