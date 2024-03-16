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

BlockEvents.rightClicked(evt => {
  let { player, block, server } = evt

  if(block.getId() != 'chessmod:chess_piece') {
    return
  }

  if(!player.isShiftKeyDown() || !player.mainHandItem.isEmpty()) {
    return
  }

  function getPieceName(piece, color) {
    let pieceNames = [ "Pawn", "Knight", "Bishop", "Rook", "King", "Queen", "Checkers Piece", "Checkers King Piece" ]
    let colorNames = [ "", "White", "Light Gray", "Gray", "Black", "Brown", "Red", "Orange", "Yellow", "Lime", "Green", "Cyan", "Light Blue", "Blue", "Purple", "Magenta", "Pink" ]
    if (colorNames[color] == "") {
        return pieceNames[piece];
    }
    return colorNames[color] + " " + pieceNames[piece];
  }

  let props = block.properties
  let dyeTag = +props.get('dye')
  let pieceTag = +props.get('piece')
  let givingStuff = Item.of('chessmod:chess_piece').withNBT({
    dye: NBT.intTag(dyeTag),
    piece: NBT.intTag(pieceTag),
    display: { Name: '{"text":"' + getPieceName(pieceTag, dyeTag) + '"}' }
  })
  player.give(givingStuff)
})
