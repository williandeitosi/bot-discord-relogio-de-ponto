export type PunchType = "entrada" | "almoco" | "retorno" | "pausa" | "saida";

export class Punch {
  constructor(
    public userId: string,
    public type: PunchType,
    public timestamp: Date = new Date()
  ) {}
}
