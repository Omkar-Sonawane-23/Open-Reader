// ─────────────────────────────────────────────────────────────────────────────
// Open Reader — story library
// All stories are original works written for this project.
//
// Linear books:  { type: 'linear', chapters: [{ title, blocks }] }
//   blocks are strings (paragraphs) or { sep: true } (scene-break ornament).
// Interactive:    { type: 'interactive', start, scenes: { id: scene } }
//   A scene: { act, title, text: [paragraphs], choices: [{ text, tag, next }],
//              ending?: { id, name, note } }
// ─────────────────────────────────────────────────────────────────────────────

const lighthouse = {
  id: 'lighthouse',
  title: 'The Lighthouse Keeper',
  author: 'Ada Mercer',
  genre: 'Mystery',
  type: 'linear',
  tagline: 'The logbook knew tomorrow.',
  description:
    'Elias Thorn has kept the light at Merrow Point for eleven winters, and the island has never once surprised him. Then he finds a log entry dated tomorrow — in his own handwriting. Part ghost story, part love letter to routine, The Lighthouse Keeper is about the strange mercy of a life that runs in circles.',
  palette: { from: '#123a43', to: '#0b1417', accent: '#5fc4b8' },
  coverArt: 'covers/lighthouse.jpg',
  chapters: [
    {
      title: 'The Logbook',
      blocks: [
        'Elias Thorn had kept the light at Merrow Point for eleven winters, and in all that time the island had never once surprised him. That was the arrangement, as he understood it. The sea could do what it liked; the rocks could do what they liked; his job was only to be predictable in return. Trim the wick at six. Polish the lens at noon. Write the weather in the log at six, twelve, and six again, in a hand as level as the horizon.',
        'On the third of October he opened the log to a fresh page and found it already written.',
        'The date was the fourth of October — tomorrow. The entry read: Wind rising from the southwest by nightfall. Sea the colour of hammered lead. At nine, a green light off the sill — do not trust it.',
        'He sat down on the stool and looked at his hands as if they belonged to someone else. The handwriting was his. Not merely like his: it was his, down to the loop on the capital T and the way he crossed his sevens twice when he was tired, which he had been, which he was.',
        'He checked the inkwell — full, undisturbed. He checked the pen — dry since six. He checked the door — locked, as it always was at night, with the key on a cord around his neck.',
        'Then he tore the page out, folded it into eighths, and fed it to the stove. Paper burns. Handwriting, it turns out, does not.',
        'That night the wind rose out of the southwest, exactly as written, and Elias lay awake listening to it and did not sleep at all.',
        { sep: true },
        'By morning the sea was the colour of hammered lead. He wrote that down himself, in his own hand, on the fourth of October, and underlined it twice.',
      ],
    },
    {
      title: 'Tomorrow’s Weather',
      blocks: [
        'There was nobody on Merrow Point but Elias. The supply boat came once a month from the mainland, weather permitting, and weather rarely permitted gossip. There was no one to play a joke on him, and no one who could have — nobody else had the key, and nobody else had his handwriting.',
        'He decided it was fatigue. Eleven winters of the same four walls will make a man write in his sleep, if he ever truly sleeps, which lighthouse keepers mostly do not.',
        'On the fifth he found the next entry, dated the sixth, waiting on the page like a patient guest: Fog before dawn. The foghorn will fail at noon — a moth in the contact. A gull with a broken wing will land on the gallery rail. Mend the horn before dark. Something is coming that will need it.',
        'The fog came before dawn, thick and personal, the kind that puts its hand on your shoulder. At noon the foghorn gave one long cough and stopped. Elias opened the casing and found a moth in the contact, dead, its wings powdered silver, looking for all the world like it had planned this.',
        'At twenty to one, a gull landed on the gallery rail and did not fly away when he approached. Its left wing sat wrong at the joint, like a folded umbrella in a windstorm.',
        'He mended the horn by lamplight, and if his hands were steady it was only because he made them so, the way you carry a full cup across a crowded room — not by calm, but by will.',
        'He did not sleep that night either. He sat at the table with the log open in front of him, watching the blank page the way other men watch the sea.',
      ],
    },
    {
      title: 'The Green Light',
      blocks: [
        'The entry for the ninth was written on the eighth, and it was longer than the others: Storm from the south-southeast, the worst in thirty years. Hold the light; hold your nerve. At the height of it, a green light will pass the sill, close enough to touch. Do not trust it. Do not follow it. And when the water takes the east stair — and it will — do not go down for the rope.',
        'The storm arrived on the ninth, out of the south-southeast, and it was everything the page had promised. The tower groaned like a ship. Spray broke over the lantern room itself, forty metres above the sea, and for the first time in eleven winters Elias was afraid of the ocean, actually afraid, the way you become afraid of a dog you have known all its life the day it shows you its teeth.',
        'At half past nine the green light came.',
        'It passed the sill slowly, at the height of a man’s shoulder — a soft green flame the size of a lantern, moving against the wind, patient as a fish. It did not flicker. It had a quality he had no word for, and the word he finally settled on was attention. It was paying attention to him.',
        'He held the light. He held his nerve. He did not trust it and he did not follow it, and he wanted to follow it so badly that his hands ached from gripping the rail.',
        'At eleven the sea took the east stair — tore it from the rock with a sound like the island clearing its throat — and Elias, who had read the page, who had underlined the warning in his own hand, was already halfway down the west stair with the rope, because there was a boat on the rocks. Because there was a voice in the water.',
        'He would think about that afterwards, for years: that the log had never once told him what to do. Only what would happen. The doing was always his own.',
      ],
    },
    {
      title: 'The Survivor',
      blocks: [
        'Her name was Maren Halloran, though he would not learn that for a day. He hauled her out of the surge by the collar of her coat, cold as January and somehow breathing, and got her up to the lamp room wrapped in his spare blanket, and the green light stood off the rocks below the whole time like a held breath.',
        'By morning the storm had spent itself. Maren woke at noon, drank three cups of tea without speaking, and then said: “You didn’t follow it. I saw you not follow it. Do you know how few people don’t follow it?”',
        'He asked her, carefully, what it was.',
        '“A door,” she said. “Green as bottle glass. My family has followed it for four generations — off Sylt, off the Frisian coast, wherever the water goes quiet at the wrong time. There’s a door at the bottom of the sea and it opens at the worst hour of your life, and every Halloran that ever saw it went through it, smiling.” She turned the silver locket at her throat over twice, the way you check a wound. “I chose the rocks instead. It seemed ruder.”',
        'Elias got out the log. He opened it to the entries he had not written and could not stop writing, and pushed it across the table, and Maren read them the way you read a letter from home.',
        '“It’s not telling you the future,” she said at last. “It’s remembering. Somebody kept this light before you who followed the light. The book is just going around again, like a kettle coming back to the boil.” She closed it gently. “Your book wrote itself. Mine did too, once. The trick is deciding which parts to copy.”',
      ],
    },
    {
      title: 'The Last Entry',
      blocks: [
        'After the storm there were three days of the flat, ringing calm that follows the worst weather, when the sea pretends nothing happened and the gulls pretend it too.',
        'On the second day, Elias opened the log to the next blank page, dipped his pen, and wrote tomorrow’s date at the top. Then, below it: Calm. The survivor will walk to the mainland at low tide, where the sandbar shows. She will ask me to come with her. I will not. Someone must keep the light, and someone must keep the book, and they are the same job.',
        'He sat with that for a while. It was true. He could feel its truth the way you feel weather in a bad knee.',
        'At low tide the sandbar showed, a long grey road of wet sand, and Maren stood at the door with her locket packed away and asked him to come. And he said no, thank you, and meant both halves of it, and watched her all the way to the mainland without once looking back at the sea.',
        'That night the light turned and the log filled, and Elias understood, finally, comfortably, what he had signed on for eleven winters ago. The lamp was never the thing that kept the ships off the rocks. Lamps are only oil and glass and patience.',
        'He took up his pen and began to write the day after tomorrow. Not because he was afraid of it anymore.',
        'Because the book has to be full by the time the next keeper arrives.',
        'It always is.',
      ],
    },
  ],
}

