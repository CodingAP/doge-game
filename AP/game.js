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
        },
        info4: {
            type: 'text',
            content: `DAD!`
        },
        info5: {
            type: 'text',
            content: `DAD! I WANT TO PLAY 'DOGE IN THE FACTORY' AGAIN!`
        },
        info6: {
            type: 'text',
            content: `I don't care. Let me play it!`
        },
        info7: {
            type: 'text',
            content: `But you let me play it earlier. LET ME PLAY IT NOW!`
        },
        info8: {
            type: 'text',
            content: `YAY!`
        },
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
                { content: 'Ez Money...', response: 'thankstrigger' },
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
            content: `Welcome to my office! I see you are looking for a job.`
        },
        info: {
            type: 'text',
            content: `No? Well, I see, how about purchasing some foot cream?`
        },
        info2: {
            type: 'text',
            content: `No to that as well? Well what do you want?`
        },
        info3: {
            type: 'text',
            content: `Ah, the game.`
        },
        info9: {
            type: 'text',
            content: `Well, 'Doge in the Factory' is going smoothly right now...`
        },
        info10: {
            type: 'text',
            content: `The team is working on the assets to the game.`
        },
        info11: {
            type: 'text',
            content: `Sadly we don't have a demo, so I can't sho...`
        },
        info12: {
            type: 'text',
            content: `Um... son can't you see I'm busy, he he.`
        },
        info13: {
            type: 'text',
            content: `How can you play it if it doesn't exist?`
        },
        info14: {
            type: 'text',
            content: `Ok... I'll set it up for you.`
        },
        info15: {
            type: 'text',
            content: `So, the cat is out of the bag. We do have a demo, but only for certain people, but it will be released to the public later on.`
        },
        info16: {
            type: 'text',
            content: `What this version is a more optimized version of the first demo, with the office background.`
        },
        info17: {
            type: 'text',
            content: `Anyways, here it is!`
        },
    },
    reactiondoge: {
        intro: {
            type: 'text-end',
            content: 'Hope you enjoy the demo! This was made by CodingAP, zinnyboy, and BamBamBamoozel.'
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