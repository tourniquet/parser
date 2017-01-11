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

    Ad.create({ url, title, phone })
      .then(data => res.json(data))
      .catch(err => res.serverError(err))
  },

  delete (req, res) {
    console.log('delete')
    let phone = req.query.phone

    Ad.destroy({ phone })
      .catch(err => res.serverError(err))
  },

  index (req, res) {
    Ad.find()
      .then(data => res.json(data))
      .catch(err => res.serverError(err))
  }
}