const cartographer = {
  id: 'cartographer',
  title: 'The Last Cartographer',
  author: 'Jonas Feld',
  genre: 'Adventure',
  type: 'linear',
  tagline: 'The land won’t sit still for its portrait.',
  description:
    'Isadora Quill, third cartographer of her name, maps a world that refuses to hold still — coastlines that creep, mountains that move house overnight, and a Blank Quarter swallowing the trade roads. To chart it, she will have to unlearn everything the Guild taught her. An adventure about maps, memory, and the difference between measuring a place and knowing it.',
  palette: { from: '#7a4a21', to: '#241610', accent: '#e0a35c' },
  coverArt: 'covers/cartographer.jpg',
  chapters: [
    {
      title: 'Maps That Won’t Sit Still',
      blocks: [
        'In the city of Vell, maps were the law. Property lines, parish bounds, the exact grey ribbon of the salt road — all of it set down in ink, sealed in wax, argued over in courts. Which made the cartographers of Vell something between civil servants and priests, and made Isadora Quill, third cartographer of her name, a priest whose god had begun to fidget.',
        'It started with the Inkwell Coast. She woke on the first day of autumn to find it two miles further west than she had drawn it — not misdrawn, she checked the survey three times, but moved, the whole coastline walked west in the night like a cat finding a warmer spot.',
        'That week, the Amber Steppe gained a river. It was a good river — willowed, sensible, full of fish — and it appeared on every map in the province simultaneously, ink still smelling of the bottle, though no bottle had been opened.',
        'The following month, Vell itself grew a new square overnight: fountains, pigeons, a statue of a admiral nobody remembered electing. The Guild redrew the city plan and issued a stern memorandum. The city, having no respect for memoranda, added a second fountain by Thursday.',
        '“The land is not misbehaving,” Isadora’s grandmother had told her, forty years ago, holding a compass that pointed wherever she looked. “It’s just unfinished. Have some manners about it.”',
      ],
    },
    {
      title: 'The Blank Quarter',
      blocks: [
        'The Guild summoned her on the first day of winter, to a room where every wall was a map and every map had a hole in it, east of the Amber Steppe: the Blank Quarter, a region the size of a small sea, drawn on old charts in confident green and gold and now fading on every one of them, year by year, like a photograph left in a window.',
        'Surveyors sent into the Quarter came back with pages of nothing — not blank pages, which would at least be honest, but pages where the ink refused to dry, the lines sliding off the vellum like water off glass. Chain-men measured the same road twice and got two answers. On the third try they got Tuesday.',
        '“It is spreading toward the salt road,” said the Guildmaster, who was not a man given to drama, which is how you knew it was serious. “If it swallows the road, the eastern trade goes with it. Chart the Quarter, Cartographer Quill. By measurement, by law, by any means.”',
        'By any means. Isadora heard the words twice — once from the Guildmaster and once from her grandmother, forty years dead, and packed that night. She took her good pens, her good boots, and the brass compass with the blue-glass needle that had belonged to the old woman, because when the law runs out, you take the family instruments.',
      ],
    },
    {
      title: 'Ink and Compass',
      blocks: [
        'The salt road ran east and then thinned, and then forgot itself — the paving stones giving up one by one, like an audience leaving a dull play, until there was only a suggestion of a road, walking ahead of her through grass that leaned away from her boots.',
        'On the second day the compass stopped pointing north. She tapped it, held it level, breathed on the glass. The blue needle swung a lazy circle, considered, and settled — pointing directly at her.',
        'On the third day she found the shepherd. He was sitting on a fence that fenced nothing, in the middle of the blank country, watching a flock of sheep graze on grass his eyes could not quite hold. When he looked at the sheep they were there. When he looked at her, they were somewhere else politely.',
        '“There used to be a mountain here,” he said, by way of good morning. “East of my fence. Snow-capped. My grandmother named it — she was the last person who talked about it, told everyone how it caught the morning light. It left when she died.” He spat, amiably. “It was very proud of that name. I don’t blame it for going.”',
        'That night Isadora sat by her fire and looked at the blank page of her survey book and understood, with the feeling of a key turning, that the Quarter was not empty. Emptiness is nothing. The Quarter was unnamed. It was all the land nobody was paying attention to, pooling.',
      ],
    },
    {
      title: 'What the Land Wants',
      blocks: [
        'She tried measurement first, because it was the law. She laid her surveyor’s chain across a stretch of the blank road and counted: forty rods. She laid it again: forty-one. Again, and the chain, a fifty-year instrument of incorruptible brass, returned thirty-eight rods and what she could only describe as an apology.',
        'She tried law. She drove boundary stakes into the soft ground, hung them with the Guild’s white streamers, and went to sleep feeling better. In the morning the stakes were stacked beside her tent, whittled clean, polished, the streamers folded — returned, the way a cat returns a gift, or the way you return tools to a neighbour who has misunderstood the whole arrangement.',
        'So on the fifth day, grinning like her grandmother, Isadora Quill did the thing no Guild manual permits. She sat down on a rock with her bread and cheese, and she asked.',
        'She named things out loud as she noticed them: the wind that smelled of iron and church candles; the hollow ahead where sound went soft, like speaking into a cupped hand; the two white birches leaning together like conspirators; the place where the light went green at dusk, for no reason she could chain or stake.',
        'And her ink dried.',
        'Not to fixed lines — the coastline breathed in and out on the page like something sleeping; the hills shifted their weight; the birches had, by the time she looked up, moved to a better spot and were standing in it, smug — but it dried, and it held, and it was the most alive piece of cartography produced in the province in a hundred years.',
      ],
    },
    {
      title: 'A Map of Attention',
      blocks: [
        'She was gone a season. When she walked back into the Guild hall in Vell, road-dusty, she was carrying a map that no court in the province would certify and that the Guildmaster looked at for a long time without speaking.',
        'The margins were full of the shepherd’s memories and his grandmother’s mountain, which had come back — you could see it from the salt road now, snow-capped and showing off. The Blank Quarter was not filled in; it was, the Guildmaster finally said, listening back. There were names in it that changed with the season, and roads marked this way in spring and that way in autumn, and in the middle, small and satisfied, one line of italic: This map is finished every morning. Redraw it as you would write to a friend.',
        '“It will not stand in a court,” he said.',
        '“No,” Isadora agreed. “Neither, apparently, will the land.”',
        'The salt road was saved — not by pinning the country down, which had never once worked, but by the simple expedient of walking it with your eyes open and saying what you saw. Caravans adopted the new map, and the Quarter, which had spent a century being looked through, straightened up under all that attention like a border town on market day.',
        'Isadora Quill went back every year after that, and every year the map was different, and every year she redrew it from the rock where she had first asked, bread crumbs still in the crevices.',
        'People asked her, sometimes, how she could trust a map that was never finished.',
        '“That’s how I know it’s true,” she said.',
      ],
    },
  ],
}

