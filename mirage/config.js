export default function() {
  this.namespace = '/api/v1'
  this.timing = 400

  this.get('leaderboard', ({ leaderboardEntries }) => {
    let res = leaderboardEntries.all()

    res.models = res.models
      .sort((a, b) => a.time - b.time)
      .map((le, i) => {
        le.attrs.rank = i + 1

        return le
      })

    return res
  })

  this.post('leaderboard', ({ leaderboardEntries }, request) => {
    let body = JSON.parse(request.requestBody)

    return leaderboardEntries.create({
      name: body.name,
      date: new Date,
      time: body.time
    })
  })
}
