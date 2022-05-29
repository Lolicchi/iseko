import { Iseko } from '../../lib/mod.ts'

export class WebSocketClientPlugin {
  nickname: string

  constructor(nickname: string) {
    this.nickname = nickname
  }

  connect(url: string) {
    return new Promise<{
      nickname: string
      init(client: Iseko): void
      register(): { disconnect: () => void }
    }>((resolve, reject) => {
      const ws = new WebSocket(url)

      ws.onopen = () => {
        console.log('Log { x: Connected }')

        resolve({
          nickname: this.nickname,
          init(_client) {
            ws.onmessage = ({ data }) => {
              if (data == 'registered') {
                console.log('Log { x: Registered }')
              }
            }

            ws.send(
              JSON.stringify({
                x: 'register'
              })
            )

            return {
              disconnect(code?: number) {
                ws.close(code)
              }
            }
          },
          register() {
            ws.onmessage = ({ data }) => {
              if (data == 'registered') {
                console.log('Log { x: Registered }')
              }
            }

            ws.send(
              JSON.stringify({
                x: 'register'
              })
            )

            return {
              disconnect(code?: number) {
                ws.close(code)
              }
            }
          }
        })
      }

      ws.onclose = ({ code, reason }) =>
        reject(`Err { code: ${code}, reason: '${reason}' }`)
    })
  }
}

// new WebSocketClientPlugin('main bot')
//   .connect('wss://wscp.iseko.repl.co/')
//   .then(socket => socket.register())
//   .catch(console.log)
