import { Substitution } from "types";

// TODO save substitutions to file instead of memory

class Substitutions {
  substitutions: Substitution[];

  constructor(substitutions: Substitution[]) {
    this.substitutions = substitutions;
  }

  get() {
    return this.substitutions;
  }

  add(substitution: Substitution) {
    // TODO real ID generation
    const id = Math.floor(Math.random() * 10000) + 5;

    const substitutionWithID = {
      id,
      ...substitution,
    };

    this.substitutions.push(substitutionWithID);

    return {
      success: true,
      message: "Sikeres hozzáadás!",
      id,
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

    const substitutionWithID = {
      id: this.substitutions[index].id,
      ...newSubstitution,
    };

    this.substitutions[index] = substitutionWithID;

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

    this.substitutions = this.substitutions.filter(
      (substitution) => substitution.id !== id
    );

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
    hour: "2.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
]);
let tomorrowSubstitutions = new Substitutions([]);

export { todaySubstitutions, tomorrowSubstitutions };

export default Substitutions;
