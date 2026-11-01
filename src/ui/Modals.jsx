import { useState } from 'react';
import { useGameCtx, wipeSave } from '../game/useGame';
import { Modal, Btn, Icon, RewardChips, Bar, Price, fmtTime } from './common';
import { ItemArt } from '../art/ItemArt';
import { item, CHAINS, REWARD_CHAINS, GENERATORS, chainIds } from '../game/items';
import { AREAS, taskXp } from '../game/areas';
import { DAILY_REWARDS, questLabel } from '../game/quests';
import { ENERGY_MAX, ENERGY_REGEN_MS, STORAGE_MAX, xpForLevel } from '../game/config';
import {
  retrieve,
  claimQuest,
  claimDaily,
  canClaimDaily,
  claimCodex,
  shopOffers,
  buyOffer,
  buyEnergy,
  buyStorage,
  storageSlotPrice,
  claimFreeGift,
  claimLevel,
} from '../game/engine';
import { useNow } from './TopBar';
import { BackupPanel } from './Meta';
import { levelRewards } from '../game/config';
import { sfx } from '../game/audio';

// ---------------------------------------------------------------- storage
export function StorageModal({ onClose }) {
  const { state, act } = useGameCtx();
  return (
    <Modal title="Gudang" onClose={onClose}>
      <p className="muted center">Ketuk item untuk mengembalikannya ke papan.</p>
      <div className="slots">
        {Array.from({ length: state.storageSlots }, (_, i) => {
          const id = state.storage[i];
          return (
            <button type="button" key={i} className={`slot ${id ? 'full' : ''}`} disabled={!id} onClick={() => (sfx('pop'), act(retrieve, i))}>
              {id && <ItemArt id={id} />}
            </button>
          );
        })}
        {state.storageSlots < STORAGE_MAX && (
          <button type="button" className="slot slot-add" onClick={() => act(buyStorage)}>
            <span>+</span>
            <Price gems={storageSlotPrice(state)} />
          </button>
        )}
      </div>
    </Modal>
  );
}

