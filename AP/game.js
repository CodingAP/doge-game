let allNPCS = {
    demodoge: {
        collision: { x: -75, y: 0, width: 150, height: 75 },
        animations: [
            'npc_demodoge',
            'npc_demodoge_talk'
        ],
        name: 'Doge'
    },
    lilbro: {
        collision: { x: -75, y: 0, width: 150, height: 75 },
        animations: [
            'npc_lilbro',
            'npc_lilbro_talk'
        ],
        name: 'Lil Bro'
    },
    reactiondoge: {
        collision: { x: -75, y: 0, width: 150, height: 75 },
        animations: [
            'npc_demodoge',
            'npc_demodoge_talk'
        ],
        name: 'Interesting Doge'
    }
}

let allItems = {
    cromchbar: {
        animation: 'item_cromchbar'
    },
    loafatron: {
        animation: 'item_loafatron'
    }
}

let allObjects = {
    cromchbar: {
        collision: { x: -50, y: -50, width: 50, height: 50 },
        animation: 'object_cromchbar'
    },
    loafatron: {
        collision: { x: -50, y: -50, width: 50, height: 50 },
        animation: 'object_loafatron'
    }
}

let allScenes = {
    demo: {
        playerPosition: { x: 500, y: 100 },
        npcs: [
            { npc: 'demodoge', position: { x: 100, y: 300 } },
            { npc: 'lilbro', position: { x: 300, y: 300 } },
            { npc: 'reactiondoge', position: { x: 500, y: 300 } }
        ],
        objects: [
            { object: 'cromchbar', position: { x: 200, y: 100 } },
            { object: 'loafatron', position: { x: 400, y: 100 } }
        ],
        background: 'background',
        bounds: { x: -100, y: -100, width: 1000, height: 800 }
    }
}

