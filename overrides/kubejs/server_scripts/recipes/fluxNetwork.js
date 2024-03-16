ServerEvents.recipes(event => {

    event.remove({output:'fluxnetworks:flux_core'})
    event.remove({output:'fluxnetworks:flux_block'})

    event.shaped(Item.of('fluxnetworks:flux_core',4),[
        'DOD',
        'OSO',
        'DOD'
    ],{
        D:'fluxnetworks:flux_dust',
        O:'minecraft:obsidian',
        S:'ae2:singularity'
    })

    event.shaped(Item.of('fluxnetworks:flux_block'),[
        'DCD',
        'CTC',
        'DCD'
    ],{
        D:'fluxnetworks:flux_dust',
        C:'fluxnetworks:flux_core',
        T:'mekanism:teleportation_core'
    })

})