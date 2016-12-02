export default function() {
  this.transition(
    this.fromRoute('intro'),
    this.toRoute('play'),
    this.use('crossFade')
  )

  this.transition(
    this.fromRoute('play'),
    this.toRoute('play-success'),
    this.use('toDown'),
    this.reverse('toUp')
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
    this.fromRoute('submit-time'),
    this.toRoute('leaderboard'),
    this.use('toUp')
  )

  this.transition(
    this.toRoute([ 'leaderboard', 'about' ]),
    this.use('toLeft'),
    this.reverse('toRight')
  )

  this.transition(
    this.use('crossFade')
  )
}
