/// <reference path="./subjects/Subjects.ts" />
/// <reference path="./subjects/Cpp.ts" />
/// <reference path="./subjects/Java.ts" />
/// <reference path="./subjects/React.ts" />
/// <reference path="./subjects/Teacher.ts" />

const subjectC: Subjects.Cpp = new Subjects.Cpp();

const cTeach: Subjects.Teacher = {
    firstName: 'Dumb',
    lastName: 'Shit',
}

cTeach.experienceTeachingC = 12;

subjectC.setTeacher = cTeach;
cTeach.firstName = 'Beevus';

console.log(subjectC.getRequirements());
console.log(subjectC.teacher.lastName);
console.log(subjectC.getAvailableTeacher());
