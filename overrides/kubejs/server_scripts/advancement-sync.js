(() => {
  let tickCount = 0
  let tickInterval = 10

  let updateTick = () => {
    tickCount = (tickCount + 1) % tickInterval
    return tickCount
  }

  let init = false
  let advancementList = []
  let gainedAdvancements = {}

  ServerEvents.tick(event => {
    updateTick()
  })

  // ===== 获取进度列表 =====
  ServerEvents.tick(event => {
    if(init) {
      return
    }
    const server = event.server
    const advancementManager = server.getAdvancements()
    const advancements = advancementManager.getAllAdvancements()
    advancementList = []
    for(let item of advancements) {
      if(item.display) {
        advancementList.push(item.id)
      }
    }
    init = true
  })

  // ===== 扫描已获取进度 =====
  ServerEvents.tick(event => {
    if(tickCount != 0 || !init) {
      return
    }
    const server = event.server
    const players = server.getPlayerList()
    for(let player of players.getPlayers()) {
      for(let id of advancementList) {
        if(player.isAdvancementDone(id)) {
          if(!gainedAdvancements[id]) {
            gainedAdvancements[id] = true
          }
        }
      }
    }
  })

  // ===== 将进度赋予玩家 =====
  ServerEvents.tick(event => {
    if(tickCount == 6) {
      event.server.runCommandSilent('gamerule announceAdvancements true')
    }
    if(tickCount != 5 || !init) {
      return
    }
    const server = event.server
    const players = server.getPlayerList().getPlayers()
    let isGranted = false
    for(let player of players) {
      for(let id of advancementList) {
        if(gainedAdvancements[id] && !player.isAdvancementDone(id)) {
          if(!isGranted) {
            server.runCommandSilent('gamerule announceAdvancements false')
          }
          isGranted = true
          player.unlockAdvancement(id)
        }
      }
    }
  })

  ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event
    event.register(
      Commands
      .literal('advancement-sync')
      .then(
        Commands.literal('count')
        .executes(ctx => {
          if(!init) {
            return 0
          }
          const player = ctx.source.player
          let gainedCnt = 0
          for(let id in gainedAdvancements) {
            gainedCnt += 1
          }
          if(player) {
            player.tell('Gained ' + gainedCnt + '/' + advancementList.length + ' advancements')
          }
          return 1
        })
      )
      .then(
        Commands.literal('revoke')
        .requires(src => src.hasPermission(2))
        .then(
          Commands.literal('everything')
          .executes(ctx => {
            if(!init) {
              return 0
            }
            const player = ctx.source.player
            const server = ctx.source.server
            const players = server.getPlayerList().getPlayers()
            player.tell('Revoked all advancements for everyone.')
            for(const id of advancementList) {
              for(const player1 of players) {
                player1.revokeAdvancement(id)
              }
              delete gainedAdvancements[id]
            }
            return 1
          })
        )
        .then(
          Commands.literal('only')
          .then(
            Commands.argument('advancement', Arguments.GREEDY_STRING.create(event))
            .executes(ctx => {
              if(!init) {
                return 0
              }
              const player = ctx.source.player
              const server = ctx.source.server
              const players = server.getPlayerList().getPlayers()
              const id = Arguments.GREEDY_STRING.getResult(ctx, 'advancement')
              if(advancementList.indexOf(id) != -1) {
                player.tell('Revoked advancement ' + id + ' for everyone.')
                for(const player1 of players) {
                  player1.revokeAdvancement(id)
                }
                delete gainedAdvancements[id]
              } else {
                player.tell('Failed to revoke - no such advancement.')
              }
              return 1
            })
          )
        )
      )
    )
  })
})()
