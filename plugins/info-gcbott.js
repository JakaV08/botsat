import fetch from 'node-fetch'
let handler = async(m, { conn, text, usedPrefix, command }) => {
let pp = await conn.profilePictureUrl(m.chat).catch(_ => null)

let str = `JOIN DONG\nhttps://chat.whatsapp.com/IklYsjdwKTZ4TFcgWnMCVJ\n_SEMOGA BETAH_`
conn.sendButtonDoc(m.chat, str, wm, 'Owner','.owner', ftextt, m)
}
handler.command = handler.help = ['gcbott']
handler.tags = ['info']

export default handler
