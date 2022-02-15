interface DirectorInterface {
    workFromHome(): string;
    getCoffeeBreak(): string;
    workDirectorTasks(): string;
}

interface TeacherInterface {
    workFromHome(): string;
    getCoffeeBreak(): string;
    workTeacherTasks(): string;
}

class Director implements DirectorInterface {
    workFromHome(): string {
        return 'Working from home';
    };
    getCoffeeBreak(): string {
        return 'Getting a coffee break';
    };
    workDirectorTasks(): string {
        return 'Getting to director tasks';
    };
}

class Teacher implements TeacherInterface  {
    workFromHome(): string {
        return 'Cannot work from home';
    };
    getCoffeeBreak(): string {
        return 'Cannot have a break';
    };
    workTeacherTasks(): string {
        return 'Getting to work';
    };
}

function createEmployee(salary: number | string): Director | Teacher {
    if (typeof salary === 'string') salary = parseFloat(salary.replace('$', ''));
    return salary < 500 ? new Teacher() : new Director();
}

function isDirector(employee: Teacher | Director): Boolean {
    return employee instanceof Director;
}

function executeWork(employee: Teacher | Director): void {
    return isDirector(employee) === true ? employee.workDirectorTasks() : employee.workTeacherTasks();
}

type Subjects = 'Math' | 'History';

function teachClass(todayClass: Subjects): string {
    return todayClass === 'Math' ? 'Teaching Math' : 'Teaching History';
}

// *** TESTING ***
console.log(createEmployee(200));
console.log(createEmployee(1000));
console.log(createEmployee('$500'));

console.log('test:', isDirector(createEmployee(200)));
console.log(executeWork(createEmployee(200)));
console.log(executeWork(createEmployee(1000)));

console.log(teachClass('Math'));
console.log(teachClass('History'));