// ----------------------------------------------------------------- quests
export function QuestsModal({ onClose }) {
  const { state, act } = useGameCtx();
  const now = useNow();
  const end = new Date();
  end.setHours(24, 0, 0, 0);
  return (
    <Modal title="Misi Harian" onClose={onClose}>
      <p className="muted center">Misi baru dalam {fmtTime(end - now)}</p>
      <div className="quest-list">
        {state.quests.list.map((q, i) => {
          const ready = q.progress >= q.target && !q.claimed;
          return (
            <div key={i} className={`quest ${q.claimed ? 'done' : ''}`}>
              <div className="quest-main">
                <b>{questLabel(q)}</b>
                <div className="quest-bar">
                  <Bar value={q.progress} max={q.target} />
                  <span>
                    {q.progress}/{q.target}
                  </span>
                </div>
              </div>
              <div className="quest-side">
                <RewardChips r={q.reward} />
                {q.claimed ? (
                  <Icon name="check" size={30} />
                ) : (
                  <Btn small color={ready ? 'green' : 'grey'} disabled={!ready} onClick={() => act(claimQuest, i)}>
                    Klaim
                  </Btn>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

// ------------------------------------------------------------------ daily
export function DailyModal({ onClose }) {
  const { state, act } = useGameCtx();
  const can = canClaimDaily(state);
  // what streak day would be claimed now
  const y = new Date(Date.now() - 86400000);
  const yKey = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, '0')}-${String(y.getDate()).padStart(2, '0')}`;
  const nextDay = can ? (state.daily.last === yKey ? (state.daily.streak % 7) + 1 : 1) : state.daily.streak;
  return (
    <Modal title="Hadiah Harian" onClose={onClose}>
      <p className="muted center">Masuk setiap hari untuk hadiah yang makin besar!</p>
      <div className="daily-grid">
        {DAILY_REWARDS.map((r, i) => {
          const day = i + 1;
          const claimed = can ? day < nextDay : day <= nextDay;
          const today = can && day === nextDay;
          return (
            <div key={i} className={`daily ${claimed ? 'claimed' : ''} ${today ? 'today' : ''} ${day === 7 ? 'big' : ''}`}>
              <small>Hari {day}</small>
              <RewardChips r={r} />
              {claimed && <Icon name="check" size={22} className="daily-check" />}
            </div>
          );
        })}
      </div>
      <Btn
        color="green"
        className="big"
        disabled={!can}
        onClick={() => {
          act(claimDaily);
          sfx('task');
        }}
      >
        {can ? 'Klaim Hadiah' : 'Kembali besok!'}
      </Btn>
    </Modal>
  );
}

// ------------------------------------------------------------------ codex
export function CodexModal({ onClose }) {
  const { state, act } = useGameCtx();
  const [tab, setTab] = useState('coffee');
  const tabs = [...Object.keys(CHAINS), 'other'];
  const ids = tab === 'other' ? [...Object.keys(REWARD_CHAINS).flatMap(chainIds), ...Object.keys(GENERATORS).flatMap((g) => chainIds('gen' + g))] : chainIds(tab);
  const found = Object.keys(state.discovered).length;
  return (
    <Modal title="Buku Resep" onClose={onClose} className="codex">
      <div className="tabs">
        {tabs.map((t) => (
          <button type="button" key={t} className={`tab ${tab === t ? 'on' : ''}`} onClick={() => (sfx('tap'), setTab(t))}>
            {t === 'other' ? 'Lainnya' : CHAINS[t].name}
            {(t === 'other' ? false : chainIds(t).some((id) => state.discovered[id] === 1)) && <i className="badge dot">!</i>}
          </button>
        ))}
      </div>
      {tab !== 'other' && state.level < CHAINS[tab].unlock && <p className="muted center">Terbuka di level {CHAINS[tab].unlock}</p>}
      <div className="codex-grid">
        {ids.map((id) => {
          const d = state.discovered[id];
          const it = item(id);
          return (
            <button type="button" key={id} className={`codex-item ${d ? '' : 'unknown'} ${d === 1 && it.kind === 'food' ? 'claim' : ''}`} onClick={() => d === 1 && act(claimCodex, id)} disabled={d !== 1}>
              <ItemArt id={id} />
              <small>{d ? it.name : '???'}</small>
              <em>Lv {it.tier}</em>
              {d === 1 && (
                <span className="codex-claim">
                  <Icon name="gem" size={14} />
                  {Math.max(1, Math.ceil(it.tier / 2))}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="muted center">Ditemukan {found} item</p>
    </Modal>
  );
}

// ------------------------------------------------------------------- shop
export function ShopModal({ onClose }) {
  const { state, act } = useGameCtx();
  const now = useNow();
  const offers = shopOffers(state);
  const freeIn = state.shop.freeAt - now;
  return (
    <Modal title="Toko Kafe" onClose={onClose} className="shop">
      <h4>Hadiah Gratis</h4>
      <div className="shop-row">
        <div className="shop-card free">
          <Icon name="gift" size={52} />
          <Btn small color={freeIn > 0 ? 'grey' : 'green'} disabled={freeIn > 0} onClick={() => (act(claimFreeGift), sfx('task'))}>
            {freeIn > 0 ? fmtTime(freeIn) : 'Ambil!'}
          </Btn>
        </div>
        <div className="shop-card">
          <Icon name="energy" size={46} />
          <b>+50 Energi</b>
          <Btn small color="purple" onClick={() => act(buyEnergy, 50, 10)}>
            <Price gems={10} />
          </Btn>
        </div>
        <div className="shop-card">
          <Icon name="energy" size={46} />
          <b>+120 Energi</b>
          <Btn small color="purple" onClick={() => act(buyEnergy, 120, 22)}>
            <Price gems={22} />
          </Btn>
        </div>
      </div>
      <h4>Penawaran Hari Ini</h4>
      <div className="shop-row wrap">
        {offers.map((o) => {
          const bought = state.shop.bought[o.key];
          const it = item(o.id);
          return (
            <div key={o.key} className={`shop-card ${bought ? 'sold' : ''}`}>
              <div className="shop-art">
                <ItemArt id={o.id} />
              </div>
              <b>{it.name}</b>
              <Btn small color={o.price.gems ? 'purple' : 'orange'} disabled={bought} onClick={() => act(buyOffer, o)}>
                {bought ? 'Terjual' : <Price {...o.price} />}
              </Btn>
            </div>
          );
        })}
      </div>
      <p className="muted center small">Item yang dibeli masuk ke tombol Hadiah di papan.</p>
      <h4>Gudang</h4>
      <div className="shop-row">
        <div className="shop-card wide">
          <Icon name="box" size={40} />
          <b>
            +1 slot gudang ({state.storageSlots}/{STORAGE_MAX})
          </b>
          <Btn small color="purple" disabled={state.storageSlots >= STORAGE_MAX} onClick={() => act(buyStorage)}>
            <Price gems={storageSlotPrice(state)} />
          </Btn>
        </div>
      </div>
    </Modal>
  );
}

// ----------------------------------------------------------------- energy
export function EnergyModal({ onClose }) {
  const { state, act } = useGameCtx();
  const now = useNow();
  const full = state.energy >= ENERGY_MAX;
  const left = full ? 0 : ENERGY_REGEN_MS - (now - state.energyTs);
  const toFull = full ? 0 : left + (ENERGY_MAX - state.energy - 1) * ENERGY_REGEN_MS;
  return (
    <Modal title="Energi" onClose={onClose}>
      <div className="energy-big">
        <Icon name="energy" size={64} />
        <b>
          {state.energy}/{ENERGY_MAX}
        </b>
      </div>
      <p className="muted center">{full ? 'Energi penuh! Ayo produksi.' : `+1 dalam ${fmtTime(left)} · penuh dalam ${fmtTime(toFull)}`}</p>
      <p className="center small">Setiap ketukan generator memakai 1 energi. Kumpulkan item energi di papan atau isi ulang dengan permata.</p>
      <div className="shop-row">
        <div className="shop-card">
          <b>+50</b>
          <Btn small color="purple" onClick={() => act(buyEnergy, 50, 10) && onClose()}>
            <Price gems={10} />
          </Btn>
        </div>
        <div className="shop-card">
          <b>+120</b>
          <Btn small color="purple" onClick={() => act(buyEnergy, 120, 22) && onClose()}>
            <Price gems={22} />
          </Btn>
        </div>
      </div>
    </Modal>
  );
}

// -------------------------------------------------------------- level up
export function LevelUpModal() {
  const { state, act } = useGameCtx();
  const p = state.pendingLevel[0];
  if (!p) return null;
  return (
    <div className="modal-back levelup-back">
      <div className="levelup">
        <div className="rays" />
        <div className="levelup-star">
          <Icon name="star" size={140} />
          <b>{p.level}</b>
        </div>
        <h2>Naik Level!</h2>
        {p.unlocks.length > 0 && (
          <div className="unlock">
            <div className="unlock-art">
              <ItemArt id={`gen${p.unlocks[0]}_1`} />
            </div>
            <span>
              Generator baru: <b>{GENERATORS[p.unlocks[0]].name}</b>
              <br />
              Resep {CHAINS[p.unlocks[0]].name.toLowerCase()} terbuka!
            </span>
          </div>
        )}
        <div className="levelup-rewards">
          <RewardChips r={{ gems: p.gems, energy: p.energy }} />
          {p.items.map((id, i) => (
            <span key={i} className="chip chip-item">
              <ItemArt id={id} />
            </span>
          ))}
        </div>
        <Btn color="green" className="big" onClick={() => act(claimLevel)}>
          Klaim
        </Btn>
      </div>
    </div>
  );
}

export function LevelInfoModal({ onClose }) {
  const { state } = useGameCtx();
  const upcoming = Object.entries(CHAINS).filter(([, c]) => c.unlock > state.level);
  return (
    <Modal title={`Level ${state.level}`} onClose={onClose}>
      <div className="lvl-info">
        <Bar value={state.xp} max={xpForLevel(state.level)} />
        <p className="center">
          {state.xp}/{xpForLevel(state.level)} XP menuju level {state.level + 1}
        </p>
        <p className="muted center small">Dapatkan XP dengan menyajikan pesanan dan merenovasi kafe.</p>
        <h4>Hadiah level berikutnya</h4>
        <div className="level-road">
          {[1, 2, 3, 4, 5].map((k) => {
            const lv = state.level + k;
            const r = levelRewards(lv);
            const un = Object.entries(CHAINS).find(([, c]) => c.unlock === lv);
            return (
              <div key={lv} className="road-step">
                <span className="road-lv">
                  <Icon name="star" size={30} />
                  <b>{lv}</b>
                </span>
                <RewardChips r={{ gems: r.gems, energy: r.energy }} />
                {r.items.map((id, i) => (
                  <span key={i} className="chip chip-item">
                    <ItemArt id={id} />
                  </span>
                ))}
                {un && (
                  <span className="chip chip-item road-gen" title={GENERATORS[un[0]].name}>
                    <ItemArt id={`gen${un[0]}_1`} />
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {upcoming.length > 0 && (
          <div className="upcoming">
            {upcoming.map(([k, c]) => (
              <div key={k} className="upcoming-row">
                <div className="mini-art">
                  <ItemArt id={`gen${k}_1`} />
                </div>
                <span>
                  {GENERATORS[k].name} — level {c.unlock}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="stats">
          <span>Pesanan disajikan: {state.stats.served}</span>
          <span>Item digabung: {state.stats.merges}</span>
          <span>Item diproduksi: {state.stats.spawns}</span>
        </div>
      </div>
    </Modal>
  );
}

// ------------------------------------------------------------- task list
export function TasksModal({ onClose, onPick }) {
  const { state } = useGameCtx();
  return (
    <Modal title="Renovasi Kafe" onClose={onClose}>
      <div className="task-areas">
        {AREAS.map((a, ai) => {
          const done = state.areas[a.id] || [];
          const locked = ai > state.areaIdx;
          return (
            <div key={a.id} className={`task-area ${locked ? 'locked' : ''}`}>
              <div className="task-area-head">
                <div className="task-thumb" style={{ backgroundImage: `url(${a.bg})` }} />
                <div>
                  <b>{a.name}</b>
                  <Bar value={done.length} max={a.tasks.length} />
                </div>
                {locked && <Icon name="lock" size={24} />}
              </div>
              {ai === state.areaIdx && !locked && (
                <div className="task-rows">
                  {a.tasks.map((t) => {
                    const d = done.includes(t.id);
                    return (
                      <button type="button" key={t.id} className={`task-row ${d ? 'done' : ''}`} disabled={d} onClick={() => onPick(ai, t)}>
                        <span>{t.name}</span>
                        {d ? (
                          <Icon name="check" size={22} />
                        ) : (
                          <span className="task-row-cost">
                            <Icon name="coin" size={16} />
                            {t.cost} · <Icon name="xp" size={14} />
                            {taskXp(t.cost)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

// --------------------------------------------------------------- settings
export function SettingsModal({ onClose, onReset }) {
  const { state, act } = useGameCtx();
  const [confirm, setConfirm] = useState(false);
  const toggle = (k) =>
    act((s) => {
      s.settings[k] = !s.settings[k];
    });
  const row = (k, label) => (
    <label className="toggle-row">
      <span>{label}</span>
      <button type="button" className={`toggle ${state.settings[k] ? 'on' : ''}`} onClick={() => (sfx('tap'), toggle(k))} aria-pressed={state.settings[k]}>
        <i />
      </button>
    </label>
  );
  return (
    <Modal title="Pengaturan" onClose={onClose}>
      {row('music', 'Musik')}
      {row('sfx', 'Efek suara')}
      {row('vibe', 'Getar')}
      <div className="settings-foot">
        {!confirm ? (
          <Btn small color="red" onClick={() => setConfirm(true)}>
            Mulai ulang permainan
          </Btn>
        ) : (
          <div className="confirm">
            <p>Semua progres akan hilang. Yakin?</p>
            <Btn small color="grey" onClick={() => setConfirm(false)}>
              Batal
            </Btn>
            <Btn
              small
              color="red"
              onClick={() => {
                wipeSave();
                onReset();
              }}
            >
              Ya, hapus
            </Btn>
          </div>
        )}
        <BackupPanel onRestored={onReset} />
        <p className="muted small center">Kafe Kucing Zorro · v2.2 · progres tersimpan otomatis di perangkat ini</p>
      </div>
    </Modal>
  );
}
