(() => {
  BlockEvents.rightClicked(event => {
    if(event.block.getId() == "twilightforest:uncrafting_table"){
      event.cancel();
    }
  })
  ServerEvents.tick(event => {
    const server = event.server
    const players = server.getPlayerList().getPlayers()
    for(let player of players) {
      let level = player.getLevel()
      let coord = [ player.getX(), player.getY(), player.getZ() ]
      if(coord[1] - Math.floor(coord[1]) >= 0.5) {
        continue
      }
      let blockpos = [ Math.floor(coord[0]), Math.floor(coord[1]), Math.floor(coord[2]) ]
      let block = level.getBlock(blockpos[0], blockpos[1] - 1, blockpos[2])
      if(block.getId() != 'twilightforest:uncrafting_table') {
        continue
      }
      let jumpboostEffect = player.getEffect('minecraft:jump_boost')
      if(jumpboostEffect && jumpboostEffect.duration >= 10) {
        continue
      }
      player.unlockAdvancement('twilightforest:uncraft_uncrafting_table');
      server.runCommandSilent('effect give ' + player.username + ' minecraft:jump_boost 1 63 false')
    }
  })
})()
