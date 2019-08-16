let allNPCS = {
    demodoge: {
        collision: { x: -75, y: 0, width: 150, height: 75 },
        animations: [
            'npc_demodoge'
        ]
    },
    lilbro: {
        collision: { x: -75, y: 0, width: 150, height: 75 },
        animations: [
            'npc_lilbro'
        ]
    },
    reactiondoge: {
        collision: { x: -75, y: 0, width: 150, height: 75 },
        animations: [
            'npc_demodoge'
        ]
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
            { object: 'cromchbar', position: { x: 200, y: 500 } },
            { object: 'loafatron', position: { x: 400, y: 500 } }
        ],
        background: 'background',
        bounds: { x: -100, y: -100, width: 1000, height: 800 }
    }
}

let allDialogue = {
    none: {
        intro: { type: 'text', content: `Can't find the text file you are looking for! Or the developer is stupid and hasn't added it. Either way he is stupid...` }
    },
    lilbro: {
        intro: {
            type: 'text-part',
            content: `Hi, stranger! What is you name?`,
            lead: 'intro2'
        },
        intro2: {
            type: 'text-part',
            content: `$n? Well, hi $n! My name is Lil Bro, or at least that is what everyone calls me.`,
            lead: 'intro3'
        },
        intro3: {
            type: 'choice',
            content: `I have an idea! Want to play Cringeformers?`,
            options: [
                { content: 'Sure!', response: 'yescringeformers' },
                { content: 'No...', response: 'nocringeformers' }
            ]
        },
        newintro: {
            type: 'choice',
            content: `Hi $n! Want to play Cringeformers now?`,
            options: [
                { content: 'Sure!', response: 'yescringeformers' },
                { content: 'No...', response: 'nocringeformers' }
            ]
        },
        yescringeformers: {
            type: 'text-give',
            gives: {
                item: 'loafatron',
                success: `loafatronitem`,
                failure: `fullpockets`,
                already: 'itemrepeat'
            }
        },
        nocringeformers: {
            type: 'text-end',
            content: 'Well, ok, maybe later then...',
            back: 'newintro',
        },
        loafatronitem: {
            type: 'text-part',
            content: `I don't have much, but the Loaf-a-Tron is the coolest one!`,
            lead: 'loafatrontrigger',
        },
        loafatrontrigger: {
            type: 'text-trigger',
            triggeredNPC: 'demodoge',
            triggeredLine: 'newintro',
            lead: 'loafatronitem2',
        },
        loafatronitem2: {
            type: 'text-end',
            content: `I got it for Christmas from my Big Bro!`,
            back: 'havefun',
        },
        fullpockets: {
            type: 'text-end',
            content: `I would give you one, but you looks like you have too much stuff, so I'll just wait...`,
            back: 'newintro',
        },
        itemrepeat: {
            type: 'text-end',
            content: `Ok, pull out your Loaf-a-Tron and play!`,
            back: 'newintro',
        },
        havefun: {
            type: 'text-end',
            content: `Oh boy! I finally have someone to play Cringeformers with!`,
            back: 'havefun',
        },
        sadbro: {
            type: 'choice',
            content: `Hi $n! Can I have my Loaf-a-Tron back?`,
            options: [
                { content: 'Sure!', response: 'yestake' },
                { content: 'Um...', response: 'notake' }
            ]
        },
        yestake: {
            type: 'text-take',
            takes: {
                item: 'loafatron',
                success: 'yay',
                failure: 'sad',
                already: 'itemrepeat'
            }
        },
        yay: {
            type: 'text-end',
            content: `Yay! I knew I could trust you...`,
            back: 'yay',
        },
        sad: {
            type: 'text-part',
            content: `You don't have it? HOW COULD YOU LOSE IT!?!?`,
            lead: 'hate',
        },
        notake: {
            type: 'text-part',
            content: `What? But I want my Loaf-a-Tron back!`,
            lead: 'hate',
        },
        hate: {
            type: 'text-end',
            content: `I hate you...`,
            back: 'hate',
        }
    },
    demodoge: {
        intro: {
            type: 'text-end',
            content: `Eh, go away loser...`
        },
        newintro: {
            type: 'text-part',
            content: `Hey. $n's the name right?`,
            lead: 'talking1'
        },
        talking1: {
            type: 'text-part',
            content: `Overheard you talking to that kid over there. I see you got a Loaf-a-Tron.`,
            lead: 'talking2'
        },
        talking2: {
            type: 'text-part',
            content: `Don't know if you know this, but that is some ultra-rare stuff right there.`,
            lead: 'talking3'
        },
        talking3: {
            type: 'choice',
            content: `If you would give that to me, I would pay you lots of dogecoins for it.`,
            options: [
                { content: 'Ez Money...', response: 'thankstake' },
                { content: `It's not mine...`, response: 'reallytrigger' }
            ]
        },
        thankstrigger: {
            type: 'text-trigger',
            triggeredNPC: 'lilbro',
            triggeredLine: 'sadbro',
            lead: 'thankstake',
        },
        thankstake: {
            type: 'text-take',
            takes: {
                item: 'loafatron',
                success: 'thanks',
                failure: 'donthave',
                already: 'thanks'
            }
        },
        thanks: {
            type: 'text-end',
            content: `Thanks bro, you're not going to regret it.`,
            back: 'final'
        },
        donthave: {
            type: 'text-end',
            content: `You don't even have it anymore. What is wrong with you?`,
            back: 'donthave'
        },
        reallytrigger: {
            type: 'text-trigger',
            triggeredNPC: 'lilbro',
            triggeredLine: 'sadbro',
            lead: 'really',
        },
        really: {
            type: 'text-end',
            content: `Really. Your going to do this. Bro, that's cringe.`,
            back: 'really'
        },
        final: {
            type: 'text-part',
            content: `Don't worry, I'll pay you in a few days...`,
            lead: 'final2'
        },
        final2: {
            type: 'text-end',
            content: `...in your dreams.`,
            back: 'final'
        },
        welcome: {
            type: 'text',
            content: `Welcome to the 'Doge in the Factory' demo retards...`
        },
        info: {
            type: 'text',
            content: `This demo is just a very small sample of some of the dialogue in the actual game.`
        },
        info2: {
            type: 'text',
            content: `Right now, u/CodingAP is currently making this a really good and fun game,`
        },
        info3: {
            type: 'text',
            content: `so I hope you have time to stick around and see the full story.`
        },
        info4: {
            type: 'text',
            content: `Right now, we are in a cutscene, which is being made in real time.`
        },
        info5: {
            type: 'text',
            content: `I can talk while moving in all the corners!`
        },
        info6: {
            type: 'text',
            content: `Anyways, little backstory on the story in the actual game...`
        },
        info7: {
            type: 'text',
            content: `This is based off of the story 'CROMCH!', which u/thebeardoger1 made!`
        },
        info8: {
            type: 'text',
            content: `You should check him out on r/dogelore, makes really good comics.`
        },
        info9: {
            type: 'text',
            content: `Ok retards, on to the demo!`
        },
    }
}

let allCutscenes = {
    demo: {
        frames: [
            {
                duration: 2,
                npcs: [
                    { npc: 'demodoge', moveTo: { x: 400, y: 300 } },
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
                    { npc: 'demodoge', dialogue: 'info4' },
                ]
            }, {
                duration: 1,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info5', moveTo: { x: 100, y: 200 } },
                ]
            }, {
                duration: 1,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info5', moveTo: { x: 650, y: 200 } },
                ]
            }, {
                duration: 1,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info5', moveTo: { x: 650, y: 500 } },
                ]
            }, {
                duration: 1,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info5', moveTo: { x: 100, y: 500 } },
                ]
            }, {
                duration: 0.5,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info6', moveTo: { x: 400, y: 300 } },
                ]
            }, {
                duration: 2.5,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info6' },
                ]
            }, {
                duration: 3,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info7' },
                ]
            }, {
                duration: 3,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info8' },
                ]
            }, {
                duration: 3,
                npcs: [
                    { npc: 'demodoge', dialogue: 'info9' },
                ]
            }
        ],
        options: {
            startingPositions: [
                { npc: 'demodoge', position: { x: -50, y: 300 } },
            ],
            moving: true,
            dialogue: true
        }
    }
}