import { promises as fs } from 'fs';

const charactersFilePath = './database/characters.json';

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('《✧》No se pudo cargar el archivo characters.json.');
    }
}

let handler = async (m, { conn, args }) => {
    try {
        const characters = await loadCharacters();
        const page = parseInt(args[0]) || 1;
        const itemsPerPage = 10;
        const sortedCharacters = characters.sort((a, b) => Number(b.value) - Number(a.value));

        const totalCharacters = sortedCharacters.length;
        const totalPages = Math.ceil(totalCharacters / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const charactersToShow = sortedCharacters.slice(startIndex, endIndex);

        let message = `╭─────────────────
│ *❀ TOP WAIFUS (❛◡❛)*
├─────────────────\n`;

        charactersToShow.forEach((character, index) => {
            message += `┃⋆˚✧° *${startIndex + index + 1}.* » *${character.name}*\n`;
            message += `┃      → Valor: *${character.value}*\n`;
        });

        message += `╰─────────────────
> • Página *${page}* de *${totalPages}*`;

        await conn.sendMessage(m.chat, { text: message, ...global.rcanal }, { quoted: m });
    } catch (error) {
        await conn.sendMessage(m.chat, { text: `✘ Error al cargar los personajes: ${error.message}`, ...global.rcanal }, { quoted: m });
    }
};

handler.help = ['topwaifus'];
handler.tags = ['gacha'];
handler.command = ['topwaifus', 'waifustop', 'waifusboard'];
handler.group = false;
handler.register = false;

export default handler;