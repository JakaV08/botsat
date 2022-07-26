//Make & Help By
//Johannes & Papah-Chan
import jimp from 'jimp'
import fs from 'fs'
import fetch from 'node-fetch'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'

let tags = {}
const defaultMenu = {
  before: `\n❏ › Date: %date\n❏ › Time: %time\n❏ › Runtime: %uptime\n%readmore`,
  header: '*❏═┅═━–〈 %category*',
  body: '┊⌬ › %cmd %islimit %isPremium',
  footer: '┗━═┅═━––––––๑\n',
  after: '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n©BOTSatZzz@^1.0.5',
}

let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let name = m.pushName || conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(d) 
    let time = d.toLocaleTimeString(locale, { timeZone: 'Asia/Jakarta' })
    time = time.replace(/[.]/g, ':')
    let _uptime
    if (process.send) {
      process.send('uptime')
      _uptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let res = await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt')
    let txt = await res.text()
    let arr = txt.split('\n')
    let cita = arr[Math.floor(Math.random() * arr.length)]
    let thumb = await(await fetch(cita)).buffer()
      let vn = './media/tante-tante.mp3'
    let uptime = clockString(_uptime)
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag].toUpperCase()) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? 'Ⓛ' : '')
                .replace(/%isPremium/g, menu.premium ? 'Ⓟ' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime,
      me: conn.getName(conn.user.jid),
      name, date, time,
      readmore: readMore
    }
    let fkon = { key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
    let fla = 'https://telegra.ph/file/09ce41e6673af3383a91e.jpg'
    let teks = 'Menu'
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
  await conn.reply(m.chat, '*Memuat Menu...*', ftroli)
    const pp = await conn.profilePictureUrl(conn.user.jid, 'image').catch(_ => './src/avatar_contact.png')
    // if (m.isGroup) return conn.sendButton(m.chat, text.trim(), conn.getName(conn.user.jid), pp, [['Speedtest', _p + 'ping'], ['Owner', _p + 'owner']], m)
    //conn.sendHydrated(m.chat, text.trim(), conn.getName(conn.user.jid), await genProfile(conn, m), 'https://youtube.com/channel/UC0hs_I8N3JntK5vO6KogavQ', 'YouTube', null, null, [['Speedtest', _p + 'ping'], ['Owner', _p + 'owner']], m)
   // conn.sendMessage(m.chat, { video: { url: 'https://telegra.ph/file/c82d5c358495e8ef15916.mp4' }, gifPlayback: true, gifAttribution: ~~(Math.random() * 2), caption: text.trim(), footer: await conn.getName(conn.user.jid) , templateButtons: [{ quickReplyButton: { displayText: 'Speedtest', id: `${_p}ping` }}, { quickReplyButton: { displayText: 'Owner', id: `${_p}owner` }} ] })
   await conn.sendButton(m.chat, `*${wish()}, ${name} 👋*`, text.trim(), await (await fetch('https://telegra.ph/file/b9c3b2edd707cf6a490de.png')).buffer(), [['Donasi', _p + 'donasi'], ['Owner', _p + 'owner']], false, { quoted: ftroli, contextInfo: { externalAdReply: { showAdAttribution: true,
    title: wm2,  
    body: `${pickRandom(['udah makan belum kak?', 'udh mandi belum kak?', 'Semangat ya kak!', 'Jangan begadang mulu ya!', 'jangan spam ya kak!', 'Jangan lupa donasi yak kak! >.<', 'Jaga kesehatan yaw kak!', 'Jangan lupa makan!', 'Jangan lupa istirahat yak! >.<', 'I Love you kak >.< 💗✨', 'Pr nya udh belum kak?', 'Jangan kebanyakan main hp yk! nanti sakit :‹'])}`,
    description: '', 
    mediaType: 2, 
    thumbnail: await (await fetch('https://telegra.ph/file/aced9f1a320ca44e73b12.jpg')).buffer(), 
    mediaUrl: `${pickRandom([`https://www.facebook.com/Inunime-107082474576049/`,`https://youtu.be/JWHV8lPTzPs`,`https://instagram.com/nuru`])}`,  
}
} })
conn.sendFile(m.chat, './media/tante-tante.mp3', 'tante-tante.mp3', null, fkontak, true, {
type: 'audioMessage', 
ptt: true, contextInfo:{ externalAdReply: {title: 'Stay Grateful With Your Life', body: `${pickRandom(['Never give up', 'Create By Satriyo'])}`, sourceUrl: 'https://instagram.com/nan_sakrn', thumbnail: await (await fetch('https://telegra.ph/file/aced9f1a320ca44e73b12.jpg')).buffer(),}} 
})
    // conn.sendButton(m.chat, 
    //`*Hi, ${name} 👋*\n\n`, 
  //  text.trim(), './media/marin.jpg', [
// [`Speedtest`, `${_p}ping`],
// [`Owner`, `${_p}owner`]
//], m, {asLocation: true})
  } catch (e) {
    m.reply('An error occurred')
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['general']
handler.alias = ['menu']
handler.command = /^(menu)$/i
handler.exp = 3

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function wish() {
    let wishloc = ''
  const time = moment.tz('Asia/Kolkata').format('HH')
  wishloc = ('Hi')
  if (time >= 0) {
    wishloc = ('Selamat DiniHari')
  }
  if (time >= 4) {
    wishloc = ('Selamat Pagi Kak')
  }
  if (time >= 12) {
    wishloc = ('Selamat Siang Kak')
  }
  if (time >= 16) {
    wishloc = ('️Selamat Sore Kak')
  }
  if (time >= 23) {
    wishloc = ('Selamat Malam Kak')
  }
  return wishloc
    }
 function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
  function ingat() {
  const lgs = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat dinihari"
  if (lgs >= 4) {
    imp = 'Jangan Lupa Sholat Subuh Yah Kak 🌠'
  }
  if (lgs > 7) {
    imp = 'Jangan Lupa Sholat Dhuha Kak 😙'
  }
  if (lgs > 7) {
    imp = 'Jangan Lupa Istirahat Yah Kak 💭'
  }
  if (lgs >= 15) {
    imp = 'Sudah ashar Jangan lupa loh 💕'
  }
  if (lgs >= 18) {
    imp = 'Sudah Magrib Saatnya Sholat Magrib Yah Kak 🕌'
  }
  if (lgs >= 19) {
    imp = 'Jangan Sering Bergadang Yah Kak 🌆'
  }
  if (lgs >= 21) {
    imp = 'Sudah malam kak, waktunya bobo 💤'
  }
  return imp
}
async function genProfile(conn, m) {
  let font = await jimp.loadFont('./names.fnt'),
    mask = await jimp.read('https://i.imgur.com/552kzaW.png'),
    welcome = await jimp.read(thumbnailUrl.getRandom()),
    avatar = await jimp.read(await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')),
    status = (await conn.fetchStatus(m.sender).catch(console.log) || {}).status?.slice(0, 30) || 'Not Detected'

    await avatar.resize(460, 460)
    await mask.resize(460, 460)
    await avatar.mask(mask)
    await welcome.resize(welcome.getWidth(), welcome.getHeight())

    await welcome.print(font, 550, 180, 'Name:')
    await welcome.print(font, 650, 255, m.pushName.slice(0, 25))
    await welcome.print(font, 550, 340, 'About:')
    await welcome.print(font, 650, 415, status)
    await welcome.print(font, 550, 500, 'Number:')
    await welcome.print(font, 650, 575, PhoneNumber('+' + m.sender.split('@')[0]).getNumber('international'))
    return await welcome.composite(avatar, 50, 170).getBufferAsync('image/png')
}
