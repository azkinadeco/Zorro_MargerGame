import { Modal, Icon } from './common';
import { ItemArt } from '../art/ItemArt';
import { useGameCtx } from '../game/useGame';
import { anyPetReady } from './Pets';
import { wheelReady } from './Wheel';
import { festClaimable, achClaimable, FEST_LEVEL } from '../game/meta';
import { sfx } from '../game/audio';

// Every side activity in one tidy grid. Extra entries register here.
export const ACTIVITIES = [
  { key: 'pets', name: 'Teman Kucing', sub: 'Beri camilan', icon: 'cat', ready: anyPetReady },
  { key: 'wardrobe', name: 'Lemari Kostum', sub: 'Dandani kucing', icon: 'crown' },
  { key: 'wheel', name: 'Roda Hoki', sub: 'Putar gratis', icon: 'wheel', ready: wheelReady },
  { key: 'fest', name: 'Festival', sub: 'Hadiah mingguan', icon: 'tent', ready: (s) => festClaimable(s) > 0, level: FEST_LEVEL },
  { key: 'ach', name: 'Prestasi', sub: 'Trofi & permata', icon: 'trophy', ready: (s) => achClaimable(s) > 0 },
  { key: 'codex', name: 'Buku Resep', sub: 'Koleksi item', icon: 'book', ready: (s) => Object.values(s.discovered).some((v) => v === 1) },
  { key: 'album', name: 'Album Foto', sub: 'Kenangan kucing', icon: 'photo' },
];

export function hubReady(state) {
  return ACTIVITIES.some((a) => (!a.level || state.level >= a.level) && a.ready?.(state));
}

export function HubModal({ onClose, onNav }) {
  const { state } = useGameCtx();
  return (
    <Modal title="Aktivitas" onClose={onClose} className="hub">
      <div className="hub-grid">
        {ACTIVITIES.map((a) => {
          const locked = a.level && state.level < a.level;
          const ready = !locked && a.ready?.(state);
          return (
            <button
              type="button"
              key={a.key}
              className={`hub-tile ${locked ? 'locked' : ''} ${ready ? 'ready' : ''}`}
              disabled={locked}
              onClick={() => (sfx('tap'), onNav(a.key))}
            >
              <span className="hub-icon">{a.art ? <ItemArt id={a.art} /> : <Icon name={a.icon} size={40} />}</span>
              <b>{a.name}</b>
              <small>{locked ? `Level ${a.level}` : a.sub}</small>
              {ready && <i className="badge dot">!</i>}
              {locked && <Icon name="lock" size={20} className="hub-lock" />}
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
