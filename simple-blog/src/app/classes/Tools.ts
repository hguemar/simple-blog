// class abstraite qui contient une ou plusieurs méthodes staitques
export abstract class Tools {
  private constructor() {
  }

  /**
   * Récupère la date d'aujourd'hui au format JJ/MM/AAAA
   * @return date
   */
  public static getCurrentDate() {
    const todayDate = new Date();
    const day = todayDate.getDate().toString().length < 2 ? '0' + todayDate.getDate().toString() : todayDate.getDate().toString();
    const month = todayDate.getMonth().toString().length < 2 ? '0' + todayDate.getMonth().toString() : todayDate.getMonth().toString();
    const year = todayDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