let allDialogue = {
    none: {
        intro: { type: 'text', content: `Can't find the text file you are looking for! Or the developer is stupid and hasn't added it. Either way he is stupid...` }
    },
    player: {
        cromchbar: {
            type: 'text-part',
            content: 'This is a cromchbar.',
            lead: 'cromchbar2',
            reaction: 1
        },
        cromchbar2: {
            type: 'text-end',
            content: 'It looks good, but it\'s actual crap.',
            reaction: 1
        },
        loafatron: {
            type: 'text-part',
            content: 'This is a Loaf-a-tron!',
            lead: 'loafatrontake',
            reaction: 1
        },
        loafatrontake: {
            type: 'text-player-take',
            gives: {
                item: 'loafatron',
                success: 'loafatron2',
                failure: 'loafatronfail'
            }
        },
        loafatronfail: {
            type: 'text-end',
            content: 'I would take it, but I don\'t have enough space...',
            reaction: 1
        },
        loafatron2: {
            type: 'text-end',
            content: 'I better take it because it is super rare...',
            reaction: 1
        },
        yescringeformersres: {
            type: 'text-end',
            content: 'Sure! What Cringeformers do you have?',
            reaction: 1
        },
        nocringeformersres: {
            type: 'text-end',
            content: 'No, I\'m kinda busy...',
            reaction: 1
        },
        yayres: {
            type: 'text-end',
            content: 'Sure! Here you go...',
            reaction: 1
        },
        sadres: {
            type: 'text-end',
            content: 'I would, but I don\'t have it anymore...',
            reaction: 1
        },
        notakeres: {
            type: 'text-end',
            content: 'No, you can\'t!',
            reaction: 1
        },
    },
    lilbro: {
        intro: {
            type: 'text-part',
            content: `Hi, stranger! What is you name?`,
            lead: 'intro2',
            reaction: 1
        },
        intro2: {
            type: 'text-part',
            content: `$n? Well, hi $n! My name is Lil Bro, or at least that is what everyone calls me.`,
            lead: 'intro3',
            reaction: 1
        },
        intro3: {
            type: 'choice',
            content: `I have an idea! Want to play Cringeformers?`,
            options: [
                { content: 'Sure!', response: 'yescringeformersplayer' },
                { content: 'No...', response: 'nocringeformersplayer' }
            ],
            reaction: 1
        },
        newintro: {
            type: 'choice',
            content: `Hi $n! Want to play Cringeformers now?`,
            options: [
                { content: 'Sure!', response: 'yescringeformersplayer' },
                { content: 'No...', response: 'nocringeformersplayer' }
            ],
            reaction: 1
        },
        yescringeformersplayer: {
            type: 'text-player',
            playerLine: 'yescringeformersres',
            lead: 'yescringeformers'
        },
        yescringeformers: {
            type: 'text-give',
            gives: {
                item: 'loafatron',
                success: `loafatronitem`,
                failure: `fullpockets`,
                already: 'itemrepeat'
            },
            reaction: 1
        },
        nocringeformersplayer: {
            type: 'text-player',
            playerLine: 'nocringeformersres',
            lead: 'nocringeformers'
        },
        nocringeformers: {
            type: 'text-end',
            content: 'Well, ok, maybe later then...',
            back: 'newintro',
            reaction: 1
        },
        loafatronitem: {
            type: 'text-part',
            content: `I don't have much, but the Loaf-a-Tron is the coolest one!`,
            lead: 'loafatrontrigger',
            reaction: 1
        },
        loafatrontrigger: {
            type: 'text-trigger',
            triggeredNPC: 'demodoge',
            triggeredLine: 'newintro',
            lead: 'loafatronitem2',
            reaction: 1
        },
        loafatronitem2: {
            type: 'text-end',
            content: `I got it for Christmas from my Big Bro!`,
            back: 'havefun',
            reaction: 1
        },
        fullpockets: {
            type: 'text-end',
            content: `I would give you one, but you looks like you have too much stuff, so I'll just wait...`,
            back: 'newintro',
            reaction: 1
        },
        itemrepeat: {
            type: 'text-end',
            content: `Ok, pull out your Loaf-a-Tron and play!`,
            back: 'newintro',
            reaction: 1
        },
        havefun: {
            type: 'text-end',
            content: `Oh boy! I finally have someone to play Cringeformers with!`,
            back: 'havefun',
            reaction: 1
        },
        sadbro: {
            type: 'choice',
            content: `Hi $n! Can I have my Loaf-a-Tron back?`,
            options: [
                { content: 'Sure!', response: 'yestake' },
                { content: 'Um...', response: 'notakeplayer' }
            ],
            reaction: 1
        },
        yestake: {
            type: 'text-take',
            takes: {
                item: 'loafatron',
                success: 'yayplayer',
                failure: 'sadplayer',
                already: 'itemrepeat'
            },
            reaction: 1
        },
        yayplayer: {
            type: 'text-player',
            playerLine: 'yayres',
            lead: 'yay'
        },
        yay: {
            type: 'text-end',
            content: `Yay! I knew I could trust you...`,
            back: 'yay',
            reaction: 1
        },
        sadplayer: {
            type: 'text-player',
            playerLine: 'sadres',
            lead: 'sad'
        },
        sad: {
            type: 'text-part',
            content: `You don't have it? HOW COULD YOU LOSE IT!?!?`,
            lead: 'hate',
            reaction: 1
        },
        notakeplayer: {
            type: 'text-player',
            playerLine: 'notakeres',
            lead: 'notake'
        },
        notake: {
            type: 'text-part',
            content: `What? But I want my Loaf-a-Tron back!`,
            lead: 'hate',
            reaction: 1
        },
        hate: {
            type: 'text-end',
            content: `I hate you...`,
            back: 'hate',
            reaction: 1
        },
        info4: {
            type: 'text',
            content: `DAD!`,
            reaction: 1
        },
        info5: {
            type: 'text',
            content: `DAD! I WANT TO PLAY 'DOGE IN THE FACTORY' AGAIN!`,
            reaction: 1
        },
        info6: {
            type: 'text',
            content: `I don't care. Let me play it!`,
            reaction: 1
        },
        info7: {
            type: 'text',
            content: `But you let me play it earlier. LET ME PLAY IT NOW!`,
            reaction: 1
        },
        info8: {
            type: 'text',
            content: `YAY!`,
            reaction: 1
        },
    },
    demodoge: {
        intro: {
            type: 'text-end',
            content: `Eh, go away loser...`,
            reaction: 1
        },
        newintro: {
            type: 'text-part',
            content: `Hey. $n's the name right?`,
            lead: 'talking1',
            reaction: 1
        },
        talking1: {
            type: 'text-part',
            content: `Overheard you talking to that kid over there. I see you got a Loaf-a-Tron.`,
            lead: 'talking2',
            reaction: 1
        },
        talking2: {
            type: 'text-part',
            content: `Don't know if you know this, but that is some ultra-rare stuff right there.`,
            lead: 'talking3',
            reaction: 1
        },
        talking3: {
            type: 'choice',
            content: `If you would give that to me, I would pay you lots of dogecoins for it.`,
            options: [
                { content: 'Ez Money...', response: 'thankstrigger' },
                { content: `It's not mine...`, response: 'reallytrigger' }
            ],
            reaction: 1
        },
        thankstrigger: {
            type: 'text-trigger',
            triggeredNPC: 'lilbro',
            triggeredLine: 'sadbro',
            lead: 'thankstake',
            reaction: 1
        },
        thankstake: {
            type: 'text-take',
            takes: {
                item: 'loafatron',
                success: 'thanks',
                failure: 'donthave',
                already: 'thanks'
            },
            reaction: 1
        },
        thanks: {
            type: 'text-end',
            content: `Thanks bro, you're not going to regret it.`,
            back: 'final',
            reaction: 1
        },
        donthave: {
            type: 'text-end',
            content: `You don't even have it anymore. What is wrong with you?`,
            back: 'donthave',
            reaction: 1
        },
        reallytrigger: {
            type: 'text-trigger',
            triggeredNPC: 'lilbro',
            triggeredLine: 'sadbro',
            lead: 'really',
            reaction: 1
        },
        really: {
            type: 'text-end',
            content: `Really. Your going to do this. Bro, that's cringe.`,
            back: 'really',
            reaction: 1
        },
        final: {
            type: 'text-part',
            content: `Don't worry, I'll pay you in a few days...`,
            lead: 'final2',
            reaction: 1
        },
        final2: {
            type: 'text-end',
            content: `...in your dreams.`,
            back: 'final',
            reaction: 1
        },
        welcome: {
            type: 'text',
            content: `Welcome to my office! I see you are looking for a job.`,
            reaction: 1
        },
        info: {
            type: 'text',
            content: `No? Well, I see, how about purchasing some foot cream?`,
            reaction: 1
        },
        info2: {
            type: 'text',
            content: `No to that as well? Well what do you want?`,
            reaction: 1
        },
        info3: {
            type: 'text',
            content: `Ah, the game.`,
            reaction: 1
        },
        info9: {
            type: 'text',
            content: `Well, 'Doge in the Factory' is going smoothly right now...`,
            reaction: 1
        },
        info10: {
            type: 'text',
            content: `The team is working on the assets to the game.`,
            reaction: 1
        },
        info11: {
            type: 'text',
            content: `Sadly we don't have a demo, so I can't sho...`,
            reaction: 1
        },
        info12: {
            type: 'text',
            content: `Um... son can't you see I'm busy, he he.`,
            reaction: 1
        },
        info13: {
            type: 'text',
            content: `How can you play it if it doesn't exist?`,
            reaction: 1
        },
        info14: {
            type: 'text',
            content: `Ok... I'll set it up for you.`,
            reaction: 1
        },
        info15: {
            type: 'text',
            content: `So, the cat is out of the bag. We do have a demo, but only for certain people, but it will be released to the public later on.`,
            reaction: 1
        },
        info16: {
            type: 'text',
            content: `What this version is a more optimized version of the first demo, with the office background.`,
            reaction: 1
        },
        info17: {
            type: 'text',
            content: `Anyways, here it is!`,
            reaction: 1
        },
    },
    reactiondoge: {
        intro: {
            type: 'text-end',
            content: 'Hope you enjoy the demo! This was made by CodingAP, zinnyboy, and BamBamBamoozel.',
            reaction: 1
        }
    }
}