const river = {
  id: 'river',
  title: 'Where the River Remembers',
  author: 'Mara Ellison',
  genre: 'Literary',
  type: 'linear',
  tagline: 'Grief, carved in stone, held by water.',
  description:
    'Noor comes home to Pell’s Hollow after twenty years away — for a funeral, and for a debt. The custom of the valley says every life gets one carved stone, given to the river. Her mother’s stone was never made, and low water is beginning to show what the river has been keeping instead. A quiet story about the rivers that run under families.',
  palette: { from: '#4e5d3a', to: '#161d12', accent: '#a9c48a' },
  coverArt: 'covers/river.jpg',
  chapters: [
    {
      title: 'Low Water',
      blocks: [
        'Noor flew home with a suitcase of city clothes and a eulogy she had rewritten four times in the departure lounge, and neither item fit her by the time she landed.',
        'Pell’s Hollow in October was low water. The River Pell had pulled back from its banks all across the valley, the elders said, further than anyone could remember — leaving the Carving Stones exposed in the gravel like a congregation of grey heads, patient, waiting to be read.',
        'The custom was old and precise. When someone in the Hollow died, their family came down to the river with a chisel, and carved one memory — one only, the true one — into a stone, and set it where the water could reach it. The river did the rest. The river always did the rest.',
        'The day after the funeral, Noor walked the length of the bank and read the stones that were showing. He whistled when he fixed things. The ring was a lie and so was the smile. She forgave him at the end, which is worse. Grief in the Hollow was not whispered. It was set in stone and handed to the current, and the current held it.',
        'Her mother’s stone was not among them.',
        '“It falls to family,” said Mrs. Beale from the footbridge, not unkindly. “And she had you, dear. Only you.”',
      ],
    },
    {
      title: 'The Carving Stones',
      blocks: [
        'Twenty years was a long time to be the only family. Noor had left at eighteen with a rucksack and a silence she had practiced until it sounded like dignity, and her mother had let her go with a face like a door closing gently, and they had both mistaken that for an ending. It had only been low water.',
        'She read stones all afternoon. Some were shallow-cut and new, the chisel-marks still bright. Some were worn to whispers by fifty winters of current. She found one that just said Ask me in spring, and one that said She could draw anything, and stood over that one a while.',
        '“Your mother came down every evening, the last year,” Mrs. Beale said, when Noor climbed the footbridge for the view. “Never brought a chisel. Never carved a thing. Said the river already knew, and then she’d sit on the flat stone out past the willows till dark, having her visit.”',
        '“There’s nothing on the flat stone,” Noor said. “I looked. It’s just — smooth.”',
        'Mrs. Beale looked at the water, and then at her, with the expression of a woman deciding how much of the truth a body could carry at once. “It’s low water, dear,” she said. “First time in sixty years. Have another look at the underside.”',
      ],
    },
    {
      title: 'What the Water Kept',
      blocks: [
        'The flat stone sat past the willows, half in the current, worn smooth as a knuckle. Noor waded to it in her city shoes, the cold climbing her ankles like an argument, and ducked her head under the bright skin of the river.',
        'The underside was carved. Every inch of it, dense as scripture, and going on beneath the gravel where the stone buried itself — not chiselled. Grown. The marks had the soft edges of things made by water, and the river had made them, and it had made them in a hand Noor knew the way she knew her own signature.',
        'It read back to her. A girl’s first bath in this river, shrieking, October, her mother laughing so hard she had to sit down on the bank. The shouting, much later, both of them fluent in a language only they spoke, every word a door slammed. The postcards from the city, kept in a biscuit tin with the good tea. The bus at four o’clock on Thursdays, and a woman at an upstairs window at ten to four, every Thursday, for twenty years, curtains held aside with two fingers.',
        'The river does not judge. Everyone in the Hollow knows that; it is the entire consolation of the custom. The river only remembers, and it remembers everything, even what you drop in on purpose, even what you drop in pretending it isn’t a gift.',
        'Noor came up for air and stayed on the flat stone till dark, having her visit.',
      ],
    },
    {
      title: 'Letting the Water Go',
      blocks: [
        'On her last morning in the Hollow, Noor borrowed Mrs. Beale’s chisel.',
        'The custom is one memory, the true one, and she turned the true one over all morning, the way you turn a stone in a river, feeling for the side that lies flat. She had thought it might be the leaving. Or the not-coming-back, which was different, and longer. But carving takes a while, and somewhere in the middle of the work she found the memory had chosen itself, and it was this: floating on her back in the Pell at seven years old, her mother’s hand under her shoulders, being told — in the voice her mother used for the truest things — the river holds you if you let it.',
        'She carved: She held me up. I’m learning to float.',
        'She set the stone among the others, where the water could reach it, and stood back, and did not feel fixed, because that is not what rivers do.',
        'That week the rain came, gentle and unremarkable, and the Pell rose over the stones the way a hand closes over something kept. The elders said it was the weather. No one in the Hollow, least of all Noor, believed them, and nobody said so, because some knowledge is just the other side of a custom.',
        'She flies back to the city on Sundays now, and the suitcase is lighter both ways. She is not a woman who believes rivers remember. She is only a woman who wakes, sometimes, in a flat far from any water, at ten to four — and feels, for a moment, held.',
      ],
    },
  ],
}

