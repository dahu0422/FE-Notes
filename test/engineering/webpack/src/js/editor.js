import '../style/editor.css'

export default () => {
  const editorElement = document.querySelector('div')

  editorElement.contentEditable = true
  editorElement.className = 'editor'

  console.log('editor init completed123')

  // alert('123')
}
