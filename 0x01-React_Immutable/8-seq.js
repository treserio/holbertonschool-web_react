import Immutable from 'immutable';

export default function printBestStudents(grades) {
  function upperFirst(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  const gradeSeq = Immutable.Seq(grades)
    .filter(grade => grade.score >= 70)
    .map((grade) => {
      grade.firstName = upperFirst(grade.firstName);
      grade.lastName = upperFirst(grade.lastName);
      return grade
    })
  console.log(gradeSeq.toJS())
}
