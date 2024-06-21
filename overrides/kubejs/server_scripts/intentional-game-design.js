(() => {
	let $DamageSources = Java.loadClass('net.minecraft.world.damagesource.DamageSources')
  let dSource = Utils.lazy(() => new $DamageSources(Utils.server.registryAccess()))
  ItemEvents.pickedUp(event => {
		let player = event.player
    let entity = event.entity
		let itemEntity = event.getItemEntity()

    if(event.item.id != 'kubejs:missingno') {
      return
    }

    if(!player.isCreative()) {
      entity.attack(dSource.get().magic(), 20190816170251.0)
    }
    event.getLevel().getBlock(itemEntity.x - 1, itemEntity.y, itemEntity.z - 1)
      .createExplosion()
      .causesFire(true)
      .explosionMode('block')
      .strength(6)
      .explode()
	})
})()
