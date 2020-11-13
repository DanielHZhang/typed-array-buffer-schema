import {
  Model,
  int8,
  uint8,
  int16,
  uint16,
  int32,
  uint32,
  int64,
  uint64,
  float32,
  float64,
  string8,
  string16,
} from '../src/index';
import {Schema} from '../src/schema';

describe('TypedArrayView', () => {
  type Player = typeof snap['players'][number];
  const playerSchema = new Schema<Player>('player', {
    a: int8,
    b: uint8,
    c: int16,
    d: uint16,
    e: int32,
    f: uint32,
    g: int64,
    h: uint64,
    i: float32,
    j: float64,
    k: string8,
    kk: {type: string8, length: 24},
    l: string16,
  });

  type Snapshot = {players: Player[]};
  const snapshotModel = Model.fromSchemaDefinition<Snapshot>('snapshot', {
    players: [playerSchema],
  });

  const now = new Date().getTime();
  const snap = {
    players: [
      {
        a: 10,
        b: 10,
        c: 50,
        d: 50,
        e: 100,
        f: 100,
        g: now,
        h: now,
        i: 1.123456,
        j: 1.123456789,
        k: 'This line is too long.',
        kk: 'This line is too long.',
        l: 'Эта строка слишком длинная.',
      },
    ],
  };

  let buffer: ArrayBuffer;
  let data = snap;

  it('Should serialize and deserialize with all view types', () => {
    buffer = snapshotModel.toBuffer(data);
    data = snapshotModel.fromBuffer(buffer);

    console.log('data:', data);

    expect(data.players[0].g).toBe(now);
    expect(data.players[0].h).toBe(now);
    expect(data.players[0].k).toBe('This line is');
    expect(data.players[0].kk.trim()).toBe('This line is too long.');
    expect(data.players[0].l).toBe('Эта строка с');
  });
});
