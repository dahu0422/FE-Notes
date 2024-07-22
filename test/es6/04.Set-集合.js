const set = new Set()

set.add(1).add(2).add(3).add(4).add(2) // 添加元素，重复元素不会被添加
console.log(set, set.size, set.has(2)) // Set(4) {1, 2, 3, 4} 4 true

set.delete(1) // 删除元素
console.log(set) // Set(3) {2, 3, 4}

set.clear() // 清空集合
console.log(set) // Set(0) {}
