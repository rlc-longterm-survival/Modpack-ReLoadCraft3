// tl;dr - MIMI quantum-entangles with AE2, making the Broadcaster a global update disabler.
(() => {
  ServerEvents.recipes(event => {
    event.remove({ output: 'mimi:broadcaster' })
  })

  BlockEvents.rightClicked(event => {
    if(event.block.getId() != "mimi:broadcaster"){
      return
    }
    let { player, block, server } = event
    block.getLevel().setBlockAndUpdate(block.pos, Blocks.AIR.blockStates[0])
    event.cancel()
  })
})()
