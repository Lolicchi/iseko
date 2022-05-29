import { serve } from 'https://deno.land/std@0.132.0/http/server.ts'

export class WebSocketServerPlugin {
  private log = `Log { x: Deno Server ${Deno.pid}, at: unknown port }`

  private registeredWebsockets: WebSocket[] = []

  constructor() {}

  serve({
    res,
    port,
    noWebsocketResponse = [null, { status: 501 }]
  }: {
    res?: string
    port?: number
    noWebsocketResponse?: ConstructorParameters<typeof Response>
  } = {}) {
    port || (port = 8080)
    serve(
      req => {
        if (req.headers.get('upgrade') != 'websocket') {
          console.log('Err { x: Http request }')
          return new Response(...noWebsocketResponse)
        }
        // console.log(req)

        console.log('Log { x: Upgrading, o: socket ( assigning: "uuid" ) }')

        const { socket, response } = Deno.upgradeWebSocket(req)

        const registerTimeout = setTimeout(
          () => socket.close(1003, 'u took too long to register'),
          10000
        )

        socket.onopen = () => {
          console.log('Log { x: Upgraded, o: socket ( assigned: uuid ) }')
        }

        socket.onmessage = ({ data }) => {
          try {
            const { x }: { x: 'register' } = JSON.parse(data)

            if (x != 'register') {
              console.log(
                'Err {\n  x: Unauthorized, o: u need to register in order to make requests,\n  _: Closing\n}'
              )

              return socket.close(
                1003,
                'u need to register in order to make requests'
              )
            }

            console.log('Log { x: Registered, o: socket ( uuid: 0069 ) }')

            clearTimeout(registerTimeout)

            this.registeredWebsockets.push(socket)

            socket.onmessage = () => {
              console.log('hi')
            }

            return
          } catch {
            console.log('Err { x: Closing, e: Invalid form body. }')
            socket.close(1003, 'invalid form body')
          }
        }

        // console.log(response)
        return response
      },
      { port }
    ).catch(console.log)

    this.log = `Log { x: Deno Server ${Deno.pid}, o: listening at port ${port}. }`

    console.log(res || this.log)

    return this.registeredWebsockets
  }
}
