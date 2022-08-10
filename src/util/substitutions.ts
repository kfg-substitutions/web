import { Substitution } from "types";

class Substitutions {
  substitutions: Substitution[];

  constructor(substitutions: Substitution[]) {
    this.substitutions = substitutions;
  }

  get() {
    return this.substitutions;
  }

  add(substitution: Substitution) {
    this.substitutions.push(substitution);

    return {
      success: true,
      message: "Sikeres hozzáadás!",
    };
  }

  update(id: Number, newSubstitution: Substitution) {
    if (!this.substitutions.find((substitution) => substitution.id === id))
      return {
        success: false,
        error: "Helyettesítés ezzel az azonosítóval nem létezik.",
      };

    const index = this.substitutions.findIndex(
      (substitution) => substitution.id === id
    );

    this.substitutions[index] = newSubstitution;

    return {
      success: true,
      message: "Sikeres módosítás!",
    };
  }

  remove(id: Number) {
    if (!this.substitutions.find((substitution) => substitution.id === id))
      return {
        success: false,
        error: "Helyettesítés ezzel az azonosítóval nem létezik.",
      };

    const index = this.substitutions.findIndex(
      (substitution) => substitution.id === id
    );

    this.substitutions.splice(index, 1);

    return {
      success: true,
      message: "Sikeres törlés!",
    };
  }
}

let todaySubstitutions = new Substitutions([
  {
    id: 1,
    substitutor: "A",
    substituted: "B",
    hour: "1.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
  {
    id: 2,
    substitutor: "A",
    substituted: "B",
    hour: "1.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
]);
let tomorrowSubstitutions = new Substitutions([]);

export { todaySubstitutions, tomorrowSubstitutions };

export default Substitutions;
