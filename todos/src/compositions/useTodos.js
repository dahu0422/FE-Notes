import { computed, ref } from 'vue'

export function useTodos() {
  let todoList = ref([])

  const createNewtodo = (value) => ({
    name: value,
    status: 'pending'
  })

  /**
   * 添加待办事项
   * @param {String} value 待办事项
   * @returns
   */
  const addTodo = (value) => {
    if (value.length === 0) {
      alert('请输入待办事项...')
      return
    }
    const todo = createNewtodo(value)
    todoList.value.push(todo)
  }

  /**
   * @desc 更新待办事项状态
   * @param {object} todo 更新待办事项状态
   */
  const updateTodo = (todo) => {
    console.log(todo.status)
    todo.status = todo.status === 'pending' ? 'finished' : 'pending'
  }

  /**
   * @desc 删除待办事项
   * @param {number} index
   */
  const deleteTodo = (index) => {
    todoList.value.splice(index, 1)
  }

  /**
   * @desc 清空已完成
   */
  const clearCompleted = () => {
    todoList.value = todoList.value.filter((item) => item.status === 'pending')
  }

  const pendingTodoList = computed(() => todoList.value.filter((item) => item.status === 'pending'))

  return { todoList, pendingTodoList, addTodo, updateTodo, deleteTodo, clearCompleted }
}
