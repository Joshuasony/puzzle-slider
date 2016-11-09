export default function() {
  this.transition(
    this.fromRoute('intro'),
    this.toRoute('play'),
    this.use('toUp')
  )

  this.transition(
    this.fromRoute('play'),
    this.toRoute('play-success'),
    this.use('toUp'),
    this.reverse('toDown')
  )

  this.transition(
    this.fromRoute('play-success'),
    this.toRoute('submit-time'),
    this.use('explode', {
      pick: '.timer-time',

      use: [ 'fly-to' ]
    }, {
      pick: '.puzzle-solved',

      use: [ 'toUp' ]
    })
  )

  this.transition(
    this.toRoute('about'),
    this.use('toLeft'),
    this.reverse('toRight')
  )
}