let allCutscenes = {
    demo: {
        frames: [
            {
                duration: 1,
                npcs: [
                    { npc: 'demodoge', moveTo: { x: 600, y: 300 } }
                ]
            }, {
                duration: 3,
                npcs: [
                    { npc: 'demodoge', dialogue: 'welcome' },
                ]
            }, {
                duration: 3,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info' },
                ]
            }, {
                duration: 3,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info2' },
                ]
            }, {
                duration: 3,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info3' },
                ]
            }, {
                duration: 3,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info9' },
                ]
            }, {
                duration: 3,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info10' },
                ]
            }, {
                duration: 3,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info11' },
                ]
            }, {
                duration: 1.5,
                npcs: [
                    { npc: 'lilbro', dialogue: 'info4' },
                ]
            }, {
                duration: 2,
                npcs: [
                    { npc: 'lilbro', dialogue: 'info5', moveTo: { x: 300, y: 300 } },
                ]
            }, {
                duration: 3,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info12' },
                ]
            }, {
                duration: 3,
                npcs: [
                    { npc: 'lilbro', dialogue: 'info6' },
                ]
            }, {
                duration: 3,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info13' },
                ]
            }, {
                duration: 3,
                npcs: [
                    { npc: 'lilbro', dialogue: 'info7' },
                ]
            }, {
                duration: 3,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info14' },
                ]
            }, {
                duration: 1,
                npcs: [
                    { npc: 'lilbro', dialogue: 'info8', moveTo: { x: -50, y: 300 } },
                ]
            }, {
                duration: 3,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info15' },
                ]
            }, {
                duration: 3,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info16' },
                ]
            }, {
                duration: 3,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info17' },
                ]
            }
        ],
        options: {
            startingPositions: [
                { npc: 'demodoge', position: { x: 850, y: 300 } },
                { npc: 'lilbro', position: { x: -50, y: 300 } }
            ],
            cameraPosition: { x: 400, y: 300 },
            moving: true,
            dialogue: true
        }
    }
}