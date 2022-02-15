import { getForkTsCheckerWebpackPluginHooks } from "fork-ts-checker-webpack-plugin/lib/hooks";

interface Teacher {
    readonly firstName: string;
    readonly lastName: string;
    fullTimeEmployee: boolean;
    yearsOfExperience?: number;
    location: string;
    [property: string]: any;
}

interface Directors extends Teacher {
    numberOfReports: number;
}

interface printTeacherFunction {
    (firstName: string, lastName: string): string;
}

const printTeacher: printTeacherFunction = (
    firstName: string,
    lastName: string
) => `${firstName.charAt(0)}. ${lastName}`;

interface StudentInterface {
    firstName: string;
    lastName: string;
    workOnHomework(): string;
    displayName(): string;
}

class StudentClass implements StudentInterface {
    firstName: string;
    lastName: string;
    new (fn:string, ln:string) {
        this.firstName = fn;
        this.lastName = ln;
    }
    workOnHomework(): string {
        return 'Currently working';
    };
    displayName(): string {
        return this.firstName;
    };
}

interface StudentConstructor {
    new (firstName: string, lastName: string): StudentClass;
}

function newStudentClass(StudentConstructor: StudentConstructor, fn: string, ln: string) : StudentClass {
    return new StudentConstructor(fn, ln);
}

// **** TESTING ****
const teacher3: Teacher = {
    firstName: 'John',
    fullTimeEmployee: false,
    lastName: 'Doe',
    location: 'London',
    contract: false,
};
console.log(teacher3);

const director1: Directors = {
    firstName: 'John',
    lastName: 'Doe',
    location: 'London',
    fullTimeEmployee: true,
    numberOfReports: 17,
};
console.log(director1);

console.log(printTeacher(teacher3.firstName, teacher3.lastName));

const dong = newStudentClass(StudentClass, 'wow', 'annoyed');

console.log('now');
console.log(dong);
console.log(dong.workOnHomework());
console.log(dong.displayName());
