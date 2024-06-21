ServerEvents.recipes(event => {
    let create = event.recipes.create

    //NoteItem母体
    create.mixing(
        '16x kubejs:note_item',  
        [
            '16x minecraft:paper',
            'minecraft:cyan_dye',
            'minecraft:magenta_dye', 
            'minecraft:yellow_dye', 
            'minecraft:black_dye', 
        ]
    )

    //NoteItem子物品
    for (let id = 0; id <= 37; id++){
        event.stonecutting('kubejs:note_item_' + id, 'kubejs:note_item')
    }

    //传 统 艺 能
    create.mechanical_crafting(
        'kubejs:missingno', 
        [
            'A   B', 
            '     ', 
            '     ', 
            '     ', 
            'C   D'
        ], {
            A: 'kubejs:note_item_1', 
            B: 'kubejs:note_item_13', 
            C: 'kubejs:note_item_25', 
            D: 'kubejs:note_item_37',
        }
    )

    create.mixing(
        '16x kubejs:number_gesture',
        [
            '16x minecraft:paper',
            'minecraft:bone',
            'minecraft:leather',
        ]
    )

    for (let id = 0; id < 32; id ++){
        event.stonecutting('kubejs:number_gesture_' + id, 'kubejs:number_gesture')
    }

})