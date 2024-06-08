import { z } from "zod";
import dayjs, { type Dayjs } from "dayjs";

const hourRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const dayJsDaySchema = z.custom<Dayjs>(
  (value) => dayjs(value).isValid(),
  "Data inválida"
);

export const schedulingSchema = z
  .object({
    insuranceBrokerId: z
      .string()
      .min(1, "O campo corretor de seguros é obrigatório"),
    date: dayJsDaySchema,
    time: z
      .string()
      .min(1, "O campo hora é obrigatório")
      .regex(hourRegex, "A hora deve estar no formato HH:mm e ser válida"),
  })
  .superRefine(({ date, time }, ctx) => {
    const [hour, minutes] = time.split(":").map((value) => Number(value));

    const formattedDate = dayjs(date).set("hour", hour).set("minutes", minutes);

    const nowOneMinuteInTheFuture = dayjs(new Date())
      .second(0)
      .add(1, "minute");

    if (nowOneMinuteInTheFuture.isAfter(formattedDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Horário inválido, a data deve estar no futuro`,
        path: ["time"],
      });
    }
  });

export type CreateSchedulingData = z.infer<typeof schedulingSchema>;
