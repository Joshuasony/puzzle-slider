export default function() {
  this.transition(
    this.fromRoute('intro'),
    this.toRoute('play'),
    this.use('toUp')
  )
}
