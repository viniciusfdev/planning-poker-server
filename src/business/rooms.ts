import { nanoid } from 'nanoid';
import Memory from '../common/memory';
import { Room } from '../types/room.type';

export default class Rooms {
  /** Creates a room and assigns the owner */
  static create(name: string, admin: string, adminName: string): Room {
    const room: Room = {
      id: nanoid(16),
      createdAt: new Date(),
      members: { [admin]: adminName },
      status: 'idle',
      votes: {},
      admin,
      name,
    };

    Memory.set(room.id, room);
    return room;
  }

  /** Returns a room. */
  static retrieve(roomId: string): Room {
    const room = Memory.get<Room>(roomId);

    if (room == null) {
      throw Error(`The room /${roomId}/ expires or don't exists.`);
    }

    return room;
  }

  /**
   * Update any aspect of a room
   */
  static update(roomId: string, roomUpdate: Partial<Room>): Room {
    const room = Rooms.retrieve(roomId);
    Object.assign(room, roomUpdate);
    Memory.set(roomId, room);
    return room;
  }

  /**
   * Join a member in the given room.
   */
  static enter(roomId: string, member: string, memberName: string): Room {
    const room = Rooms.retrieve(roomId);
    room.members[member] = memberName;
    Memory.set(roomId, room);
    return room;
  }

  /**
   * Remove a member from the given room.
   */
  static leave(roomId: string, member: string): Room {
    const room = Rooms.retrieve(roomId);
    if (room.votes) delete room.votes[member];
    delete room.members[member];
    Memory.set(roomId, room);
    return room;
  }

  /**
   * Set the current room vote value for a member.
   */
  static vote(roomId: string, member: string, vote: number): Room {
    const room = Rooms.retrieve(roomId);

    if (room.votes != null) {
      room.votes[member] = vote;
    } else {
      room.votes = { [member]: vote };
    }

    Memory.set(roomId, room);
    return room;
  }

  static delete(roomId: string): string {
    Memory.delete(roomId);
    return roomId;
  }
}
