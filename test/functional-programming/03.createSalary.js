/**
 * 计算员工工资
 * @param {number} baseSalary 基本工资
 * @returns {number} 薪水
 */
function createSalary(baseSalary) {
  return function (performance) {
    return baseSalary + performance
  }
}

// 基本工资为 12000，绩效工资为2000 员工的工资
const getSalary = createSalary(12000)
const p1 = getSalary(2000)
console.log(p1)
