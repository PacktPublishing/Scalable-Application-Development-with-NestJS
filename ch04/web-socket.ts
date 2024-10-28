import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("message")
  handleMessage(client: any, payload: any): string {
    return "Hello world!";
  }

  @SubscribeMessage("joinRoom")
  handleRoomJoin(client: any, room: string) {
    client.join(room);
    client.emit("joinedRoom", room);
  }

  @SubscribeMessage("leaveRoom")
  handleRoomLeave(client: any, room: string) {
    client.leave(room);
    client.emit("leftRoom", room);
  }

  @SubscribeMessage("authenticate")
  handleAuthentication(client: any, token: string) {
    try {
      // Logic to validate the token
      const user = validateToken(token);
      client.user = user;
      client.emit("authenticated");
    } catch (e) {
      client.error("Authentication failed");
    }
  }
}
