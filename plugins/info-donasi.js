import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
let pp = await conn.profilePictureUrl(m.chat).catch(_ => null)
let pepe = pp ? await (await fetch(pp)).buffer() : Buffer.alloc(0)
let str = ` ${conn.getName(m.sender)} Want Support Bot?
Kalian bisa mendukung saya agar bot ini tetap up to date dengan:
┌〔 Donasi • Emoney 〕
├Dana : 0895376669686
├Ovo: ................ 
├Pulsa : 0895622816517
├Gopay: 085762224918
└────
Berapapun donasi kalian akan sangat berarti 👍
*Contact person Owner:*
wa.me/0895622816517 (Satriyo)`
conn.sendHydrated(m.chat, str, wm, './media/IMG-20220706-WA0063.jpg', 'https://github.com/Ipulpachri', '𝙶𝙸𝚃𝙷𝚄𝙱', null, null, [
['𝙼𝙴𝙽𝚄', '/menu']
], m)

}
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

export default handler
