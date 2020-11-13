import {Model, uint8, int16, uint16} from '../src/index';

describe('simple test', () => {
  const playerSchema = Model.schema('player', {
    id: uint8,
  });

  const botSchema = Model.schema('bot', {
    id: uint8,
  });

  const carSchema = Model.schema('car', {
    id: uint8,
  });

  const snapshotSchema = Model.schema('snapshot', {
    time: uint16,
    data: {
      emptyArr: [playerSchema],
      emptyObj: botSchema,
      superCar: carSchema,
    },
  });

  const SnapshotModel = new Model(snapshotSchema);

  const snap = {
    data: {
      emptyArr: [],
      emptyObj: {},
      superCar: {
        id: 911,
      },
    },
  };

  test('empty arrays and empty object are omitted', () => {
    const buffer = SnapshotModel.toBuffer(snap);

    const dataL = JSON.stringify(SnapshotModel.fromBuffer(buffer)).length;
    const snapL = JSON.stringify(snap).length;
    const emptiesL = '"emptyArr":[],"emptyObj":{},'.length;

    expect(dataL).toBe(snapL - emptiesL);
  });
});
