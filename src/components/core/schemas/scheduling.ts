import { z } from "zod";
import dayjs, { type Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/pt-br";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.extend(duration);

const dateSchema = z.custom<Dayjs>(
  (value) => dayjs(value).isValid(),
  "Data inválida"
);

const hourRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const durationSchema = z
  .string()
  .regex(/^\d{2}:\d{2}$/, { message: "A duração deve estar no formato HH:mm" })
  .refine(
    (value) => {
      const [hours, minutes] = value.split(":").map(Number);
      const totalMinutes = dayjs.duration({ hours, minutes }).asMinutes();

      const minDuration = dayjs.duration({ minutes: 30 }).asMinutes();
      const maxDuration = dayjs.duration({ hours: 2 }).asMinutes();

      return totalMinutes >= minDuration && totalMinutes <= maxDuration;
    },
    {
      message:
        "Duração inválida, um agendamento deve durar no mínimo 30 minutos e no máximo 2 horas",
    }
  );

export const schedulingSchema = z
  .object({
    insuranceBrokerId: z
      .string()
      .min(1, "O campo corretor de seguros é obrigatório"),
    date: dateSchema,
    time: z
      .string()
      .min(1, "O campo hora é obrigatório")
      .regex(hourRegex, "A hora deve estar no formato HH:mm e ser válida"),
    duration: durationSchema,
  })
  .superRefine(({ date, time }, ctx) => {
    const [hour, minutes] = time.split(":").map(Number);

    const formattedDate = dayjs(date).set("hour", hour).set("minutes", minutes);

    const nowOneMinuteInTheFuture = dayjs(new Date())
      .second(0)
      .add(1, "minute");

    if (nowOneMinuteInTheFuture.isAfter(formattedDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Horário inválido, a data deve estar no futuro",
        path: ["time"],
      });
    }
  })
  .transform((data) => {
    const { date, ...rest } = data;

    return {
      date: date.tz("America/Sao_Paulo").format("DD/MM/YYYY"),
      ...rest,
    };
  });

export type CreateSchedulingData = z.infer<typeof schedulingSchema>;
