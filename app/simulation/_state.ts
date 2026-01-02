export type Gender = 'male' | 'female';
export type Status = 'born' | 'alive' | 'died' | 'dead';

export type Result = {
  year: number;
  m: number;
  f: number;
  born: number;
  alive: number;
  died: number;
  dead: number;
  withPartner: number;
  population: number;
};

export type Citizen = {
  id: number;
  gender: Gender;
  age: number;
  status: Status;
  partner?: number;
  children?: number[];
  likelihoodForPartner: number;
  health: number;
  fertility: number; // only applied to females
  mother?: number;
  father?: number;
};

export class State {
  citizens: Citizen[];
  livingCitizens: Citizen[];
  year: number;

  constructor(year: number, citizens: Citizen[]) {
    this.year = year;
    this.citizens = citizens;
    this.livingCitizens = citizens.filter((c) => c.status !== 'dead');
  }

  derive(fn: (s: State) => State, year: number): State {
    this.year = year;
    return fn(this);
  }

  clone(year?: number): State {
    return new State(year ?? this.year, [...this.citizens]);
  }

  addChild(mother: Citizen): number {
    const id = this.citizens.length;
    const gender: Gender = Math.random() < 0.488 ? 'female' : 'male';
    const child: Citizen = {
      id,
      gender,
      age: 0,
      status: 'born',
      health: Math.random(),
      likelihoodForPartner: Math.random(),
      fertility: Math.random(),
      mother: mother.id,
      father: mother.partner,
    };
    this.citizens.push(child);
    this.livingCitizens.push(child);
    return child.id;
  }

  get population(): number {
    return this.citizens.filter((c) => c.status === 'alive').length;
  }

  get male(): number {
    return this.citizens.filter(
      (c) => c.gender === 'male' && c.status === 'alive'
    ).length;
  }

  get living(): Citizen[] {
    this.livingCitizens = this.livingCitizens.filter(
      (c) => c.status !== 'dead'
    );
    return this.livingCitizens;
  }

  get female(): number {
    return this.citizens.filter(
      (c) => c.gender === 'female' && c.status === 'alive'
    ).length;
  }
  get died(): number {
    return this.citizens.filter((c) => c.status === 'died').length;
  }
  get dead(): number {
    return this.citizens.filter((c) => c.status !== 'alive').length;
  }
  get born(): number {
    return this.citizens.filter((c) => c.status === 'born').length;
  }
  get withPartner(): number {
    return this.citizens.filter(
      (c) => c.status === 'alive' && c.partner !== undefined
    ).length;
  }
  get result(): Result {
    let m = 0;
    let f = 0;
    let born = 0;
    let alive = 0;
    let died = 0;
    let dead = 0;
    let withPartner = 0;
    this.citizens.forEach((c) => {
      if (c.status === 'born') born++;
      if (c.status === 'alive') alive++;
      if (c.status === 'died') died++;
      if (c.status === 'dead') dead++;
      if (c.gender === 'male' && c.status === 'alive') m++;
      if (c.gender === 'female' && c.status === 'alive') f++;
      if (c.status === 'alive' && c.partner !== undefined) withPartner++;
    });
    return {
      year: this.year,
      m,
      f,
      born,
      alive,
      died,
      dead,
      withPartner,
      population: alive,
    };
  }
}
