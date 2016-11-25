export default function() {
  this.passthrough('/write-coverage')

  this.namespace = '/api/v1'
  this.timing = 400

  this.get('leaderboard', ({ leaderboardEntries }) => {
    let res = leaderboardEntries.all()

    return res.models
      .sort((a, b) => a.time - b.time)
      .map((le, i) => {
        le.attrs.rank = i + 1

        return le
      })
  })

  this.post('leaderboard', ({ leaderboardEntries }, request) => {
    let body = JSON.parse(request.requestBody)
    let entry = leaderboardEntries.create({
      name: body.name,
      date: new Date,
      time: body.time
    })

    return entry.attrs
  })
}
