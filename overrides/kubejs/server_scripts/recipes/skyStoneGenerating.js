ServerEvents.recipes(event => {

    event.recipes.create.crushing([
        'ae2:sky_dust',
        Item.of('ae2:sky_stone_block').withChance(0.5)
    ],[
        'ae2:sky_stone_block'
    ])
    
})