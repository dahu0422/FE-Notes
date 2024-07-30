import '../src/heading.css'

export default () => {
  const element = document.createElement('h1')
  element.textContent = 'Hello webpack'
  element.classList.add('heading')
  element.addEventListener('click', () => {
    alert('Hello webpack')
  })

  return element
}
