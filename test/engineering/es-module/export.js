// -------- export  --------
// export const name = 'export'
// export const hello = () => `name is ${name} `

// const name = 'export'
// const hello = () => `name is ${name}`
// export { name, hello }

// -------- 重命名 --------
// const name = 'export'
// const hello = () => `name is ${name}`
// export { name as exportName, hello as exportHello }

// -------- export default 默认导出  --------
// const name = 'export'
// export const hello = () => `name is ${name}`
// export default name

// -------- export default 默认导出误区：不要当成对象结构  --------
const name = 'export'
const hello = () => `name is ${name}`
export default { name, hello } // 导出的是一个对象，而不是结构
