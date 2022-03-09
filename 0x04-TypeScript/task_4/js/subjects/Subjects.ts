/// <reference path="Teacher.ts" />
namespace Subjects {
    export class Subject {
        teacher: Teacher;

        set setTeacher(teach: Teacher) {
            this.teacher = teach;
        }
    }
}
