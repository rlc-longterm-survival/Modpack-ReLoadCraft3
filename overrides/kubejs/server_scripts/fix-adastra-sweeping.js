// tl;dr - You can dupe a block-boosted Ad Astra machine by mining it.
;(() => {
  BlockEvents.broken(evt => {
    let { server, block, level, player } = evt
    let pos = block.pos
    let blockId = block.id
    let hasEntity = !!block.getEntity()

    if(!(blockId.startsWith('ad_astra:') && hasEntity)) {
      return
    }
    
    function isBlockBooster(pos) {
      let block = level.getBlock(pos)
      let id = block.id
      if(id.startsWith('blockbooster:booster_')) {
        return true
      }
      return false
    }
    let isNearBlockBooster = (
      isBlockBooster(pos.above()) ||
      isBlockBooster(pos.below()) ||
      isBlockBooster(pos.east()) ||
      isBlockBooster(pos.west()) ||
      isBlockBooster(pos.south()) ||
      isBlockBooster(pos.north())
    )
    if(!isNearBlockBooster) {
      return
    }

    block
      .createExplosion()
      .causesFire(false)
      .explosionMode('none')
      .strength(0)
      .explode()

    evt.cancel()
  })
})()
