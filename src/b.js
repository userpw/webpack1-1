function calculateAge (birthDate, currentDate) {
     const birthYear = birthDate.getFullYear();
     const birthMonth = birthDate.getMonth() + 1;
     const birthDay = birthDate.getDate();
  
     const currentYear = currentDate.getFullYear();
     const currentMonth = currentDate.getMonth() + 1;
     const currentDay = currentDate.getDate();
  
     let ageYear = currentYear - birthYear;
     let ageMonth = currentMonth - birthMonth;
     let ageDay = currentDay - birthDay;
  
     if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
       ageYear--;
       ageMonth += 12;
       if (ageDay < 0) {
          const monthDays = new Date(currentYear, currentMonth - 1, 0).getDate();
          ageDay += monthDays;
          ageMonth--;
       }
     }
  
     console.log(ageYear)
     console.log(ageMonth)
     console.log(ageDay)

     return {
       ageYear,
       ageMonth,
       ageDay
     };
  }
  
  calculateAge(new Date('1948-04-15'), new Date('2023-03-28'))