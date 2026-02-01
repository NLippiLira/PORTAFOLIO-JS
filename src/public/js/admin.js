document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.delete-form')

  forms.forEach(form => {
    form.addEventListener('submit', e => {
      if (!confirm('¿Estás seguro de eliminar este registro?')) {
        e.preventDefault()
      }
    })
  })
})
setTimeout(() => {
  const alert = document.querySelector('.alert')
  if (alert) {
    alert.classList.remove('show')
    alert.classList.add('fade')
  }
}, 3000)