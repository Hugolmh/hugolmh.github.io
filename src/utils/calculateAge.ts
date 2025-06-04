export function calculateAge(today: Date = new Date()): number {
  const birthDate = new Date(2004, 2, 20); // Month is 0-indexed
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
