// 1. Juntar dois tipos para evitar repetição de propriedades entre tipos

type Employee = {
    employeeId: string;
    position: string;
};

type Person = {
    name: string;
    age: number;
};

// Interception type (&): combina propriedades de dois tipos
type PersonEmployee = Employee & Person;

const person: PersonEmployee = {
    name: "Pedro",
    age: 21,
    employeeId: "id",
    position: "1",
};

// ###############################################################

// 2. Usar union type (|) para criar variáveis com mais de um tipo

type Status = "success" | "error" | "loading";

function logStatus(status: Status) {
    console.log(status);
}

logStatus("error");

// ###############################################################

// 3. Tipo genérico com <T>

function identity<T>(value: T): T {
    return value;
}

const num = identity<number>(42);
const text = identity("Hello");

// ###############################################################

// 4. Usar o Pick para selecionar propriedades de um tipo

type PersonType = {
    name: string;
    age: number;
    address: string;
};

type PersonNameAndAddress = Pick<PersonType, "name" | "address">;

// ###############################################################

// 5. Usar o Omit para remover propriedades de um tipo

type FullPerson = {
    name: string;
    age: number;
    address: string;
    email: string;
};

type PersonWithoutAge = Omit<FullPerson, "age">;
