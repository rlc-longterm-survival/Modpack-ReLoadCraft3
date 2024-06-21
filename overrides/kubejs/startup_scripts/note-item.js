StartupEvents.registry("item",event =>{

    //注册NoteItem母体
    event
    .create('note_item')
    .texture("note_item:item/note_item")
    .displayName('Note Item')
    .rarity('uncommon')

    //注册NoteItem子物品
    let defaultName = [
        'C0', '♯C0/♭D0', 'D0',
        '♯D0/♭E0', 'E0', 'F0',
        '♯F0/♭G0', 'G0', '♯G0/♭A0',
        'A0', '♯A0/♭B0', 'B0']
    let Name = ['Rest']
    for (let id = 0; id < 37; id++){
        Name.push(defaultName[(id + 6)%12].replace(
            /0/g, '' + (Math.floor((id + 6)/12) + 2)
        ))
    }

    let noteitem = (id, name) =>{
        event
        .create('note_item_' + id)
        .texture("note_item:item/note_item_" + id)
        .displayName('Note Item ' + id + ': ' + name)
        .rarity('common')
        .unstackable()
    }
    for (let id = 0; id <=37; id++){
        noteitem('' + id, Name[id])
    }

    //注册传 统 艺 能
    event
    .create('missingno')
    .texture("note_item:item/missingno")
    .displayName('∄')
    .rarity('epic')
    .glow(true)

    //注册指挥手势母体
    event
    .create('number_gesture')
    .texture("note_item:item/number_gesture")
    .displayName('Number Gesture Null')
    .rarity('uncommon')

    //注册指挥手势子物品
    for (let id = 0; id <32; id++){
        event
        .create('number_gesture_' + id)
        .texture("note_item:item/number_gesture_" + id)
        .displayName('Number Gesture ' + id)
        .rarity('common')
        .unstackable()
    }

})