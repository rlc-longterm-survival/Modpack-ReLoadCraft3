(() => {
  // Prevent dropping board or piece in Creative Mode
  BlockEvents.broken(evt => {
    let { player, block } = evt

    if(block.getId() != 'chessmod:chess_piece' && block.getId() != 'chessmod:board_block') {
      return
    }

    if(player.isCreative()) {
      block.getLevel().setBlockAndUpdate(block.pos, Blocks.AIR.blockStates[0])
      evt.cancel()
    }
  })

  function getPieceName(piece, color) {
    let pieceNames = [ "Pawn", "Knight", "Bishop", "Rook", "King", "Queen", "Checkers Piece", "Checkers King Piece" ]
    let colorNames = [ "", "White", "Light Gray", "Gray", "Black", "Brown", "Red", "Orange", "Yellow", "Lime", "Green", "Cyan", "Light Blue", "Blue", "Purple", "Magenta", "Pink" ]
    if (colorNames[color] == "") {
        return pieceNames[piece];
    }
    return colorNames[color] + " " + pieceNames[piece];
  }

  // Swap a piece by right clicking.
  BlockEvents.rightClicked(evt => {
    let { player, block, server } = evt

    if(block.getId() != 'chessmod:chess_piece') {
      return
    }
    if(player.isShiftKeyDown() || player.mainHandItem.id != 'chessmod:chess_piece' || !player.offHandItem.isEmpty()) {
      return
    }

    let props = block.properties
    let dyeTag = +props.get('dye')
    let pieceTag = +props.get('piece')
    let givingStuff = Item.of('chessmod:chess_piece').withNBT({
      dye: NBT.intTag(dyeTag),
      piece: NBT.intTag(pieceTag),
      display: { Name: '{"text":"' + getPieceName(pieceTag, dyeTag) + '"}' }
    })

    block.getLevel().setBlockAndUpdate(block.pos, Blocks.AIR.blockStates[0]) // clear the old piece
    player.getMainHandItem().useOn(new (Java.loadClass('net.minecraft.world.item.context.UseOnContext'))(
      player, Java.loadClass('net.minecraft.world.InteractionHand').MAIN_HAND,
      new (Java.loadClass('net.minecraft.world.phys.BlockHitResult'))(
        player.pos,
        Java.loadClass('net.minecraft.core.Direction').UP,
        block.pos,
        false
      )
    )) // place the player's item

    player.setMainHandItem(givingStuff)

    evt.cancel()
  })

  // Pick a piece by shift-right clicking.
  BlockEvents.rightClicked(evt => {
    let { player, block, server } = evt

    if(block.getId() != 'chessmod:chess_piece') {
      return
    }

    if(!player.isShiftKeyDown() || !player.mainHandItem.isEmpty() || !player.offhandItem.isEmpty()) {
      return
    }

    let props = block.properties
    let dyeTag = +props.get('dye')
    let pieceTag = +props.get('piece')
    let givingStuff = Item.of('chessmod:chess_piece').withNBT({
      dye: NBT.intTag(dyeTag),
      piece: NBT.intTag(pieceTag),
      display: { Name: '{"text":"' + getPieceName(pieceTag, dyeTag) + '"}' }
    })
    block.getLevel().setBlockAndUpdate(block.pos, Blocks.AIR.blockStates[0])
    player.setMainHandItem(givingStuff)
  })
})()
