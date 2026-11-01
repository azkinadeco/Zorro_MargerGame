import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { COLS, ROWS } from '../game/config';
import { item, nextId } from '../game/items';
import { useGameCtx } from '../game/useGame';
import { spawn, move, collect, sell, unsell, store, freeWeb, webCost, popBubble, bubbleCost, findOrderItems, serve, placeGift, canMerge, canTool, swapOrder, SWAP_COST } from '../game/engine';
import { fmtTime } from './common';
import { festClaimable, FEST_LEVEL } from '../game/meta';
import { recipe } from '../game/kitchen';
import { NinaHelper } from './Nina';
import { ItemArt, BoxArt, WebArt } from '../art/ItemArt';
import { CatArt } from '../art/CatArt';
import { CUSTOMERS } from '../game/config';
import { Icon, Btn } from './common';
import { sfx, vibrate } from '../game/audio';
import { useNow } from './TopBar';

// uids that already played their entrance animation
const seen = new Set();
const pendingFrom = new Map();
export function markAllSeen(board) {
  board.forEach((c) => c && seen.add(c.uid));
}

// ------------------------------------------------------------------ orders
function OrderCard({ order, board, onServe, onSwap, canSwap, highlight, now }) {
  const [confirm, setConfirm] = useState(false);
  const cat = CUSTOMERS.find((c) => c.id === order.cat);
  const ready = useMemo(() => !!findOrderItems(board, order), [board, order]);
  // per-item availability (respecting duplicates)
  const have = useMemo(() => {
    const counts = {};
    board.forEach((c) => {
      if (c && !c.st && !c.bubble) counts[c.id] = (counts[c.id] || 0) + 1;
    });
    return order.items.map((id) => {
      if (counts[id] > 0) {
        counts[id]--;
        return true;
      }
      return false;
    });
  }, [board, order]);
  return (
    <div className={`order ${ready ? 'ready' : ''} ${order.vip ? 'vip' : ''}`} data-order={order.uid}>
      {order.vip && (
        <div className="vip-crown">
          <Icon name="crown" size={22} />
        </div>
      )}
      {canSwap && !ready && (
        <button type="button" className="order-x" aria-label="Ganti pesanan" onClick={() => (sfx('tap'), setConfirm(true))}>
          <Icon name="swap" size={14} />
        </button>
      )}
      {confirm && (
        <div className="order-confirm">
          <span>Ganti pesanan?</span>
          <Btn small color="purple" onClick={() => (setConfirm(false), onSwap(order.uid))}>
            <Icon name="gem" size={14} />
            {SWAP_COST}
          </Btn>
          <button type="button" className="order-confirm-no" onClick={() => setConfirm(false)}>
            Batal
          </button>
        </div>
      )}
      <div className="order-cat">
        <CatArt id={order.cat} mood={ready ? 'happy' : 'wait'} />
      </div>
      <div className="order-name">{order.vip ? <span className="vip-time">VIP · {fmtTime(Math.max(0, order.vip - now))}</span> : cat?.name}</div>
      <div className={`order-items n${order.items.length}`}>
        {order.items.map((id, i) => (
          <div key={i} className={`order-item ${have[i] ? 'have' : ''}`} title={item(id).name}>
            <ItemArt id={id} />
            {have[i] && <Icon name="check" size={16} className="order-check" />}
          </div>
        ))}
      </div>
      {ready ? (
        <Btn small color="green" className="order-serve" data-tut={highlight ? 'serve' : undefined} onClick={() => onServe(order.uid)}>
          Sajikan
        </Btn>
      ) : (
        <div className="order-reward">
          <span>
            <Icon name="coin" size={15} />
            {order.coins}
          </span>
          <span>
            <Icon name="xp" size={15} />
            {order.xp}
          </span>
          {order.gems ? (
            <span>
              <Icon name="gem" size={15} />
              {order.gems}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}

function OrdersBar({ board, orders, onServe, onSwap, canSwap }) {
  const hasVip = orders.some((o) => o.vip);
  const now = useNow(hasVip ? 1000 : 60000);
  return (
    <div className={`orders n${orders.length}`}>
      {orders.map((o, i) => (
        <OrderCard key={o.uid} order={o} board={board} onServe={onServe} onSwap={onSwap} canSwap={canSwap} highlight={i === 0} now={now} />
      ))}
    </div>
  );
}

// -------------------------------------------------------------------- cell
function findPair(board) {
  const firstFree = {};
  for (let i = 0; i < board.length; i++) {
    const c = board[i];
    if (!c || c.st || c.bubble || !nextId(c.id)) continue;
    if (firstFree[c.id] !== undefined) return [firstFree[c.id], i];
    firstFree[c.id] = i;
  }
  for (let i = 0; i < board.length; i++) {
    const c = board[i];
    if (c?.st === 'web' && firstFree[c.id] !== undefined && nextId(c.id)) return [firstFree[c.id], i];
  }
  return null;
}

const ItemView = memo(function ItemView({ cell, index, cellSize, selected, hidden, match, wanted, now, hinted }) {
  const it = item(cell.id);
  const [anim] = useState(() => {
    if (seen.has(cell.uid) && !pendingFrom.has(cell.uid)) return null;
    seen.add(cell.uid);
    const from = pendingFrom.has(cell.uid) ? pendingFrom.get(cell.uid) : cell.from;
    pendingFrom.delete(cell.uid);
    if (from !== undefined && from !== null && from !== index) {
      const dx = ((from % COLS) - (index % COLS)) * cellSize;
      const dy = (Math.floor(from / COLS) - Math.floor(index / COLS)) * cellSize;
      return { cls: 'fly-in', style: { '--dx': `${dx}px`, '--dy': `${dy}px` } };
    }
    if (cell.merged || cell.pop) return { cls: 'pop-in' };
    return null;
  });
  const cls = ['item', `k-${it.kind}`, anim?.cls, selected && 'sel', hidden && 'ghosted', match && 'match', hinted && 'hint', cell.st === 'web' && 'webbed', cell.bubble && 'bubbled'].filter(Boolean).join(' ');
  const bubbleLeft = cell.bubble ? Math.max(0, cell.bubble - now) : 0;
  return (
    <div className={cls} style={anim?.style}>
      <div className="item-art">
        <ItemArt id={cell.id} />
      </div>
      {it.kind === 'gen' && (
        <div className="gen-lv">
          {Array.from({ length: it.tier }, (_, i) => (
            <Icon key={i} name="star" size={11} />
          ))}
        </div>
      )}
      {it.kind === 'gen' && <div className="gen-glow" />}
      {cell.st === 'web' && (
        <div className="web-over">
          <WebArt />
        </div>
      )}
      {cell.bubble && (
        <div className="bubble-over">
          <svg viewBox="0 0 36 36" className="bubble-ring">
            <circle cx="18" cy="18" r="16" fill="none" stroke="#fff" strokeWidth="2.5" strokeDasharray={`${(bubbleLeft / 60000) * 100} 100`} pathLength="100" />
          </svg>
        </div>
      )}
      {wanted && !cell.st && !cell.bubble && <Icon name="check" size={16} className="wanted" />}
      {it.kind === 'chest' && cell.left ? <span className="chest-left">{cell.left}</span> : null}
    </div>
  );
});

// ------------------------------------------------------------------- board
function Board({ state, act, gameRef, selected, setSelected, cellSize, tut }) {
  const boardRef = useRef(null);
  const dragRef = useRef(null);
  const [drag, setDrag] = useState(null);
  const now = useNow(500);
  const lastTouch = useRef(Date.now());
  const [hint, setHint] = useState(null);

  // After a few idle seconds, wiggle two items that can be merged
  useEffect(() => {
    const id = setInterval(() => {
      if (dragRef.current || Date.now() - lastTouch.current < 8000) return;
      setHint((h) => h || findPair(gameRef.current.board));
    }, 1000);
    return () => clearInterval(id);
  }, [gameRef]);
  const hintOk = hint && state.board[hint[0]] && state.board[hint[1]] && state.board[hint[0]].id === state.board[hint[1]].id && !state.board[hint[0]].st;
  const hasBubble = state.board.some((c) => c?.bubble);

  const wanted = useMemo(() => {
    const set = new Set();
    state.orders.forEach((o) => o.items.forEach((id) => set.add(id)));
    return set;
  }, [state.orders]);

  const cellAt = useCallback(
    (x, y) => {
      const r = boardRef.current.getBoundingClientRect();
      const c = Math.floor((x - r.left) / cellSize);
      const rr = Math.floor((y - r.top) / cellSize);
      if (c < 0 || c >= COLS || rr < 0 || rr >= ROWS) return -1;
      return rr * COLS + c;
    },
    [cellSize],
  );

  const tap = (i) => {
    const cell = state.board[i];
    if (!cell) {
      setSelected(null);
      return;
    }
    const it = item(cell.id);
    if (cell.st === 'box') {
      setSelected(cell.uid);
      sfx('select');
      return;
    }
    if (!cell.st && !cell.bubble && it.kind === 'gen') {
      setSelected(cell.uid);
      act(spawn, i);
      return;
    }
    if (!cell.st && !cell.bubble && (it.kind === 'reward' || it.kind === 'chest') && selected === cell.uid) {
      act(collect, i);
      setSelected(null);
      return;
    }
    sfx('select');
    setSelected(cell.uid);
  };

  const onDown = (e) => {
    lastTouch.current = Date.now();
    if (hint) setHint(null);
    if (e.button !== undefined && e.button !== 0) return;
    const i = cellAt(e.clientX, e.clientY);
    if (i < 0) return;
    dragRef.current = { from: i, x0: e.clientX, y0: e.clientY, active: false, id: e.pointerId };
    try {
      boardRef.current.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const onMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const cell = state.board[d.from];
    if (!d.active) {
      if (Math.hypot(e.clientX - d.x0, e.clientY - d.y0) < 7) return;
      if (!cell || cell.st) {
        dragRef.current = null;
        return;
      }
      d.active = true;
      setSelected(cell.uid);
      sfx('select');
    }
    const r = boardRef.current.getBoundingClientRect();
    const over = cellAt(e.clientX, e.clientY);
    setDrag({ from: d.from, x: e.clientX - r.left, y: e.clientY - r.top, over, id: cell.id });
  };

  const onUp = (e) => {
    const d = dragRef.current;
    dragRef.current = null;
    if (!d) return;
    if (!d.active) {
      tap(d.from);
      return;
    }
    setDrag(null);
    const to = cellAt(e.clientX, e.clientY);
    if (to < 0 || to === d.from) return;
    const a = state.board[d.from];
    const b = state.board[to];
    if (b && !canMerge(a, b) && !canTool(a, b) && !b.st && !b.bubble) pendingFrom.set(b.uid, to);
    const ok = act(move, d.from, to);
    if (!ok) {
      if (b) pendingFrom.delete(b.uid);
      sfx('error');
    } else {
      const nc = gameRef.current.board[to];
      setSelected(nc ? nc.uid : null);
    }
  };

  const onCancel = () => {
    dragRef.current = null;
    setDrag(null);
  };

  const dragId = drag?.id;
  const overCell = drag ? state.board[drag.over] : null;
  const canDrop = drag && drag.over >= 0 && drag.over !== drag.from && overCell && (canMerge(state.board[drag.from], overCell) || canTool(state.board[drag.from], overCell));

  return (
    <div
      className="board"
      ref={boardRef}
      style={{ '--cell': `${cellSize}px` }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onCancel}
      onLostPointerCapture={() => dragRef.current && onCancel()}
    >
      {state.board.map((cell, i) => {
        const isGen = cell && item(cell.id).kind === 'gen';
        const tutAttr = tut === 'gen' && cell?.id === 'gencoffee_1' && !cell.st ? 'gen' : undefined;
        return (
          <div key={i} className={`cell ${(Math.floor(i / COLS) + i) % 2 ? 'alt' : ''} ${drag && drag.over === i ? (canDrop ? 'drop-ok' : 'drop') : ''}`} data-cell={i} data-tut={tutAttr}>
            {cell &&
              (cell.st === 'box' ? (
                <div className={`item box ${selected === cell.uid ? 'sel' : ''}`}>
                  <BoxArt />
                </div>
              ) : (
                <ItemView
                  key={cell.uid}
                  cell={cell}
                  index={i}
                  cellSize={cellSize}
                  selected={selected === cell.uid}
                  hidden={drag && drag.from === i}
                  match={!!dragId && drag.from !== i && ((cell.id === dragId && !cell.bubble && !!nextId(cell.id)) || canTool(state.board[drag.from], cell))}
                  wanted={!isGen && wanted.has(cell.id)}
                  now={hasBubble ? now : 0}
                  hinted={!!hintOk && !drag && (hint[0] === i || hint[1] === i)}
                />
              ))}
          </div>
        );
      })}
      {drag && (
        <div className="drag-ghost" style={{ transform: `translate(${drag.x - cellSize * 0.6}px, ${drag.y - cellSize * 0.75}px)`, width: cellSize * 1.2, height: cellSize * 1.2 }}>
          <ItemArt id={drag.id} />
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------- info panel
function InfoPanel({ state, act, selIdx, onSell }) {
  const cell = selIdx >= 0 ? state.board[selIdx] : null;
  if (!cell) {
    return (
      <div className="info info-empty">
        <span>Ketuk item untuk melihat detail. Seret dua item yang sama untuk menggabungkan!</span>
      </div>
    );
  }
  if (cell.st === 'box') {
    return (
      <div className="info">
        <div className="info-icon">
          <BoxArt />
        </div>
        <div className="info-text">
          <b>Kotak Misteri</b>
          <span>Gabungkan item tepat di sebelahnya untuk membuka kotak ini.</span>
        </div>
      </div>
    );
  }
  const it = item(cell.id);
  const nid = nextId(cell.id);
    let actions = null;
  if (cell.st === 'web') {
    actions = (
      <Btn small color="purple" onClick={() => act(freeWeb, selIdx)}>
        Bebaskan <Icon name="gem" size={16} />
        {webCost(cell.id)}
      </Btn>
    );
  } else if (cell.bubble) {
    actions = (
      <Btn small color="purple" onClick={() => act(popBubble, selIdx)}>
        Ambil <Icon name="gem" size={16} />
        {bubbleCost(cell.id)}
      </Btn>
    );
  } else if (it.kind === 'reward' || it.kind === 'chest') {
    actions = (
      <Btn small color="green" onClick={() => act(collect, selIdx)}>
        {it.kind === 'chest' ? 'Buka' : 'Ambil'}
      </Btn>
    );
  } else if (it.kind === 'food') {
    actions = (
      <Btn small color="orange" onClick={() => onSell(selIdx)}>
        Jual <Icon name="coin" size={16} />
        {it.sell}
      </Btn>
    );
  }
  let desc = it.desc;
  if (cell.st === 'web') desc = 'Terjebak sarang laba-laba. Gabungkan item yang sama ke sini untuk membebaskannya.';
  if (cell.bubble) desc = 'Gelembung bonus! Ambil dengan permata sebelum pecah jadi koin.';
  return (
    <div className="info">
      <div className="info-icon">
        <ItemArt id={cell.id} />
      </div>
      <div className="info-text">
        <b>
          {it.name} <em>Lv {it.tier}</em>
        </b>
        <span className={nid && it.kind === 'food' ? 'info-desc' : ''}>{desc}</span>
        {nid && it.kind === 'food' && (
          <span className="info-next">
            Berikutnya: <ItemArt id={nid} className="art inline-art" /> {item(nid).name}
          </span>
        )}
      </div>
      <div className="info-actions">
        {actions}
        {!cell.st && !cell.bubble && (
          <button type="button" className="icon-btn" aria-label="Simpan ke gudang" title="Simpan ke gudang" onClick={() => (sfx('tap'), act(store, selIdx))}>
            <Icon name="box" size={26} />
          </button>
        )}
      </div>
    </div>
  );
}

function KitchenChip({ slot, onClick }) {
  const now = useNow(1000);
  const r = recipe(slot.id);
  const left = Math.max(0, slot.done - now);
  return (
    <button type="button" className={`fest-float kitchen-chip ${left ? '' : 'ready'}`} onClick={onClick} aria-label="Dapur">
      <span className="chip-art">
        <ItemArt id={r.plate} />
      </span>
      <span>{left ? fmtTime(left) : 'Siap!'}</span>
    </button>
  );
}

// ------------------------------------------------------------------ screen
export function BoardScreen({ onNav, tutStep }) {
  const { state, act, ref: gameRef } = useGameCtx();
  const [selected, setSelected] = useState(null);
  const wrapRef = useRef(null);
  const [cellSize, setCellSize] = useState(48);
  const [undo, setUndo] = useState(null);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const s = Math.floor(Math.min((r.width - 16) / COLS, (r.height - 16) / ROWS));
      setCellSize(Math.max(30, Math.min(s, 72)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const selIdx = selected ? state.board.findIndex((c) => c?.uid === selected) : -1;

  const onServe = (uid) => {
    if (act(serve, uid)) setSelected(null);
  };

  const onSell = (i) => {
    const cell = state.board[i];
    const coins = item(cell.id).sell;
    if (act(sell, i)) {
      setSelected(null);
      setUndo({ i, cell, coins, t: Date.now() });
    }
  };

  useEffect(() => {
    if (!undo) return;
    const id = setTimeout(() => setUndo(null), 4000);
    return () => clearTimeout(id);
  }, [undo]);

  const tut = tutStep === 2 ? (state.board.filter((c) => c?.id === 'coffee_1' && !c.st).length >= 2 ? 'merge' : 'gen') : null;

  return (
    <div className="screen board-screen">
      <OrdersBar board={state.board} orders={state.orders} onServe={onServe} onSwap={(uid) => act(swapOrder, uid)} canSwap={state.tut >= 99} />
      <div className="board-wrap" ref={wrapRef}>
        {state.tut >= 99 && <NinaHelper />}
        <div className="board-chips">
        {state.kitchen?.slot && <KitchenChip slot={state.kitchen.slot} onClick={() => onNav('kitchen')} />}
        {state.level >= FEST_LEVEL && (
          <button type="button" className="fest-float" data-hud="fest" onClick={() => onNav('fest')} aria-label="Festival">
            <Icon name="tent" size={26} />
            <span>{state.fest?.pts || 0}</span>
            {festClaimable(state) > 0 && <i className="badge">{festClaimable(state)}</i>}
          </button>
        )}
        </div>
        <div className="board-frame">
          <Board state={state} act={act} gameRef={gameRef} selected={selected} setSelected={setSelected} cellSize={cellSize} tut={tut} />
        </div>
      </div>
      <InfoPanel state={state} act={act} selIdx={selIdx} onSell={onSell} />
      {undo && (
        <div className="undo-bar">
          Terjual! <Btn small color="blue" onClick={() => (act(unsell, undo.i, undo.cell, undo.coins), setUndo(null))}>Batal</Btn>
        </div>
      )}
      <nav className="bottombar">
        <button type="button" className="nav-btn nav-home" data-tut="home" onClick={() => onNav('cafe')}>
          <Icon name="home" size={34} />
          <span>Kafe</span>
        </button>
        <button type="button" className="nav-btn" onClick={() => onNav('storage')}>
          <Icon name="box" size={30} />
          <span>Gudang</span>
          {state.storage.length > 0 && <i className="badge">{state.storage.length}</i>}
        </button>
        <button type="button" className={`nav-btn nav-gift ${state.gifts.length ? 'has' : ''}`} disabled={!state.gifts.length} onClick={() => (sfx('pop'), act(placeGift))}>
          <span className="gift-slot">{state.gifts.length ? <ItemArt id={state.gifts[0]} /> : <Icon name="gift" size={30} />}</span>
          <span>{state.gifts.length ? 'Ambil' : 'Hadiah'}</span>
          {state.gifts.length > 0 && <i className="badge">{state.gifts.length}</i>}
        </button>
        <button type="button" className="nav-btn" onClick={() => onNav('quests')}>
          <Icon name="quest" size={30} />
          <span>Misi</span>
          {state.quests?.list.some((q) => q.progress >= q.target && !q.claimed) && <i className="badge dot">!</i>}
        </button>
        <button type="button" className="nav-btn" onClick={() => onNav('shop')}>
          <Icon name="shop" size={30} />
          <span>Toko</span>
        </button>
      </nav>
    </div>
  );
}