const clockmaker = {
  id: 'clockmaker',
  title: 'The Clockmaker’s Choice',
  author: 'R. S. Vane',
  genre: 'Interactive',
  type: 'interactive',
  tagline: 'Five endings. One hour that doesn’t exist.',
  description:
    'Your grandfather kept the clocks of Wren Street for forty years, and left you the shop, the tools, and a debt he never explained. The regulator in the back has stopped at 7:03 — and behind it, a small brass door. A branching story with five endings; every path is canon.',
  palette: { from: '#6e4b1f', to: '#1d150b', accent: '#f2c14e' },
  coverArt: 'covers/clockmaker.jpg',
  start: 'start',
  scenes: {
    start: {
      act: 'Act I · The Inheritance',
      title: 'The Shop on Wren Street',
      text: [
        'The funeral was on a Tuesday, and by Wednesday morning you are standing in your grandfather’s shop with your hands in your pockets, because you don’t know what else to do with them.',
        'Forty years of clocks tick around you — wall clocks, ship’s clocks, a black mantel clock with a chipped foot he never fixed because, he said, it was the chip that kept it honest. The whole room sounds like a field of crickets. All of them are running.',
        'All but one. The tall regulator at the back, the one no customer ever asked about, has stopped at 7:03. Its pendulum hangs dead still, like a held breath.',
        'His lawyer read you the will in the front room yesterday. The shop, the tools, the good name. And one line the lawyer stumbled over, and read twice: “And to my grandchild — the hour I owe.”',
      ],
      choices: [
        { text: 'Wind the regulator. Something stopped can always be started.', tag: 'curiosity', next: 'wind' },
        { text: 'Open the shop as usual. Grief or not, there’s work.', tag: 'duty', next: 'open' },
        { text: 'Read the letter he left with the will.', tag: 'heart', next: 'letter' },
      ],
    },
    wind: {
      act: 'Act I · The Inheritance',
      title: 'The Winding Key',
      text: [
        'The cabinet door opens without a sound. The winding key is already in the arbor — and it is warm, the way a handrail is warm after someone has been holding it.',
        'You turn the key. The weights lift. The pendulum swings once, twice, finding its old argument with time — and every clock in the shop strikes a single beat, together, out of turn.',
        'The regulator’s second hand ticks forward. Then, distinctly, deliberately, it ticks one second backward.',
        'And in that backward tick you hear — you would swear this in court — your grandfather clear his throat. The little cough he always did before saying something true.',
      ],
      choices: [
        { text: 'Look behind the regulator.', tag: 'curiosity', next: 'behind' },
        { text: 'Sit down and read his letter first. Slow down.', tag: 'caution', next: 'letter' },
      ],
    },
    letter: {
      act: 'Act I · The Inheritance',
      title: 'The Letter',
      text: [
        'His handwriting looks like a heartbeat read aloud. You can hear it in his voice as you go.',
        '“The regulator doesn’t tell time. It keeps a door shut. I’m sorry. I was young and I wanted to see, and wanting to see is the family condition, so I won’t apologise twice.',
        'If it has stopped — and everything stops, that is the whole of my trade — then the shop is yours, and so is the choice I never made. The hour between 7:03 and 7:04 is where I have been living. It is a good hour. It is not enough of one.',
        'Come or don’t. Wind or don’t. But whatever you decide, decide it on purpose. — G.”',
      ],
      choices: [
        { text: 'Look behind the regulator.', tag: 'curiosity', next: 'behind' },
        { text: 'Make tea in the back room. Let your hands do something ordinary.', tag: 'caution', next: 'breathe' },
      ],
    },
    open: {
      act: 'Act I · The Inheritance',
      title: 'The First Customer',
      text: [
        'You flip the sign to OPEN, because grief or not, a shop that doesn’t open is just a museum with rent. Within the hour, the doorbell — the little brass bell he never oiled, so you could hear honesty coming — announces a small woman in a grey coat.',
        'She sets a pocket watch on the counter. It is warm to the touch, like something carried against skin.',
        '“It stopped this morning,” she says. “At 7:03.”',
        'Every hair on your arms stands up, one by one, like an audience rising. On the case, engraved small: For G. — with the hour. — M.',
      ],
      choices: [
        { text: '“How did you know my grandfather?”', tag: 'heart', next: 'customer' },
        { text: 'Take the watch. Examine it. Say nothing.', tag: 'curiosity', next: 'watch' },
      ],
    },
    customer: {
      act: 'Act I · The Inheritance',
      title: 'The Woman in the Grey Coat',
      text: [
        '“Everyone in the quarter knew Elior,” she says, tracing the engraving with one finger. “Forty years he kept our clocks honest. He never once charged for a repair on the regulator in the back. ‘Some things you keep running out of love,’ he told me, ‘and some out of debt.’ I never asked which the regulator was.”',
        'She slides the pocket watch across the counter to you.',
        '“This stopped at 7:03 this morning, and I am too old to be trusted with other people’s hours. He’d want you to have it. He never let me carry it past the door.” She stands, settling her coat. “Fix it, and you’ll understand everything. Or don’t, and be wiser than he was. Either way — wind nothing you’re not prepared to keep.”',
      ],
      choices: [
        { text: 'Take the watch.', tag: 'curiosity', next: 'watch' },
        { text: 'Step past her and look behind the regulator.', tag: 'duty', next: 'behind' },
      ],
    },
    watch: {
      act: 'Act I · The Inheritance',
      title: 'The Stopped Watch',
      item: 'watch',
      text: [
        'She is gone before you can ask her name — the bell rings, the door swings, the street outside is empty in the particular way of streets that have just been used as an exit.',
        'The pocket watch sits in your palm, warm as a held hand, stopped at 7:03. The case opens on a mechanism so clean it looks newly invented. The mainspring, though. The mainspring is worn thin as lace, and it is the only tired thing in the whole shining machine.',
        'You close the case, and you could swear the watch ticks once against your fingers — a single beat, like a cough before saying something true.',
        'You carry the watch with you now.',
      ],
      choices: [
        { text: 'Look behind the regulator.', tag: 'curiosity', next: 'behind' },
        { text: 'Read his letter. You need to hear his voice.', tag: 'heart', next: 'letter' },
      ],
    },
    breathe: {
      act: 'Act I · The Inheritance',
      title: 'The Rhythm of the Room',
      text: [
        'You make tea in the back room, among forty years of tins ordered by a system only two people ever understood, and one of them was you at nine years old.',
        'Standing at the counter with the mug warming your hands, you finally hear the shop properly. The clocks are not ticking in chaos. They tick together — softly, deliberately, hundreds of small hearts keeping one rhythm, like a room full of people breathing quietly around someone asleep.',
        'They are keeping time for something.',
        'The regulator is the only clock in the shop that is off the beat. Or — you set the mug down — the only one keeping a different one.',
      ],
      choices: [
        { text: 'Look behind the regulator.', tag: 'curiosity', next: 'behind' },
        { text: 'Read his letter.', tag: 'heart', next: 'letter' },
      ],
    },
    behind: {
      act: 'Act II · The Brass Door',
      title: 'Behind the Regulator',
      text: [
        'You pull the regulator forward from the wall. Where the plaster should be — where you have put your palm a hundred times as a child, steadying yourself on tiptoe to watch the pendulum — there is a small brass door, green with age, hardly bigger than a breadbox.',
        'The keyhole is shaped like a minute hand.',
        'Through the seam of the door, a sliver of light: the exact amber of 7:03 on a summer evening, the light that makes even a street you know look like a memory of itself.',
        'And through the brass, faint but unmistakable, you can hear clocks. Hundreds of them. All ticking in unison — one enormous, patient heartbeat. And underneath, someone humming at a workbench, unhurried, older than you remember and exactly the same.',
      ],
      choices: [
        { text: 'Press your ear to the door.', tag: 'heart', next: 'listen' },
        { text: 'Use the winding key on the keyhole.', tag: 'curiosity', next: 'unlock' },
      ],
    },
    listen: {
      act: 'Act II · The Brass Door',
      title: 'Ear to the Brass',
      text: [
        'You press your ear against the cool metal and the shop falls away, and there is only the door, and what the door is holding.',
        'The ticking is not hundreds of clocks. It is one clock, enormously, played by hundreds of mouths, the way a choir is one song. Somewhere in it, a bench creaks. A file whispers across brass. The humming pauses.',
        'Then: a cough. The little cough he always did before saying something true.',
        'Your grandfather is behind that door, humming, forty years and one day after he supposedly left the world, and he is working, and he sounds — this is the part that undoes you — he sounds content.',
      ],
      choices: [
        { text: 'Knock.', tag: 'heart', next: 'knock' },
        { text: 'Use the winding key. Enough listening.', tag: 'curiosity', next: 'unlock' },
      ],
    },
    knock: {
      act: 'Act II · The Brass Door',
      title: 'The Third Board Creaks',
      text: [
        'You knock three times, on a brass door behind a dead clock, because you have run out of sensible options and kept going.',
        'The humming stops. Footsteps cross a wooden floor, and the third board creaks — the third board has always creaked; he always said he kept it as a doorbell that couldn’t be oiled.',
        'From the other side, close, his voice: “Ah. There you are.” A world of relief in four words, packed like a suitcase. “It stopped, didn’t it. Of course it stopped. Everything does — that is the whole of my trade.”',
        '“Come in, then. I’ve kept the bench by the window for you. Bring the key. Mind the third step — no. No, you know about the third step.”',
      ],
      choices: [
        { text: 'Open the door.', tag: 'heart', next: 'enter' },
        { text: 'Step back. This isn’t possible. Funerals are final.', tag: 'caution', next: 'hesitate' },
      ],
    },
    unlock: {
      act: 'Act II · The Brass Door',
      title: 'The Minute-Hand Keyhole',
      text: [
        'The winding key fits the minute-hand keyhole the way a word fits a sentence — like it was cast for it, because of course it was.',
        'The door doesn’t creak. Doors in dreams never do. It swings inward on a workshop that is your grandfather’s workshop and is not: same benches, same lamps, same wall of tiny drawers labelled in his hand. But the window shows Wren Street at 7:03 on a summer evening, forever — the long amber light, the pigeons mid-second, the baker’s boy on a bicycle caught eternally between streetlights.',
        'And at the bench, sleeves rolled, file in hand, not one day older than the photographs on the stairs at home: your grandfather.',
        '“There you are,” he says, not turning around. “Forty years, and you’re still late.”',
      ],
      choices: [{ text: 'Step inside.', tag: 'curiosity', next: 'enter' }],
    },
    hesitate: {
      act: 'Act II · The Brass Door',
      title: 'Grief Lies to Fill the Shape of a Person',
      text: [
        'You step back from the door. Of course this isn’t possible. Funerals are final; everyone knows this; the paperwork was very thorough. Grief lies — they tell you that in the pamphlets — it lies to fill the shape of the person, like water filling a footprint.',
        'But the clocks of the shop tick on around you, patient as a held breath, keeping time for something. And the light under the brass door doesn’t waver, and the third board creaked, and no lie you have ever told yourself had that specific sound.',
        'Some lies are doors. Some doors are debts. Your grandfather’s letter said to decide on purpose, and you are, whatever you choose, deciding on purpose.',
      ],
      choices: [
        { text: 'Open the door.', tag: 'curiosity', next: 'enter' },
        { text: 'Lock up. Keep the key. Go home and live your life.', tag: 'caution', next: 'walkaway' },
      ],
    },
    enter: {
      act: 'Act III · The Hour Between',
      title: 'The Hour Between',
      text: [
        'Inside, the workshop smells of brass and bergamot and forty years of Tuesdays. “Mind the third step,” he says, exactly as you step on it.',
        'He explains it the way he explained everything, while his hands went on working: the hour between 7:03 and 7:04 does not exist on clocks. It exists here. Every clock in the world draws its next tick out of this room, the way every street draws its light out of one power station. Somebody has always been here, winding the mainspring of the hour. He took the shift from a woman named M., who took it from a man nobody now remembers. “Nobody remembers him,” your grandfather says, “because that is the cost, and I have decided you should know the prices before you shop.”',
        '“The regulator stopped because the mainspring is wearing through. The hour is running on its reserve. When the reserve goes—” He shrugs, a man shrugging at weather. “—the world keeps time unevenly. Some minutes will be sixty-one seconds. Some Tuesdays will repeat. Nothing you could prove. Everything you would feel.”',
        'He looks at you then, and he is not content at all, not for one second, and that is somehow the most honest thing in the room. “I chose the hour and told myself it was for the shop. I have been here forty years. Somebody has to choose again, and this time it should be somebody who knows what it costs. So.” He sets down the file. “What are we doing?”',
      ],
      choices: [
        { text: '“Come home. I’ll take the shift.”', tag: 'duty', next: 'exchange' },
        { text: '“Teach me. I’ll stay — with you.”', tag: 'heart', next: 'apprentice' },
        { text: '“We both go. Surely it can run itself.”', tag: 'curiosity', next: 'gamble' },
        { text: '“Why did you never come home?”', tag: 'heart', next: 'why' },
      ],
    },
    why: {
      act: 'Act III · The Hour Between',
      title: 'Why He Never Came Home',
      text: [
        'He takes his time, oiling a spring that doesn’t need it. “Because time is a debt somebody has to carry, and I was already here. Because your grandmother’s funeral was on a Tuesday and I did not trust myself to leave if I saw you all grieving in your good coats. Because it is easier to be a legend in a lamp than a man at a dinner table saying the wrong thing about the potatoes.”',
        '“I could have asked,” he says, to the spring. “I know. Every year I could have asked. The shift ends the way it started: somebody chooses. That is the whole mechanism. That is all it has ever been.”',
        'He looks up, and for a moment the amber light catches him and he is exactly as old as he should be, an old man in a workshop, tired, holding something out.',
        '“So choose, my dear. Anything. Even the wrong thing. Especially on purpose.”',
      ],
      choices: [
        { text: '“Come home. I’ll take the shift.”', tag: 'duty', next: 'exchange' },
        { text: '“Teach me. I’ll stay — with you.”', tag: 'heart', next: 'apprentice' },
        { text: '“We both go. Surely it can run itself.”', tag: 'curiosity', next: 'gamble' },
      ],
    },
    exchange: {
      act: 'Finale',
      title: 'The Exchange',
      ending: { id: 'exchange', name: 'The Exchange' },
      text: [
        'He argues, of course. He is your grandfather. He loses, of course. You are his.',
        'He goes home through the brass door at 7:03, and the street receives him like a sentence receiving its final word. He lives in the little house on Wren Street for eleven more years. He grows terrible tomatoes and wonderful opinions. He dies in his bed, in winter, at 7:03 in the evening, smiling, on the hour, like a man leaving work.',
        'You keep the hour. It is quiet, and long, and there is a bench by the window, and the work is exactly hard enough. Every clock in the world ticks now with your heartbeat folded inside it, which is a thing you know and cannot tell anyone.',
        'Once a day, at ten to four — bus time — you stand at the window of the hour and watch a street that is always arriving at evening, and you feel, through the brass, through the ticking, through everything: held.',
      ],
    },
    apprentice: {
      act: 'Finale',
      title: 'The Apprentice',
      ending: { id: 'apprentice', name: 'The Apprentice' },
      text: [
        'You stay. You learn. Days pass here the way hours pass out there, or possibly the other way around; the hour doesn’t pass at all, so “decades” is a polite fiction you keep for visitors. There are no visitors.',
        'He teaches you to cast a spring that holds a year. To oil a minute so it moves sweetly. To listen to a clock the way you’d listen to a horse — for the tell, the hitch, the honest limp. His hands over yours on the file, patient, patient, patient.',
        'Travellers do stumble in, once a generation or so — the door only opens for the grieving and the curious, and you have never once been surprised which kind arrives. You pour tea. You say what he said: “Some things you keep running out of love, and some out of debt.” You have learned which the regulator is. You have learned it was always both.',
        'And one day, a lifetime from now by any clock you like, a child with your eyes and your grandfather’s cough finds the brass door behind a stopped regulator, and stands there with a winding key going warm in their hand.',
        'You keep the bench by the window for them. Of course you do. It was kept for you.',
      ],
    },
    gamble: {
      act: 'Finale',
      title: 'The Gamble',
      ending: { id: 'gamble', name: 'The Gamble' },
      text: [
        'You both go. The brass door seals itself behind you with a sound like a held breath finally let out, and the regulator, behind you in the dark shop, begins of itself to tick.',
        'The world keeps time unevenly now. Some minutes run sixty-one seconds and everyone blames their watches. The second Tuesday of one October repeats — you both agree it was a good Tuesday, and worth it — and the pigeons on Wren Street have been mid-flap since spring, which the neighbours have simply accepted, the way neighbours do.',
        'But the house on Wren Street has two chairs at the bench now. He teaches you the trade in the shop with the sign that says OPEN, and the quarter brings him every clock it has ever lied about, and he fixes them all and charges for none of the regulator’s repairs, because he no longer keeps it.',
        'At 7:03 every evening, all the streetlights on Wren Street flicker, once, together. You and your grandfather look at each other over the bench and laugh, every time, like it’s the first time.',
        'It is not a small life. It is not even a slightly ordinary one. You keep the winding key on a ribbon by the door, and you keep the watch — hers, his, yours — wound.',
      ],
    },
    walkaway: {
      act: 'Finale',
      title: 'The Locked Door',
      ending: { id: 'walkaway', name: 'The Locked Door' },
      text: [
        'You lock the shop that night and keep the winding key on a ribbon under your shirt, where it stays warm in a way you decide not to examine.',
        'In the spring you sell the shop, at a fair price, to a baker whose bread is honest and whose name is on the awning now. The clocks went to collectors; the regulator went with the building, too heavy to move, and the baker uses it for flour sacks and says the shop has good bones.',
        'You live in the city. You are, on the whole, and this is the truth, kind. You are good at your work. You love people and let them know it, promptly, in the plain words, because you have learned exactly how much a delayed sentence costs.',
        'But at 7:03 — some evenings only — every clock you own, and you own four, ticks once, together, out of turn. And every streetlight on your street flickers, once, like a lamp being noticed.',
        'You tell yourself it’s the grid. You keep the key on its ribbon. And you always, always set your clocks a minute fast — as if, somewhere behind a wall in a baker’s shop, someone is still keeping time with you.',
      ],
    },
    mainspring: {
      act: 'Finale',
      title: 'The Watchmaker’s Hour',
      ending: { id: 'mainspring', name: 'The Watchmaker’s Hour', trueEnding: true },
      text: [
        'You set the pocket watch on the bench between you, and his hands go still the way shops go quiet.',
        '“Where did you get that?” he says, already knowing, and you tell him about the woman in the grey coat, and he sits down slowly on the third step of a staircase that isn’t there. “M.,” he says. “She kept the hour before me. She left it to me with this watch and one instruction I was too young to hear: it isn’t a keepsake. It’s the mainspring.”',
        'The watch is the heart of the hour — the first spring, the one all the others wind from. When it wears through, the hour runs on its reserve, and someone must sit inside keeping the beat by hand. M. couldn’t mend it; mending it takes two pairs of hands and forty years of benchwork, and she had spent her hour leaving. He could have mended it — he had the hands, and the forty years — and never knew it was broken inside its beautiful, warm, stopped case, because she never told him what it was. Because she loved him. Because that is how debts are bequeathed, in every family, in every trade, forever.',
        'You cut the new spring together. His hands over yours, then yours over his — patient, patient, patient — casting and tempering and fitting, while the amber evening waits outside the window, held. It takes the length of one ordinary apprenticeship, or the space between two ticks. Inside the hour, they are the same size.',
        'The watch starts at 7:04.',
        'The window, for the first time in forty years, moves. The baker’s boy finishes his bicycle. The pigeons land. The street arrives at evening, and then, gently, at night.',
        'You walk home to Wren Street together, two generations at an ordinary pace, arguing about tomatoes. The shop keeps ordinary hours now, and keeps them well. There is a sign that says OPEN, and under it, in a hand like a heartbeat: “Some things you keep running out of love.”',
        'You keep the watch wound. Of course you do. It was kept for you.',
      ],
    },
  },
  // Extra choice injected at runtime when the reader carries the watch:
  watchChoiceAt: {
    enter: { text: '“I think I have something of yours.” Set the watch on the bench.', tag: 'curiosity', next: 'mainspring' },
    why: { text: '“I think I have something of yours.” Set the watch on the bench.', tag: 'curiosity', next: 'mainspring' },
  },
}

