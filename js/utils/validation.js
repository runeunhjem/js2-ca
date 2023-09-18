export function validateEmail(email) {
  const noroffPattern = /@noroff\.no$/;
  const studNoroffPattern = /@stud\.noroff\.no$/;

  return noroffPattern.test(email) || studNoroffPattern.test(email);
}
