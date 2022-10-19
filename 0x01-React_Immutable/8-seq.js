import Immutable from 'immutable';

export default function printBestStudents(grades) {
  function firstUpper(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const gradeSeq = Immutable.Seq(grades)
    .filter((grade) => grade.score >= 70)
    .map((grade) => {
      // eslint doesn't like reassignment to grade.firstName
      const thing = grade;
      thing.firstName = firstUpper(grade.firstName);
      thing.lastName = firstUpper(grade.lastName);
      return thing;
    });
  console.log(gradeSeq.toJS());
}
