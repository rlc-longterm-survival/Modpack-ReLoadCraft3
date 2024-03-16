ServerEvents.recipes(event => {

    event.remove({output:'naturescompass:naturescompass'})

    event.shaped(Item.of('naturescompass:naturescompass'),[
        'TAL',
        'BCD',
        'LET'
    ],{
        T:'#minecraft:saplings',
        L:'#minecraft:leaves',
        A:'immersiveengineering:component_electronic',
        B:'botania:monocle',
        D:'mekanism:energy_tablet',
        E:'create:precision_mechanism',
        C:'minecraft:compass'
    })
  
})