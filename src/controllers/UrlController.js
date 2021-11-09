import Url from '../database/models/Url.js'
import randomstring from 'randomstring'
import dotenv from 'dotenv'
import clipboard from 'clipboardy'
dotenv.config()


export default {
  async shorten (req, res) {
    try {
      const { url } = req.query
      if (!url) return res.status(400).json({ error: 'Parâmetros Inválidos' })

      const check = await Url.findOne({
        where: { original_url: url },
        attributes: [ 'shortened' ]
      })

      if (check) {
        clipboard.writeSync(`http://${req.headers.host}/${check.shortened}`)
        return res.status(200).json({ shortened: check.shortened })
      }

      const shortened = randomstring.generate({
        length: 6,
        readable: true,
        capitalization: 'uppercase',
        charset: 'alphanumeric'
      })

      await Url.create({ original_url: url, shortened })
      clipboard.writeSync(`http://${req.headers.host}/${shortened}`)
      return res.status(200).json({ shortened })
    } catch (error) {
      console.log(error)
      return res.status(500).end()
    }
  },

  async redirect (req, res) {
    try {
      const { shortened } = req.params
      if (!shortened) return res.status(400).json({ error: 'Parâmetros Inválidos' })

      const url = await Url.findOne({
        where: { shortened }
      })
      if (!url) return res.status(404).end()

      url.access = url.access + 1
      await url.save()
      res.redirect(url.original_url)
    } catch (error) {
      console.log(error)
      return res.status(500).end()
    }
  }
}