export const books = [clockmaker, lighthouse, cartographer, river]

export const bookIndex = Object.fromEntries(books.map((b) => [b.id, b]))

export function getBook(id) {
  return bookIndex[id]
}

// ── Derived helpers ──────────────────────────────────────────────────────────

export function linearBlockList(book) {
  const blocks = []
  book.chapters.forEach((ch, ci) => {
    blocks.push({ type: 'h', text: ch.title, chapter: ci, gi: blocks.length, chapterStart: true })
    let firstPara = true
    ch.blocks.forEach((entry) => {
      if (entry && entry.sep) {
        blocks.push({ type: 'sep', chapter: ci, gi: blocks.length })
      } else {
        blocks.push({ type: 'p', text: entry, chapter: ci, gi: blocks.length, opener: firstPara })
        firstPara = false
      }
    })
  })
  return blocks
}

export function bookWordCount(book) {
  if (book.type === 'linear') {
    return linearBlockList(book).reduce(
      (n, b) => n + (b.text ? b.text.split(/\s+/).filter(Boolean).length : 0),
      0,
    )
  }
  return Object.values(book.scenes).reduce(
    (n, s) => n + s.text.reduce((m, p) => m + p.split(/\s+/).filter(Boolean).length, 0),
    0,
  )
}

export function bookChapterCount(book) {
  return book.type === 'linear' ? book.chapters.length : new Set(Object.values(book.scenes).map((s) => s.act)).size
}

export function interactiveEndings(book) {
  return Object.entries(book.scenes)
    .filter(([, s]) => s.ending)
    .map(([id, s]) => ({ sceneId: id, ...s.ending }))
}

export const genreList = [...new Set(books.map((b) => b.genre))]
