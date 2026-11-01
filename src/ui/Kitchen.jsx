import { useGameCtx } from '../game/useGame';
import { Modal, Btn, Icon, Bar, fmtTime } from './common';
import { ItemArt } from '../art/ItemArt';
import { item } from '../game/items';
import { RECIPES, recipe, masteryOf, nextMastery, rushCost } from '../game/kitchen';
import { startCook, collectCook, rushCook, findIngredients } from '../game/engine';
import { useNow } from './TopBar';
import { sfx } from '../game/audio';

function Dish({ r, big }) {
  return (
    <span className={`dish ${big ? 'big' : ''}`} style={{ '--tint': r.tint }}>
      <span className="dish-plate" />
      <span className="dish-food">
        <ItemArt id={r.plate} />
      </span>
    </span>
  );
}

export function kitchenReady(state, now = Date.now()) {
  const slot = state.kitchen?.slot;
  return !!slot && slot.done <= now;
}

export function KitchenModal({ onClose }) {
  const { state, act } = useGameCtx();
  const now = useNow();
  const k = state.kitchen || { slot: null, mastery: {} };
  const cur = k.slot ? recipe(k.slot.id) : null;
  const left = k.slot ? Math.max(0, k.slot.done - now) : 0;
  return (
    <Modal title="Dapur Resep" onClose={onClose} className="kitchen">
      <div className={`oven ${cur ? (left > 0 ? 'baking' : 'ready') : 'empty'}`}>
        <div className="oven-window">
          {cur ? <Dish r={cur} big /> : <span className="oven-empty">Oven kosong</span>}
          {cur && left > 0 && <span className="oven-glow" />}
        </div>
        <div className="oven-side">
          {cur ? (
            <>
              <b>{cur.name}</b>
              {left > 0 ? (
                <>
                  <Bar value={cur.time - left} max={cur.time} />
                  <small>Matang dalam {fmtTime(left)}</small>
                  <Btn small color="purple" onClick={() => act(rushCook)}>
                    Percepat <Icon name="gem" size={14} />
                    {rushCost(left)}
                  </Btn>
                </>
              ) : (
                <Btn color="green" onClick={() => (act(collectCook), sfx('task'))}>
                  Sajikan!
                </Btn>
              )}
            </>
          ) : (
            <small>Pilih resep di bawah. Bahan diambil dari papan atau gudang.</small>
          )}
        </div>
      </div>
      <div className="recipe-list">
        {RECIPES.map((r) => {
          const locked = state.level < r.level;
          const src = findIngredients(state, r.needs);
          const ok = src.every(Boolean);
          const count = k.mastery[r.id] || 0;
          const m = masteryOf(count);
          const nm = nextMastery(count);
          return (
            <div key={r.id} className={`recipe ${locked ? 'locked' : ''}`}>
              <Dish r={r} />
              <div className="recipe-main">
                <b>{locked ? '???' : r.name}</b>
                <div className="recipe-needs">
                  {r.needs.map((id, i) => (
                    <span key={i} className={`need ${src[i] ? 'have' : ''}`} title={item(id).name}>
                      <ItemArt id={id} />
                      {src[i] && <Icon name="check" size={13} className="order-check" />}
                    </span>
                  ))}
                </div>
                <small className="recipe-meta">
                  <Icon name="coin" size={13} />
                  {Math.round(r.coins * (1 + m.bonus))} · <Icon name="xp" size={13} />
                  {r.xp} · {fmtTime(r.time)}
                  {!locked && (
                    <span className={`rank rank-${m.name}`}>
                      {m.name}
                      {nm ? ` ${count}/${nm.at}` : ''}
                    </span>
                  )}
                </small>
              </div>
              {locked ? (
                <span className="recipe-lock">
                  <Icon name="lock" size={20} />
                  Lv {r.level}
                </span>
              ) : (
                <Btn small color={ok && !k.slot ? 'orange' : 'grey'} disabled={!ok || !!k.slot} onClick={() => (act(startCook, r.id), sfx('spawn'))}>
                  Masak
                </Btn>
              )}
            </div>
          );
        })}
      </div>
      <p className="muted center small">Masak resep yang sama berulang kali untuk naik peringkat dan bonus koin (hingga +50%).</p>
    </Modal>
  );
}
