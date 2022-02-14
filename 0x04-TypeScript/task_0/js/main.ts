interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
}

const student1: Student = {
    firstName: 'my',
    lastName: 'balognia',
    age: 3,
    location: 'fridge'
}

const student2: Student = {
    firstName: 'my',
    lastName: 'pickle',
    age: 21,
    location: 'fridge'
}

const studentList: Array<Student> = [student1, student2];

const table = document.createElement('table');

for (const st of studentList) {
    const row = table.insertRow();
    row.insertCell().innerHTML = st.firstName;
    row.insertCell().innerHTML = st.lastName;
}

document.body.appendChild(table);
