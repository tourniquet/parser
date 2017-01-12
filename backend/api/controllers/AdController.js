/**
 * AdController
 *
 * @description :: Server-side logic for managing ads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create (req, res) {
    let url = req.query.url
    let title = req.query.title
    let phone = req.query.phone

    Ad
      .findOrCreate([{ url }, { phone }], { url, title, phone })
      .exec((err, data) => {
        if (err) return res.serverError(err)
        res.json(data)
      })
  },

  disable (req, res) {
    let phone = req.query.phone

    Ad
      .update({ phone }, { enabled: false })
      .exec((err, data) => {
        if (err) return res.serverError(err)
        console.log(data)
      })
  },

  index (req, res) {
    Ad
      .find({
        where: { enabled: true },
        sort: 'createdAt DESC'
      })
      .then(data => res.json(data))
      .catch(err => res.serverError(err))
  }
}
