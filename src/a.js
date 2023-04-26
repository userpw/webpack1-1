import './a.less'
import dayjs from 'dayjs'
// 浏览器完成页面加载执行代码
window.onload = () => {
  const startTime = '2022-11-15'
  const endTime = '2023-03-29'
  /**
   * @desc 传递年返回每个月多少天
   * @param {string} year 年
   * @param {string} months 月
   * @return 当前月份天数
   */
  const switchMounth = (year, months) => {
    const yearRunFlag = year%4===0 && (year%100!==0 ||year%400===0) // 2月29
    if ([1,3,5,7,8,10,12].includes(months)) {
      return 31
    } else if ([4,6,9,11].includes(months)) {
      return 30
    } else if (yearRunFlag && months === 2) {
      return 29
    } else if (!yearRunFlag && months === 2) {
      return 28
    } else {
      return 0
    }
  }

/**
   * @desc 传递年返回每个月多少天
   * @param {string} year 年
   * @param {string} months 月
   * @return 当前月份天数
   */
  const switchMounth2 = (year, months) => {
    // eslint-disable-next-line no-mixed-operators
    const yearRunFlag = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0 // 2月29
    if (['01', '03', '05', '07', '08', '10', '12'].includes(months)) {
      return '31'
    // eslint-disable-next-line no-constant-condition
    } else if (['04', '06', '09', '11'].includes(months)) {
      return '30'
    } else if (yearRunFlag && months === '02') {
      return '29'
    } else if (!yearRunFlag && months === '02') {
      return '28'
    } else {
      return '0'
    }
  }

  /**
   * @method calculationTime
   * @desc 计算两时间间隔 
   * @param {string} startTime 开始时间
   * @param {string} endTime 结束时间
   * @return {object} 返回两个时间的年月日自然时间间隔
   */
  const calculationTime = (startTime, endTime) => {
    const obj = {
      year: '0',
      month: '0',
      day: '0'
    }
    // 截取开始时间年月日
    const startArr = startTime.split('-')
    const endArr = endTime.split('-')
    // const startArr = [Number(startArr1[0]), Number(startArr1[1]), Number(startArr1[2])]
    // const endArr = [Number(endArr1[0]), Number(endArr1[1]), Number(endArr1[2])]
    obj.year = dayjs(endTime).diff(dayjs(startTime), 'years')
    // 结束时间月 大于 开始时间开始月
    if (endArr[1] > startArr[1]) {
      if (endArr[2] > startArr[2]) {
        // 结束时间日 大于 开始时间日 2022-10-10   2023-11-11  =====> 2023-11-11 ----- 2023-10-10
        obj.month = dayjs(endTime).diff(dayjs(endArr[0] + '-' + startArr[1] + '-' + startArr[2]), 'months')
        obj.day = endArr[2] - startArr[2]
        // 结束时间日 小于 开始时间日 2022-10-10  2023-11-9  ====> 2022-11-9 ---- 2022-10-10
      } else if (endArr[2] < startArr[2]) {
        obj.month = dayjs(startArr[0] + '-' + endArr[1] + '-' + endArr[2]).diff(dayjs(startTime), 'months')
        // 还剩下 2022-10-10 ---- 2022-11-9 间隔天数  计算出 10月 多少天 - 当前所在天数 + 结束日期的天数
        obj.day = (switchMounth2(startArr[0], startArr[1]) - startArr[2]) + endArr[2]
      } else {
        // 结束时间日 等于 开始时间日 2022-10-10 2023-11-10  ====> 2022-11-10 ----- 2022-10-10
        obj.month = dayjs(startArr[0] + '-' + endArr[1] + '-' + endArr[2]).diff(dayjs(startTime), 'months')
        obj.day = 0
      }
      // 结束日期月 小于 开始日期月  2022-10-10  2023-9-9
    } else if (endArr[1] < startArr[1]) {
      if (endArr[2] > startArr[2]) {
        // 结束日期日 大于 开始日期日  2022-10-10  2023-9-11
        obj.month = dayjs(endTime).diff(dayjs(startTime), 'months')
        obj.day = endArr[2] - startArr[2]
      } else if (endArr[2] < startArr[2]) {
        // 结束时间日 小于 开始时间日 2022-10-10  2023-9-9
        obj.month = dayjs(endTime).diff(dayjs(startTime), 'months')
        obj.day = (switchMounth2(startArr[0], startArr[1]) - startArr[2]) + endArr[2]
      } else {
        // 如果结束日 等于 开始日 2022-10-10  2023-9-10
        obj.month = dayjs(endTime).diff(dayjs(startTime), 'months')
        obj.day = 0
      }
    }else {
      // 如果 结束月 等于 开始月
      // 结束日 大于 开始日  2022-10-9 2023-10-12
      if (endArr[2] > startArr[2]) {
        obj.month = 0
        obj.day = endArr[2] - startArr[2]
      } else if (endArr[2] < startArr[2]) {
        // 结束日 小于 开始日 2022-10-9  2023-10-8
        obj.month = dayjs(endTime).diff(dayjs(startTime), 'months')
        obj.day = (switchMounth2(startArr[0], startArr[1]) - startArr[2]) + endArr[2]
      } else {
        // 结束日 等于 开始日 2022-10-9 2023-10-9
        obj.month = 0
        obj.day = 0
      }
    }
    return obj
  }



  const calcTime = (startTime, endTime) => {
    const obj = {
      year: '0',
      month: '0',
      day: '0'
    }
    // 截取开始时间年月日
    const startArr = startTime.split('-')
    const endArr = endTime.split('-')
    // 判断初始时间的月 与 结束时间月 大小
    obj.year = dayjs(endTime).diff(dayjs(startTime), 'years')
    // 如果结束的月大于开始的月
    if (endArr[1] > startArr[1]) {
      // 判断结束时间的日是否大于开始时间的日
      if (endArr[2] >= startArr[2]) {
        obj.month = dayjs(endTime).diff(dayjs(endArr[0] + '-' + startArr[1] + '-' + startArr[2]), 'months')
        obj.day = endArr[2] - startArr[2]
      } else if (endArr[2] < startArr[2]) {
        obj.month = dayjs(startArr[0] + '-' + endArr[1] + '-' + endArr[2]).diff(dayjs(startTime), 'months')
        obj.day = (Number(switchMounth2(startArr[0], startArr[1]) - startArr[2])) + Number(endArr[2])
      }
    } else if (endArr[1] <= startArr[1]) {
      // 判断结束日是否大于开始日
      if (endArr[2] >= startArr[2]) {
        obj.month = dayjs(endArr[0] + '-' + endArr[1] + '-' + endArr[2]).diff(dayjs((endArr[0] - 1) + '-' + startArr[1] + '-' + startArr[2]), 'months')
        obj.day = endArr[2] - startArr[2]
      } else if (endArr[2] < startArr[2]) {
        obj.month = dayjs(endArr[0] + '-' + endArr[1] + '-' + endArr[2]).diff(dayjs((endArr[0] - 1) + '-' + startArr[1] + '-' + startArr[2]), 'months')
        obj.day = (Number(switchMounth2(startArr[0], startArr[1]) - startArr[2])) + Number(endArr[2])
      }
    }
    return {
      year: obj.year,
      month: obj.month % 12,
      day: obj.day
    }
  }

  // else {
  //   // 判断结束日是否大于开始日
  //   if (Number(endArr[2]) > Number(startArr[2])) {
  //     obj.months = dayjs(endArr[0] + '-' + endArr[1] + '-' + endArr[2]).diff(dayjs((endArr[0]) + '-' + startArr[1] + '-' + startArr[2]), 'months')
  //     obj.day = endArr[2] - startArr[2]
  //   } else if (Number(endArr[2]) < Number(startArr[2])) {
  //     obj.months = dayjs(endArr[0] + '-' + endArr[1] + '-' + endArr[2]).diff(dayjs((endArr[0]) + '-' + startArr[1] + '-' + startArr[2]), 'months')
  //     obj.day = (Number(switchMounth(startArr[0], startArr[1]) - startArr[2])) + Number(endArr[2])
  //   } else {
  //     obj.months = dayjs(endArr[0] + '-' + endArr[1] + '-' + endArr[2]).diff(dayjs((endArr[0]) + '-' + startArr[1] + '-' + startArr[2]), 'months')
  //     obj.day = (Number(switchMounth(startArr[0], startArr[1]) - startArr[2])) + Number(endArr[2])
  //   }
  // }

  /**
   * 计算原生方法
   */
  function getDateDiffInYearsMonthsDays(date1, date2) {
    // 将日期字符串转换为 Date 对象
    const d1 = new Date(date1);
    const d2 = new Date(date2);
  
    // 计算两个日期之间的毫秒数差
    const diffInMillis = d2.getTime() - d1.getTime();
  
    // 计算年份差
    const years = Math.floor(diffInMillis / (1000 * 60 * 60 * 24 * 365));
  
    // 计算剩余毫秒数
    const remainingInMillis = diffInMillis % (1000 * 60 * 60 * 24 * 365);
  
    // 计算月份差
    const months = Math.floor(remainingInMillis / (1000 * 60 * 60 * 24 * 30));
  
    // 计算剩余毫秒数
    const remainingInMillis2 = remainingInMillis % (1000 * 60 * 60 * 24 * 30);
  
    // 计算天数差
    const days = Math.floor(remainingInMillis2 / (1000 * 60 * 60 * 24));
  
    // 返回结果
    return { years, months, days };
  }

  /**
   * 计算原生方法 考虑 闰年影响
   */
  function getYearMonthDayDiff(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
  
    // 如果结束日期在开始日期之前，则交换两个日期
    if (end < start) {
      [start, end] = [end, start];
      [years, months, days] = [-years, -months, -days];
    }
  
    // 如果结束日期的日在开始日期的日之前，则将月数减一
    if (days < 0) {
      months--;
      days += daysInMonth(start.getFullYear(), start.getMonth());
    }
  
    // 如果结束日期的月在开始日期的月之前，则将年数减一
    if (months < 0) {
      years--;
      months += 12;
    }
  
    // 计算总天数
    const totalDays = (end - start) / (1000 * 60 * 60 * 24);
  
    // 计算平年与闰年对总天数的影响
    const leapYears = countLeapYears(start.getFullYear(), end.getFullYear());
    const normalDays = totalDays - leapYears;
    const leapDays = leapYears * 366 + (totalDays - leapYears) * 365;
  
    // 根据总天数和平年闰年的影响，计算年数、月数、天数
    if (totalDays === leapDays) {
      years += leapYears;
    } else if (totalDays === normalDays) {
      years += end.getFullYear() - start.getFullYear();
    } else {
      years += Math.floor(totalDays / 365.25);
      months += Math.floor((totalDays % 365.25) / 30.44);
      days += Math.round((totalDays % 365.25) % 30.44);
      if (days >= daysInMonth(end.getFullYear(), end.getMonth())) {
        months++;
        days -= daysInMonth(end.getFullYear(), end.getMonth());
      }
      if (months >= 12) {
        years++;
        months -= 12;
      }
    }
  
    return { years, months, days };
  }
  
  function countLeapYears(startDate, endDate) {
    let count = 0;
    for (let year = startDate; year <= endDate; year++) {
      if (isLeapYear(year)) {
        count++;
      }
    }
    return count;
  }
  
  function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }
  
  function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }
    
  setTimeout(() => {
    const obj = calcTime(startTime, endTime)
    console.log('time---->', obj);
    // 获取当前界面
    const app = document.getElementById('app')
    app.querySelector('#header').innerHTML = `obj: ${obj.year}-${obj.month}-${obj.day}`
    app.querySelector('#btn').addEventListener('click', () => {
      const startVal = app.querySelector('#startInput').value
      const endStart = app.querySelector('#endInput').value
      app.querySelector('#header').innerHTML = `obj: ${calcTime(startVal, endStart).year}-${calcTime(startVal, endStart).month}-${calcTime(startVal, endStart).day}`
    })
    app.querySelector('#startInput').addEventListener('input', () => {
      app.querySelector('#startVal').innerText = app.querySelector('#startInput').value
    })
  }, 100)
  
  
  
    let o = {
      message: ''
    };
    let middle = 'word';
    Object.defineProperty(o,'message',{
      get(){
        return middle // 初始值
      },
      set(val){
        middle = val
      }
    })
    console.log(JSON.parse(JSON.stringify(o))) //当获取对象属性的时候，就会调用自身的get方法
    o.message = '你好' //当设置对象属性的时候，就会调用自身的set方法
    console.log(JSON.parse(JSON.stringify(o)))
}

  // import './header'
