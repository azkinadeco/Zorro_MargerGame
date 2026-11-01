import { useState } from 'react';
import { useGameCtx } from '../game/useGame';
import { Modal, Btn, Price } from './common';
import { CatFigure, CostumeIcon } from '../art/CostumeArt';
import { COSTUMES, SLOTS } from '../game/costumes';
import { RESIDENTS } from '../game/areas';
import { buyCostume, equipCostume } from '../game/engine';
import { sfx } from '../game/audio';

export function WardrobeModal({ onClose }) {
  const { state, act } = useGameCtx();
  const cats = state.residents.filter((c) => RESIDENTS[c]);
  const [cat, setCat] = useState(cats[0]);
  const [slot, setSlot] = useState('hat');
  const wr = state.wardrobe || { owned: [], outfit: {} };
  const outfit = wr.outfit[cat] || {};
  return (
    <Modal title="Lemari Kostum" onClose={onClose} className="wardrobe">
      <div className="tabs">
        {cats.map((c) => (
          <button type="button" key={c} className={`tab ${c === cat ? 'on' : ''}`} onClick={() => (sfx('meow'), setCat(c))}>
            {RESIDENTS[c].name}
          </button>
        ))}
      </div>
      <div className="wardrobe-stage">
        <CatFigure cat={cat} outfit={outfit} className={`stage-${cat}`} key={cat + JSON.stringify(outfit)} />
      </div>
      <div className="tabs slot-tabs">
        {SLOTS.map((sl) => (
          <button type="button" key={sl.key} className={`tab ${sl.key === slot ? 'on' : ''}`} onClick={() => (sfx('tap'), setSlot(sl.key))}>
            {sl.name}
          </button>
        ))}
      </div>
      <div className="costume-grid">
        {COSTUMES.filter((c) => c.slot === slot).map((c) => {
          const owned = wr.owned.includes(c.id);
          const worn = outfit[c.slot] === c.id;
          return (
            <div key={c.id} className={`costume-tile ${worn ? 'worn' : ''}`}>
              <div className="costume-art">
                <CostumeIcon slot={c.slot} id={c.id} />
              </div>
              <b>{c.name}</b>
              {owned ? (
                <Btn small color={worn ? 'grey' : 'pink'} onClick={() => act(equipCostume, cat, c.id)}>
                  {worn ? 'Lepas' : 'Pakai'}
                </Btn>
              ) : (
                <Btn small color={c.price.gems ? 'purple' : 'orange'} onClick={() => act(buyCostume, c.id) && act(equipCostume, cat, c.id)}>
                  <Price {...c.price} />
                </Btn>
              )}
            </div>
          );
        })}
      </div>
      <p className="muted center small">Kostum yang dibeli bisa dipakai semua kucing dan terlihat di kafe.</p>
    </Modal>
  );
}
